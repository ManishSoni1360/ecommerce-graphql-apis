// Function to validate email
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

//Function to validate Password
export const validatePassword = (password: string) => {
  return password.length >= 8;
};
