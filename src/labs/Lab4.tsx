import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import axios from "axios";

function Lab4() {
  // useQuery
  const { data } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const columns = [
    { title: "Ten truyen", dataIndex: "title" },
    { title: "Tac gia", dataIndex: "author" },
    { title: "Hinh anh", dataIndex: "cover" },
  ];

  return (
    <div>
      Lab4
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Lab4;
