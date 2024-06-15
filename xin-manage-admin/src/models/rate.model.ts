export type TRateName = "USDT-xinCoin" | "xinCoin-USDT";


export interface IRate {
    id: string;
    rate: number;
    name: TRateName;
    createdAt: string;
    updatedAt: string;
  }