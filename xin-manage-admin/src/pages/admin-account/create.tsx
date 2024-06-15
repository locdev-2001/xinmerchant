import { adminAccountApi } from "@apis/admin-account.api";
import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";

type FieldType = {
  email?: string;
  role?: string;
  password?: string;
};

export default function Page() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const create = async (values: any) => {
    console.log(values);
    try {
      setErrors({});
      setLoading(true);
        await adminAccountApi.create(values);
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
        onFinish={create}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          validateStatus={errors["email"] ? "error" : ""}
          help={errors["email"]?.[0]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Vai trò"
          name="role"
          validateStatus={errors["role"] ? "error" : ""}
          help={errors["role"]?.[0]}
        >
          <Select
            options={[
              { label: "Hỗ trợ", value: "support" },
              { label: "Tài chính", value: "finance" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu"
          name="password"
          validateStatus={errors["password"] ? "error" : ""}
          help={errors["password"]?.[0]}
        >
          <Input />
        </Form.Item>

        <Button loading={loading} htmlType="submit" type="primary">
          Tạo
        </Button>
      </Form>
    </div>
  );
}
