import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "@redux/index";
import { IManageLog, IManageLogAction } from "src/models/manage-log.model";
import { Table, TableProps } from "antd";
import { manageLogActions, manageLogSelector } from "@redux/manage-log.redux";
import { IAdmin } from "src/models/user.model";
import moment from "moment";
import { userSelector } from "@redux/user.redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { routes } from "@utils/routes";

interface DataType extends IManageLog {
  key: string;
  index: number;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { dataLogs, loadingGetListLogs } = useSelector(manageLogSelector);
  const { admin } = useSelector(userSelector);
  const router = useRouter()

  useEffect(()=>{
    if (admin.role == "support") router.push(routes.support)
      else if (admin.role == "finance") router.push(routes.finance)
  },[])

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (value: IManageLogAction) => (
        <>
          {value == "change_email" && <span>Thay đổi Email</span>}
          {value == "update_rate" && <span>Thay đổi tỉ giá</span>}
          {value == "create_admin_account" && <span>Tạo tài khoản</span>}
          {value == "update_admin_account" && <span>Cập nhật tài khoản</span>}
          {value == "delete_admin_account" && <span>Xóa tài khoản</span>}
        </>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "_",
      key: "_",
      render: (v, record) => (
        <div>
          {record.action == "change_email" && (
            <div>
              Đổi từ <b>{record?.data?.email}</b> thành{" "}
              <b>{record?.newData?.email}</b>
            </div>
          )}

          {record.action == "update_rate" && (
            <div>
              Đổi <b>{record?.data?.name}</b> từ <b>{record?.data?.rate}</b>{" "}
              thành <b>{record?.newData?.rate}</b>
            </div>
          )}

          {record.action == "create_admin_account" && (
            <div>
              Tạo tài khoản <b>{record?.newData?.email}</b>
            </div>
          )}

          {record.action == "update_admin_account" && (
            <div>
              Chỉnh sửa tài khoản <b>{record?.newData?.email}</b>
            </div>
          )}

          {record.action == "delete_admin_account" && (
            <div>
              Xoá tài khoản <b>{record?.newData?.email}</b>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Người thực hiện",
      dataIndex: "admin",
      key: "admin",
      render: (value: IAdmin) => <div>{value?.email}</div>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (
        <div>{moment(value).format("DD/MM/YYYY HH:mm:ss")}</div>
      ),
    },
  ];

  return (
    <>
      <main className="">
        <section>
          <h3 className="mb-3 text-slate-500 font-semibold">Lịch sử</h3>
          <Table
            bordered
            columns={columns}
            dataSource={[...dataLogs.data].map((item, index) => ({
              ...item,
              key: item.id,
              index: index + 1,
            }))}
            loading={loadingGetListLogs}
            pagination={{
              pageSize: dataLogs.paginate.limit,
              current: dataLogs.paginate.page,
              total: dataLogs.paginate.totalRecords,
              onChange: (page) => {
                dispatch(
                  manageLogActions.listLogs({
                    page,
                    limit: dataLogs.paginate.limit,
                  })
                );
              },
            }}
          />
        </section>
      </main>
    </>
  );
}
