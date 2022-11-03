import * as regex from "shared/constants/regex";

const regexMapper = {
  first_name: regex.NAME_REGEX,
  last_name: regex.NAME_REGEX,
  username: regex.USERNAME_REGEX,
  email: regex.EMAIL_REGEX,
  phone: regex.PHONE_REGEX,
  sex: regex.GENDER_REGEX,
  address: regex.ADDRESS_REGEX,
  password: regex.PASSWORD_REGEX,
  pid: regex.PRODUCT_ID_REGEX,
  pname: regex.PRODUCT_NAME,
  pdescription: regex.PRODUCT_DESCRIPTION,
  pprice: regex.PRODUCT_PRICE,
  pcategory: regex.PRODUCT_CATEGORY,
};

const error = {
  first_name: "Invalid firstname",
  last_name: "Invalid lastname",
  username: "Invalid username",
  email: "Invalid email",
  phone: "Phone number is invalid",
  sex: "Please choose one",
  address: "Invalid address",
  password: "invalid password",
  pid: "Invalid PID",
  pname: "Invalid product name",
  pdescription: "Invalid description",
  pprice: "Invalid price",
  pcategory: "Please choose one",
};

export default function validateForm(name, value) {
  if (value === "") {
    return `Please enter your ${name}`;
  } else {
    if (!regexMapper[name].test(value)) {
      return error[name];
    }
  }
  return "";
}
