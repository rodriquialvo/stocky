import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token: string) => {
  try {
    const {exp} = jwtDecode(token);
    if (!exp) {
      return false;
    }
    const currentDate = new Date();

    const expLength = exp.toString().length;
    const currentDateTight = Number(
      currentDate.getTime().toString().slice(0, expLength),
    );

    const differenceInSecs = exp - currentDateTight;

    const differenceInMinutes = Math.floor(differenceInSecs / 60);
    return differenceInMinutes <= 5;
  } catch (e) {
    return false;
  }
};

export default isTokenExpired;
