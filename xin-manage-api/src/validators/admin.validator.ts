import { check } from "express-validator";
import { MESSAGE_TYPE } from "./i18n/type";
import { AdminModel } from "@models/admin.model";
import { ENV } from "@config/env.config";

export default class AdminValidator {
  constructor() {}

  createSuperAdmin() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isEmail()
        .withMessage(MESSAGE_TYPE.invalid)
        .trim()
        .normalizeEmail()
        .custom(async (email: string, { req }) => {
          const existingUser = await AdminModel.exists({
            email,
            role: "super_admin",
          });
          if (existingUser) {
            throw new Error(MESSAGE_TYPE.exists);
          }
        }),
      ,
      check("password").not().isEmpty().withMessage(MESSAGE_TYPE.required),
      check("keyCreate")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .custom(async (keyCreate: string) => {
          if (keyCreate !== ENV.KEY_CREATE) {
            throw new Error(MESSAGE_TYPE.invalid);
          }
        }),
    ];
  }

  login() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isEmail()
        .withMessage(MESSAGE_TYPE.invalid)
        .trim()
        .normalizeEmail(),
      check("password").not().isEmpty().withMessage(MESSAGE_TYPE.required),
    ];
  }

  create() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isEmail()
        .withMessage(MESSAGE_TYPE.invalid)
        .trim()
        .normalizeEmail()
        .custom(async (email: string, { req }) => {
          const existingUser = await AdminModel.exists({
            email,
          });
          if (existingUser) {
            throw new Error(MESSAGE_TYPE.exists);
          }
        }),
      ,
      check("password").not().isEmpty().withMessage(MESSAGE_TYPE.required),
      check("role")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isIn(["support", "finance"])
        .withMessage(MESSAGE_TYPE.invalid),
    ];
  }

  update() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isEmail()
        .withMessage(MESSAGE_TYPE.invalid)
        .trim()
        .normalizeEmail()
        .custom(async (email: string, { req }) => {
          let adminId = req.params?.id;
          const admin = await AdminModel.findOne({
            email,
          });
          if (!!admin && admin._id != adminId) {
            throw new Error(MESSAGE_TYPE.exists);
          }
        }),
      ,
      check("password").optional(),
      check("role")
        .not()
        .isEmpty()
        .withMessage(MESSAGE_TYPE.required)
        .isIn(["support", "finance"])
        .withMessage(MESSAGE_TYPE.invalid),
    ];
  }
}
