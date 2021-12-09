import CONSTANTS from "./consts";

export const isSignedIn = () => {
  if (localStorage.getItem(CONSTANTS.STR_KEY)) {
    return true;
  }
  return false;
};
export const getStatus = () =>
  JSON.parse(localStorage.getItem(CONSTANTS.STATUS));
export const isCustomer = () =>
  JSON.parse(localStorage.getItem(CONSTANTS.STR_KEY)) ===
  JSON.parse(CONSTANTS.STR_USER);
