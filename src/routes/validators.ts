import { Response } from "express";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

export default {
  isRequired(val: any) {
    return val === '' ? false : true;
  },

  isString(val: any) {
    return typeof val === 'string';
  },

  isNum(val: any) {
    return typeof val === 'number';
  },
  
  isTrimmed(val: string) {
    return typeof val === 'string' && val.trim() === val ? true : false;
  },

  hasLength(val: string, min: number, max: number | undefined = undefined) {
    return min && val.length < min ? false :
      max && val.length > max ? false : true;
  },

  notPassword(password: string) {
    return !/^(?=.*[a-z])/.test(password) ? 
        'Password should contain at least one lowercase letter' :
      !/(?=.*[A-Z])/.test(password) ?
        'Password should contain at least one uppercase letter' :
      !/(?=.*[0-9])/.test(password) ?
        'Password should contain at least one number' :
      !/(?=.[!@#\$%\^&])/.test(password) ? 
        'Password should contain at least one special character' :
        false;
  },

  isEmail(email: string) {
    let parts = email.split('@');

    if (parts.length === 2) {
      parts = parts[1].split('.')
    }

    if (parts.length >= 2) {
      return true;
    }

    return false;
  },

  isPhone(phone: string) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
  },

  isUnitNum(unit: number) {
    const units = [2011, 2013, 2015, 2017, 2019];
    return units.includes(unit);
  },

  validationError(
    res: Response,
    message: string,
    location: string,
    code: number = 400
  ) {
    return res.status(code).json({message, location});
  }
}