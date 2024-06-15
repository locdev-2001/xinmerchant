import { useAppDispatch } from "@redux/index";
import { userActions } from "@redux/user.redux";
import { routes } from "@utils/routes";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { setCookie } from "cookies-next";
import moment from "moment";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let temp = { ...form };
    temp[e.target.name] = e.target.value;
    setForm(temp);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await dispatch(userActions.login({ ...form })).unwrap();
      message.success("Thành công")
      router.push(routes.dashboard);
    } catch (err) {
      console.log(err);
      err?.response?.data?.message &&
        message.error(err?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <>
      <main className="bg-gray-100 w-full h-screen flex justify-center items-center">
        <div className="bg-white p-5 min-w-[400px] rounded-md">
          <form onSubmit={onSubmit}>
            <h2 className="text-2xl text-slate-700 text-center">
              Chào mừng đến với <b>XIN Manage</b>
            </h2>

            <div className="mt-3" />
            <div className="flex flex-col text-slate-700 mb-3 gap-1">
              <label>Email</label>
              <input
                onChange={onChange}
                value={form.email}
                className="outline-0 p-2 border rounded-md"
                type="text"
                name="email"
              />
            </div>
            <div className="flex flex-col text-slate-700 mb-3 gap-1">
              <label>Mật khẩu</label>
              <input
                onChange={onChange}
                value={form.password}
                className="outline-0 p-2 border rounded-md"
                type="password"
                name="password"
              />
            </div>
            <div>
              <Button
                loading={loading}
                className="block w-full"
                size="middle"
                type="primary"
                htmlType="submit"
              >
                <span>Đăng nhập</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
