import { Response } from "express";

module.exports = {
  isRequired(val) {
    return val === '' ? false : true;
  },
  
  isTrimmed(val) {
    return val.trim() === val ? true : false;
  },

  hasLength(val, min, max) {
    return min && val.length < min ? false :
      max && val.length > max ? false : true;
  },

  sendError(res, status = 400 , message, location) {
    return res.status(status).json({message, location});
  }
}