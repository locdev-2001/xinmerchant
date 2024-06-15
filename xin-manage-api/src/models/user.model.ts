import { Schema, model } from "mongoose";
import BaseModel from ".";

export interface IUser {
  _id: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  sponsors: number[];
  maxSlot: number;
  isBlock: boolean;
  isBlockClaim: boolean;
  xinCoin: number;
  USDT: number;
  bxinCoin: number;
  bUSDT: number;
  limitMana: number;
  mana: number;
  speed: number;
  isBlockDepositWithdrawal: boolean;
  isDeleted: boolean;
  email: string;
  password: string;
  refId: number;
  createdAt: string;
  updatedAt: string;
  bep20Wallet: string;
}

export class User extends BaseModel {
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  sponsors: number[];
  maxSlot: number;
  isBlock: boolean;
  isBlockClaim: boolean;
  xinCoin: number;
  USDT: number;
  bxinCoin: number;
  bUSDT: number;
  limitMana: number;
  mana: number;
  speed: number;
  isBlockDepositWithdrawal: boolean;
  isDeleted: boolean;
  email: string;
  password: string;
  refId: number;
  bep20Wallet: string;

  constructor(obj: IUser) {
    super(obj);
    this.role = obj.role;
    this.isEmailVerified = obj?.isPhoneVerified;
    this.isPhoneVerified = obj?.isPhoneVerified;
    this.sponsors = obj?.sponsors;
    this.maxSlot = obj?.maxSlot;
    this.isBlock = obj?.isBlock;
    this.isBlockClaim = obj?.isBlockClaim;
    this.xinCoin = obj?.xinCoin;
    this.USDT = obj?.USDT;
    this.bxinCoin = obj?.bxinCoin;
    this.bUSDT = obj?.bUSDT;
    this.limitMana = obj?.limitMana;
    this.mana = obj?.mana;
    this.speed = obj?.speed;
    this.isBlockDepositWithdrawal = obj?.isBlockDepositWithdrawal;
    this.isDeleted = obj?.isDeleted;
    this.email = obj?.email;
    this.password = obj?.password;
    this.refId = obj?.refId;
    this.bep20Wallet = obj?.bep20Wallet;
  }
}

export class UserDTO extends BaseModel {
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  sponsors: number[];
  maxSlot: number;
  isBlock: boolean;
  isBlockClaim: boolean;
  xinCoin: number;
  USDT: number;
  bxinCoin: number;
  bUSDT: number;
  limitMana: number;
  mana: number;
  speed: number;
  isBlockDepositWithdrawal: boolean;
  isDeleted: boolean;
  email: string;
  refId: number;
  bep20Wallet: string;

  constructor(obj: IUser) {
    super(obj);
    this.role = obj.role;
    this.isEmailVerified = obj?.isPhoneVerified;
    this.isPhoneVerified = obj?.isPhoneVerified;
    this.sponsors = obj?.sponsors;
    this.maxSlot = obj?.maxSlot;
    this.isBlock = obj?.isBlock;
    this.isBlockClaim = obj?.isBlockClaim;
    this.xinCoin = obj?.xinCoin;
    this.USDT = obj?.USDT;
    this.bxinCoin = obj?.bxinCoin;
    this.bUSDT = obj?.bUSDT;
    this.limitMana = obj?.limitMana;
    this.mana = obj?.mana;
    this.speed = obj?.speed;
    this.isBlockDepositWithdrawal = obj?.isBlockDepositWithdrawal;
    this.isDeleted = obj?.isDeleted;
    this.email = obj?.email;
    this.refId = obj?.refId;
    this.bep20Wallet = obj?.bep20Wallet;
  }
}

const userSchema = new Schema({
  role: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  sponsors: [Number],
  maxSlot: Number,
  isBlock: Boolean,
  isBlockClaim: Boolean,
  xinCoin: Number,
  USDT: Number,
  bxinCoin: Number,
  bUSDT: Number,
  limitMana: Number,
  mana: Number,
  speed: Number,
  isBlockDepositWithdrawal: Boolean,
  isDeleted: Boolean,
  email: String,
  password: String,
  refId: Number,
  bep20Wallet: String,
  createdAt: Date,
  updatedAt: Date,
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const UserModel = model<IUser>("User", userSchema, "users");
