import { check } from "express-validator";
import { MESSAGE_TYPE } from "./i18n/type";
import { UserModel } from "@models/user.model";

export default class UserValidator {
  constructor() {}

  updateEmail() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .custom(async (email: string, { req }) => {
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error(MESSAGE_TYPE.not_exist);
          }
        }),
      ,
      check("newEmail")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .custom(async (newEmail: string, { req }) => {
          let { email } = req.body;
          const user = await UserModel.findOne({ email: newEmail });
          if (!!user && user?.email !== email) {
            throw new Error(MESSAGE_TYPE.exists);
          }
        }),
    ];
  }
}
