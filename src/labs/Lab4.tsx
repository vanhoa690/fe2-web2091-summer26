import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

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
    {
      title: "Actions",
      render: (record: any) => {
        return (
          <Button danger>
            <Link to={`/edit/${record.id}`}>Edit</Link>
          </Button>
        );
      },
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
