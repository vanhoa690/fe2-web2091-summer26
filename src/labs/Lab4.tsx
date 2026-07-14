import { Table } from "antd";

function Lab4() {
  const columns = [
    { title: "Ten truyen", dataIndex: "title" },
    { title: "Hinh anh", dataIndex: "image" },
  ];
  const data = [
    {
      title: "naruto",
      image: "image",
    },
    {
      title: "onepeice",
      image: "image",
    },
  ];
  return (
    <div>
      Lab4
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Lab4;
