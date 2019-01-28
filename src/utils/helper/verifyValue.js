import isEmptyValue from "lodash/isEmpty";

export const isEmpty = value => {
  if (typeof value === "object") {
    return isEmptyValue(value);
  }

  return value ? false : true;
};

export const verifyEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const verifyPassword = (pw1, pw2) => {
  /**
   * 0: true
   * 1: pw1 invalid
   * 2: pw1 !== pw2
   */
  if (typeof pw1 !== "string") return false;
  if (pw1.length < 6) return 1;
  if (pw2 && pw1 !== pw2) return 2;
  return true;
};

export const isFormEmpty = state => {
  /**
   * true: not null
   * key: key null
   */
  const listKeys = Object.keys(state);
  const listValues = Object.values(state);
  const listNull = [];

  listValues.forEach((_value, index) => {
    if (isEmpty(_value)) listNull.push(listKeys[index]);
  });

  return isEmpty(listNull) ? true : listNull;
};
