//name validation method
export const isNameValid = (name) => {
  //returns true if the name consists of at least one alphabetical character else returns false
  return /^[A-Za-z]+$/.test(name);
};

//email validation method
export const isEmailValid = (email) => {
  //returns true if the email matches the regex for a valid email else returns false
  // eslint-disable-next-line no-useless-escape
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
    email
  );
};
//Payee ID validation method
export const isMobileNumberValid = (mobNumber) => {
  //returns true if the payee id matches the regex for a valid id and its length is 15 else returns false
  return mobNumber.length === 10 && /^\d+$/.test(mobNumber);
};
