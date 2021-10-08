import cookie from 'react-cookies';
import CONSTANTS from './consts';
import RedirectSignin from '../common/RedirectSignin';
import RedirectInvalid from '../common/RedirectInvalid';

function restrictSample() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomer = appCookies && appCookies[CONSTANTS.COOKIE_KEY.ISCUSTOMER];
  if (!appCookies) {
    return <RedirectSignin />;
  }
  if (isCustomer) {
    return <RedirectInvalid />;
  }
}
