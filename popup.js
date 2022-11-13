function submit() {
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const gdpr = document.querySelector('#gdpr');

    const isEmailValid = email.checkValidity();
    const isPhoneValid = phone.checkValidity();
    const isGdprValid = gdpr.checked;

    if (!isGdprValid) {
        gdpr.setCustomValidity('Lütfen rıza metnini onaylayın')
        gdpr.reportValidity();
    } else if (!isEmailValid) {
        email.reportValidity();
    } else if (!isPhoneValid) {
        phone.setCustomValidity('Numaranızı 10 haneli olacak şekilde giriniz')
        phone.reportValidity();
    } 

    if (isGdprValid) {
        fetch('https://insider-optimus.herokuapp.com/lead-collection', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'phone': Number(phone.value),
                    'email': email.value
                })
            }).then((res) => {
                if (res.status === 200) {
                    const formPage = document.querySelector('.form-page');
                    const formResponse = document.querySelector('.form-response');
                    formPage.style.display = 'none';
                    formResponse.style.display = 'block';
                } else {
                    const alert = document.querySelector('.alert');
                    alert.style.display = 'block';
                }
            }).catch((err) => {
                const alert = document.querySelector('.alert');
                alert.style.display = 'block';
            });   
    }
}

function getResponseWithDate() {
    return 'Here is your discount code you can use it your next order. This coupon code will be valid until ' + new Date().toLocaleDateString() + '.';
}

function getCouponCode() {
    const generated = [],
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let text = '';
  
    for (let i=0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    if ( generated.indexOf(text) == -1 ) {
      generated.push(text);
    } else {
      generateCode();
    }

    return generated.join('\n');
}

function copyToClipboard() {
    var text = document.querySelector('#coupon').innerText;
    var elem = document.createElement('textarea');
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

function closePopupEvent(e) {
    const overlay = document.querySelector('.overlay');
    if (e.target !== overlay)
        return;

    closePopup();
}

function closePopup() {
    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
}

const Style = () => {
    return`
        * {
            box-sizing: border-box;
        }

        .column {
            float: left;
            width: 50%;
            padding: 10px;
            height: 360px;
        }

        .image-coll {
            padding: 0px;
        }

        .image {
            width: 100%;
            height: 100%;
        }

        .form {
            padding: 20px;
            text-align: center;
        }

        .row:after {
            content: '';
            display: table;
            clear: both;
        }

        .popup {
            margin: 70px auto;
            background: #fff;
            border-radius: 5px;
            width: 500px;
            height: 360px;
            position: relative;
            transition: all 5s ease-in-out;
        }

        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 400ms;
            visibility: visible;
            opacity: 1;
            z-index: 99999;
        }

        .popup .close {
            position: absolute;
            top: 10px;
            right: 20px;
            transition: all 200ms;
            font-size: 30px;
            font-weight: bold;
            text-decoration: none;
            color: #333;
            cursor: pointer;
        }

        .popup .close:hover {
            color: rgb(53, 128, 128);
        }

        .title-text {
            margin-top: 40px;
            margin-bottom: 0;
            font-family: 'Source Sans Pro', sans-serif;
        }

        .short-text {
            margin-top: 5px;
            font-size: 12px;
            font-family: 'Source Sans Pro', sans-serif;
        }

        .input {
            margin-top: 10px;
            border: 1.2px solid lightgray;
            border-radius: 3px;
            padding: 6px 5px 6px 10px;
            font-size: 12px;
            font-weight: 500;
            width: 100%;
            font-family: 'Source Sans Pro', sans-serif;
        }

        .checkbox-text {
            content: '';
            display: table;
            clear: both;
            margin-top: 15px;
        }

        .button {
            margin-top: 10px;
            width: 100%;
            padding: 6px;
            font-size: 12px;
            font-weight: 500;
            background-color: darkslategrey;
            border: 1.2px solid darkslategrey;
            border-radius: 5px;
            color: white;
            font-family: 'Source Sans Pro', sans-serif;
            text-align: center;
            cursor: pointer;
        }

        .button:hover {
            background-color: rgb(53, 128, 128);
        }

        .checkbox-column {
            text-align: left;
            float: left;
            width: 12%;
        }

        .checkbox-text-column {
            text-align: left;
            float: left;
            width: 88%;
        }

        .gdpr-text {
            font-size: 10px;
            font-family: 'Source Sans Pro', sans-serif;
            text-decoration: none;
            color: #000000;
            line-height: 1.5em;
            display: block;
        }

        .gdpr-text:hover {
            color: #2436d6;
        }

        .form-response {
            display: none;
        }

        .form-page {
            display: block;
        }

        .coupon {
            width: 70%;
            border: 2px lightgray;
            border-style: dashed; 
            display: inline-block;
            padding: 5px;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 13px;
            font-weight: 600;
        }

        .response-text {
            margin-top: 50px;
        }

        .response-short-text {
            margin-top: 20px;
        }

        .alert {
            display: none;
            padding: 8px;
            background-color: #d4392e;
            color: white;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 10px;
            font-weight: 600;
            border-radius: 5px;
            text-ali
        }

        .closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .closebtn:hover {
            color: black;
        }
    `;
}

const App = () => {
  return `
    <style>${Style()}</style>
    <div id="popup1" class="overlay">
        <div class="row popup">
            <div class="column image-coll">
                <img src="https://csegrecorder.com/assets/images/articles/archive/2004-06-chinese-drilling-fig03.jpg" class="image">
            </div>
            <div class="form-page">
                <div class="column form">
                    <div>
                        <h2 class="title-text">Title</h2>
                        <p class="short-text">Short Text</p>
                    </div>
                    <a class="close" onclick="closePopup()">&times;</a>
                    <div class="alert">
                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                        Hata! Lütfen girilen bilgileri kontrol ediniz.
                    </div>
                    <input class="input" type="email" id="email" name="email" placeholder="Email" oninput="setCustomValidity('')" required>
                    <input class="input" type="tel" pattern="[0-9]{10}" id="phone" name="phone" placeholder="Phone Number" oninput="setCustomValidity('')" required>
                    <input class="button" type="submit" value="BE FIRST" onclick="submit()">
                    <div class="checkbox-text">
                        <div class="checkbox-column">
                            <input type="checkbox" id="gdpr" name="gdpr" required>
                        </div>
                        <div class="checkbox-text-column">
                            <a class="gdpr-text" href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation" target="_blank" rel="noopener noreferrer">By submitting this form, you are giving consent for your e-mail to be used</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-response">
                <div class="column form">
                    <a class="close" onclick="closePopup()">&times;</a>
                    <h2 class="title-text response-text">Amazing!</h2>
                    <p class="short-text response-short-text">
                        ${getResponseWithDate()}
                    </p>
                    <p id="coupon" class="coupon">
                        ${getCouponCode()}
                    </p>
                    <input class="button" type="submit" value="Copy" onclick="copyToClipboard()">
                </div>
            </div>
        </div>
    </div>
    `;
}

const render = () => {
  const node = document.createElement('div');
  node.innerHTML = App();
  document.getElementsByTagName('body')[0].appendChild(node);
  document.querySelector('.overlay').addEventListener('click', closePopupEvent, false );
}

render()