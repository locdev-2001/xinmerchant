import { Schema, Types, model } from "mongoose";
import BaseModel from ".";

export type TRateName = "USDT-xinCoin" | "xinCoin-USDT";

export interface IRate {
  id: string;
  rate: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class Rate extends BaseModel {
  rate: number;
  name: string;
  constructor(obj: IRate) {
    super(obj);
    this.rate = obj?.rate;
    this.name = obj?.name;
  }
}

export class RateDTO extends Rate{
  
}

const rateSchema = new Schema({
  rate: Number,
  name: String,
  createdAt: Date,
  updatedAt: Date,
});

rateSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const RateModel = model<IRate>("rates", rateSchema, "rates");
