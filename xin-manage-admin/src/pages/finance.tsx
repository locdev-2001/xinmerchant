import InputRate from "@components/setting/input-rate";
import { Input } from "antd";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <InputRate name="xinCoin-USDT" />
      <InputRate name="USDT-xinCoin" />
    </div>
  );
}
