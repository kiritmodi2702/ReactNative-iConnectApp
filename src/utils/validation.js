//Email Validation
export const validateEmail = email => {
  let regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return email.match(regex);
};

// Password Validation
export const validatePassword = password => {
  // var alpha = /^([a-zA-Z0-9]+)$/
  let length = password.length >= 8;
  // return alpha.test(password) && length

  // let regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$_&-+-()/="':;?,.<>%^&*])[a-zA-Z0-9!@#$_&-+-()/="':;?,.<>%^&*]{8,50}$/;
  // return password.match(regex);

  // if (/^([a-zA-Z0-9]+)$/.test(password) && /\d/.test(password) &&
  //     /[A-Z]/i.test(password) && length) {
  //     return true
  // } else {
  //     return false
  // }

  if (length) {
    return true;
  } else {
    return false;
  }
};

//Full Name Validation
export const validateCharacter = fullName => {
  let length = fullName.length <= 50;
  if (/^([a-zA-Z ]+)$/.test(fullName) && length) {
    return true;
  } else {
    return false;
  }
};

//Phone Validation
export const validationPhone = phone => {
  let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  return regex.test(phone);
};

export const validName = name => {
  var regex = /^[a-zA-Z]+$/;
  return regex.test(name);
};

export const isValidValue = value => {
  if (typeof value == "undefined" || value == "" || value == null) {
    return false;
  }
  return true;
};
