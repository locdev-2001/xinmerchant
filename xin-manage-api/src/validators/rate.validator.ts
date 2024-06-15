import { check } from "express-validator";
import { MESSAGE_TYPE } from "./i18n/type";

export default class RateValidator {
  updateRate() {
    return [
      check("name").not().isEmpty().withMessage(MESSAGE_TYPE.required),
      check("rate").not().isEmpty().withMessage(MESSAGE_TYPE.required),
    ];
  }
}
