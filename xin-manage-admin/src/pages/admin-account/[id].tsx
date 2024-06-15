import { adminAccountApi } from "@apis/admin-account.api";
import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FieldType = {
  email?: string;
  role?: string;
  password?: string;
};

export default function Page() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const create = async (values: any) => {
    console.log(values);
    try {
      setErrors({});
      setLoading(true);
      await adminAccountApi.updateById(
        router.query?.id?.toString() || "",
        values
      );
      message.success("Thành công");
    } catch (err) {
      console.log(err);
      err?.response?.data?.errors && setErrors(err?.response?.data?.errors);
      message.error("Thất bại");
    }
    setLoading(false);
  };

  useEffect(() => {
    let id = router.query.id?.toString() || "";
    id &&
      (async () => {
        try {
          let data = await adminAccountApi.getById(id);
          form.setFieldsValue(data);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [router]);

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
          label="Mật khẩu mới"
          name="password"
          validateStatus={errors["password"] ? "error" : ""}
          help={errors["password"]?.[0]}
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
