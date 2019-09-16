import { Response } from "express";

export default {
  isRequired(val: any) {
    return val === '' ? false : true;
  },
  
  isTrimmed(val: string) {
    return val.trim() === val ? true : false;
  },

  hasLength(val: string, min: number, max: number | undefined = undefined) {
    return min && val.length < min ? false :
      max && val.length > max ? false : true;
  },

  wrongFormat(password: string) {
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

  sendError(
    res: Response,
    status : number = 400,
    message: string,
    location: string
  ) {
    return res.status(status).json({message, location});
  }
}