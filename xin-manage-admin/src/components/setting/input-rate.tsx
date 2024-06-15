import { settingApi } from "@apis/setting.api";
import { Button, Input, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { IRate, TRateName } from "src/models/rate.model";

interface IProps {
  name: TRateName;
}

export default function InputRate({ name }: IProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>();

  const getRate = async () => {
    try {
      setLoading(true);
      const res = await settingApi.getRateByName(name);
      setData(res.rate.toPrecision());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRate();
  }, []);

  const updateRate = async () => {
    try {
      if (isNaN(Number(data))) {
        message.error("Giá trị không hợp lệ!");
        return;
      }

      setLoading(true);
      await settingApi.updateRateByName(name, Number(data));
      message.success("Thành công");
    } catch (err) {
      console.log(err);
      message.error("Thất bại");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 max-w-[300px]">
      <h5 className="text-slate-500">
        Tỉ giá {name == "xinCoin-USDT" ? "XIN Coin / USDT" : "USDT / XIN Coin"}
      </h5>
      <div className="flex items-center gap-3">
        <Input value={data} onChange={(e) => setData(e.target.value)} />

        <Popconfirm
          title={`Bạn có chắc muốn đổi thành ${data} ?`}
          onConfirm={updateRate}
          okText="Yes"
          cancelText="No"
        >
          <Button loading={loading} type="primary">
            Lưu
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
