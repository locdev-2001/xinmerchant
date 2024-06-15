import { NextFunction, Request, Response } from "express";
import {
  ValidationChain,
  matchedData,
  validationResult,
} from "express-validator";
import { i18nValidator } from "@config/i18n.config";
import _ from "lodash";
import { IErrorValidator } from "@models/error";

export const formValidate = (
  validations: Array<ValidationChain | undefined>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation?.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body = { ...req.body, ...matchedData(req) };
      return next();
    }

    const formattedErrors: { [key: string]: string[] } = {};
    errors.array().map((_error: any) => {
      let error: IErrorValidator = _error;

      let message = i18nValidator.message
        .__({ phrase: error.msg, locale: req.language })
        .replace(
          ":fieldname",
          i18nValidator.fieldname.__({ phrase: "value", locale: req.language })
        );
      if (formattedErrors[error.path]) {
        formattedErrors[error.path].push(message);
      } else {
        formattedErrors[error.path] = [message];
      }
    });

    res.status(400).json({ errors: formattedErrors });
  };
};
