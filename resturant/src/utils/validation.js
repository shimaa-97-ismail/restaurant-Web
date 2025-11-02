// General validation helpers
export const isEmpty = (value) => !value?.trim();

export const isEmail = (email) =>

 /^[A-Za-z0-9._%+-]+@(gmail|yahoo).(com|org|edu)$/.test(email);
   

export const isPositiveNumber = (num) => Number(num) > 0;
export const isPassword=(password)=>/^[A-Za-z0-9._%+-].{8,}$/.test(password)

// Validate specific resources
// export const validateUser = (user) => {
//   const errors = {};

//   if (isEmpty(user.name)) errors.name = "Name is required";
//   if (isEmpty(user.email)) errors.email = "Email is required";
//   else if (!isEmail(user.email)) errors.email = "Invalid email format";

//   return errors;
// };

export const validateMenuItem = (menu) => {
  const errors = {};
  if (isEmpty(menu.name)) errors.name = "Menu name is required";
  if (!isPositiveNumber(menu.price)) errors.price = "Price must be positive";
  return errors;
};
