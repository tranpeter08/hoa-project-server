import { Response } from "express";

export default {
  isRequired(val: any) {
    return val === '' ? false : true;
  },
  
  isTrimmed(val: string) {
    return val.trim() === val ? true : false;
  },

  hasLength(val: string, min: number, max: number) {
    return min && val.length < min ? false :
      max && val.length > max ? false : true;
  },

  sendError(res: Response, status : number = 400, message: string, location: string) {
    return res.status(status).json({message, location});
  }
}