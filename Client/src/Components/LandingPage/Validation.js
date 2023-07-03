//Creamos un objeto llamado error
let error = {};

let passwordRight = "";

//Funcion encargada de validar los inputs del form.
export default function validateInputs(userData) {
  const regexEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (userData.name === "email") {
    if (!regexEmail.test(userData.value)) {
      error.email = "Invalid Email";
    } else {
      delete error.email;
    }
  }

  if (userData.name === "password") {
    if (!regexPassword.test(userData.value)) {
      error.password =
        "- at least 8 characters - at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters";
    } else {
      passwordRight = userData.value;
      delete error.password;
    }
  }

  if (userData.name === "confirmPassword") {
    if (passwordRight !== userData.value) {
      error.confirmP = `Password doesn't match`;
    } else {
      delete error.confirmP;
    }
  }

  return error;
}
