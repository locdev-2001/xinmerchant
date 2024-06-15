import { adminAccountApi } from "@apis/admin-account.api";
import { routes } from "@utils/routes";
import { Table, TableProps, Tag } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IAdmin } from "src/models/user.model";
import { IDataPaginate } from "src/models/utils";

interface DataType extends IAdmin {
  key: string;
  index: number;
}

export default function Page() {
  const router = useRouter();
  const [dataAdmin, setDataAdmin] = useState<IDataPaginate<IAdmin>>({
    data: [],
    paginate: {
      page: 1,
      limit: 10,
      totalRecords: 0,
      totalPages: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (
        <div>{moment(value).format("DD/MM/YYYY HH:mm:ss")}</div>
      ),
    },
    {
        title: "Chức năng",
        dataIndex: "_",
        key: "_",
        render: (v, record) => (
          <div>
            <a role="button" onClick={()=>{
                router.push(routes.adminAccountDetail(record.id))
            }}>
                <Tag color="blue-inverse" >Xem chi tiết</Tag>
            </a>
          </div>
        ),
      },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      let data = await adminAccountApi.list({
        ...(router.query as any),
      });

      setDataAdmin(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(()=>{
    getData()
  },[router])

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={[...dataAdmin.data].map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))}
        loading={loading}
        pagination={{
          pageSize: dataAdmin.paginate.limit,
          current: dataAdmin.paginate.page,
          total: dataAdmin.paginate.totalRecords,
          onChange: (page) => {
            router.push({
              query: {
                ...router.query,
                page,
                limit: dataAdmin.paginate.limit,
              },
            });
          },
        }}
      />
    </div>
  );
}
