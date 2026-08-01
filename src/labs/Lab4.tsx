import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useStoryList from "../hooks/useStoryList";

function Lab4() {
  const { user } = useContext(UserContext);
  console.log(user);
  // useQuery
  // const { data } = useQuery({
  //   queryKey: ["stories"],
  //   queryFn: async () => {
  //     const res = await axios.get("http://localhost:3000/stories");
  //     return res.data;
  //   },
  // });

  const { data, isError, isFetching } = useStoryList();

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
