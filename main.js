// declaring the var and geting id by query selector
const form = document.querySelector("#contactForm");
const nameJ = document.querySelector("#name");
const email = document.querySelector("#email");
const phNumber = document.getElementById("ph"); 
const message = document.getElementById("msg"); 
const Thanksmsg = document.getElementById("alert");
// validate the each element by passing id's
form.addEventListener('submit', (e) => {
    if (!validating()) {
        e.preventDefault();
    } else {
        e.preventDefault();
        Thanksmsg.innerText = "Thank you !";
    }
});

function validating() {
    const nameV = nameJ.value.trim();
    const mailV = email.value.trim();  //trim the value for exact data
    const phNumberV = phNumber.value.trim();
    const messageV = message.value.trim();
    let dum = true;

    if (nameV === '') {
        dum = false;
        setError(nameJ, "Name is required");
        Thanksmsg.innerText = '';
    } else {
        setSuccess(nameJ);
    }

    if (mailV === '') {
        dum = false;
        setError(email, "Email is required");
    } else if (!validateEmail(mailV)) {
        dum = false;
        setError(email, "Entered Email not Valid");
        Thanksmsg.innerText = '';
    } else {
        setSuccess(email);
    }

    if (phNumberV.length !== 10) {
        dum = false;
        setError(phNumber, 'Invalid Phone Number');
        Thanksmsg.innerText = '';
    } else {
        setSuccess(phNumber);
    }
    dum = true;
    return dum;
}

function setError(element, message) {
    const details = element.parentElement;
    const errorElement = details.querySelector('.error');

    errorElement.innerText = message;
    details.classList.add('error');
    details.classList.remove('success');
}
//creating function for successed procced to next step
function setSuccess(element) {
    const details = element.parentElement;
    const errorElement = details.querySelector('.error');

    errorElement.innerText = '';
    details.classList.remove('error');
    details.classList.add('success');
}
//creaating function for validate email id
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};