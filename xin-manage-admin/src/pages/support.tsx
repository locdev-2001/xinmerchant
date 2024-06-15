import { userApi } from "@apis/user.api";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

type FieldType = {
  email?: string;
  newEmail?: string;
};

export default function Page() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const updateEmail = async (values: any) => {
    try {
      setErrors({});
      setLoading(true);
      await userApi.changeEmail(values);
      message.success("Thành công");
    } catch (err) {
      console.log(err);
      err?.response?.data?.errors && setErrors(err?.response?.data?.errors);
      message.error("Thất bại");
    }
    setLoading(false);
  };

  return (
    <div>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        layout="vertical"
        onFinish={updateEmail}
      >
        <Form.Item<FieldType>
          label="Email hiện tại"
          name="email"
          validateStatus={errors["email"] ? "error" : ""}
          help={errors["email"]?.[0]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email mới"
          name="newEmail"
          validateStatus={errors["newEmail"] ? "error" : ""}
          help={errors["newEmail"]?.[0]}
        >
          <Input />
        </Form.Item>

        <Button loading={loading} htmlType="submit" type="primary">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
