import React, { ReactNode, useEffect, useState } from "react";
import { Dropdown, MenuProps, Spin } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch } from "@redux/index";
import { useSelector } from "react-redux";
import { routes } from "@utils/routes";
import { userActions, userSelector } from "@redux/user.redux";
import { deleteCookie, setCookie } from "cookies-next";
import { manageLogActions } from "@redux/manage-log.redux";
import { Permission } from "@utils/constants";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const TextBreadcrumb = {
  "admin-account": "Tài khoản admin",
  support: "Hỗ trợ",
  finance: "Tài chính",
  list: "Danh sách",
  create: "Tạo",
  "[id]": "Chi tiết",
  "": "Thống kê",
};

interface IProps {
  children: ReactNode;
  menuCollapsed?: boolean;
}

const MainLayout = ({ children, menuCollapsed }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState<string>(null);
  const [openKeys, setOpenKeys] = useState(null);
  const { authenticated, admin, loadingAuthenticate } =
    useSelector(userSelector);

  const items: MenuItem[] = [
    admin.role == "super_admin" &&
      getItem("Thống kê", "/", <i className="fa-light fa-chart-line"></i>),
    ["super_admin", "support"].includes(admin.role) &&
      getItem(
        "Hỗ trợ",
        routes.support,
        <i className="fa-regular fa-envelope"></i>
      ),
    ["super_admin", "finance"].includes(admin.role) &&
      getItem(
        "Tài chính",
        routes.finance,
        <i className="fa-sharp fa-regular fa-dollar-sign"></i>
      ),
    ["super_admin"].includes(admin.role) &&
      getItem(
        "Tài khoản",
        routes.adminAccount,
        <i className="fa-regular fa-user"></i>,
        [
          getItem("Tạo", routes.adminAccountCreate),
          getItem("Danh sách", routes.adminAccount),
        ]
      ),
  ];

  useEffect(() => {
    let pathname = router.pathname;
    setOpenKeys([`/${pathname.split("/")[1]}`]);
    setSelectedKey(pathname);
  }, [router]);

  const toggleCollapsed = (value: boolean) => {
    setCookie("menuCollapsed", value ? "true" : "false", { path: "/" });
    setCollapsed(value);
  };

  useEffect(() => {
    setCollapsed(menuCollapsed);
  }, [menuCollapsed]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(userActions.authenticate()).unwrap();
        await dispatch(
          manageLogActions.listLogs({ page: 1, limit: 10 })
        ).unwrap();
      } catch (err) {
        console.log(err);
        err?.response?.status == 401 && logout();
      }
    })();
  }, [authenticated]);

  const logout = () => {
    deleteCookie("access_token", { path: "/" });
    setTimeout(() => {
      router.push("/login");
    }, 300);
  };

  const itemsUserDropdown: MenuProps["items"] = [
    {
      label: <span>Đăng xuất</span>,
      key: "0",
      icon: (
        <span>
          <i className="fa-light fa-arrow-right-from-bracket"></i>
        </span>
      ),
      onClick: logout,
    },
  ];

  const LoadingAuth = () => (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );

  return loadingAuthenticate || !authenticated ? (
    <LoadingAuth />
  ) : (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div
          className="flex items-center justify-center"
          style={{ height: 32, margin: 16 }}
        >
          {!collapsed ? (
            <span className="text-white text-2xl font-semibold">Admin</span>
          ) : (
            <h1 className="m-0">L</h1>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onClick={(value) => {
            router.push(value.key);
          }}
          onOpenChange={(value) => {
            setOpenKeys(value);
          }}
        />
      </Sider>

      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex w-full justify-end items-center h-full px-3">
            <Dropdown menu={{ items: itemsUserDropdown }} trigger={["click"]}>
              <a
                className="flex items-center gap-3"
                onClick={(e) => e.preventDefault()}
              >
                <span className="flex justify-center items-center w-7 h-7 text-sm border border-gray-500 text-gray-500 rounded-full">
                  <i className="fa-light fa-user"></i>
                </span>
                <span className="text-sm text-slate-500">{admin?.email}</span>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {selectedKey
              ?.split("/")
              .filter((item) => !!item)
              .map((item, index) => (
                <Breadcrumb.Item
                  key={`${item}_${index}`}
                  className="capitalize"
                >
                  {TextBreadcrumb[item]}
                </Breadcrumb.Item>
              ))}
            {selectedKey == "/" && (
              <Breadcrumb.Item className="capitalize">Thống kê</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="w-full min-h-full bg-white p-3">{children}</div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
