// declaring the var and geting id by query selector
const form = document.querySelector("#contactForm");
const Thanksmsg = document.getElementById("thankYouMessage");

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validating()) {
    Thanksmsg.style.display = "block";
    form.style.display = "none";
  }
});
// validate the each element by passing id's
function validating() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phNumber = document.getElementById("ph");

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;

  let dum = true;

  if (!nameRegex.test(name.value)) {
    setError(name, "Enter a valid name");
    dum = false;
  } else {
    setSuccess(name);
  }
//creaating function for validate email id
  if (!emailRegex.test(email.value)) {
    setError(email, "Enter a valid email address");
    dum = false;
  } else {
    setSuccess(email);
  }

  if (!phoneRegex.test(phNumber.value)) {
    setError(phNumber, "Enter a valid 10-digit phone number");
    dum = false;
  } else {
    setSuccess(phNumber);
  }

  return dum;
}

function setError(element, message) {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = message;
  element.style.borderColor = "red";
}
//creating function for successed procced to next step
function setSuccess(element) {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = "";
  element.style.borderColor = "";
}
