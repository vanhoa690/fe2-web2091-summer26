import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Lab6() {
  // 1. lay id
  const { id } = useParams();

  // 2. lay data theo id
  // const { data } = useQuery({
  //   queryKey: [],
  //   queryFn: () => {},
  // });

  // 3. fill Form
  // useEffect(() => {}, []);

  // 4. call api
  // const { mutate } = useMutation({
  //   mutationFn: () => {},
  // });

  const onFinish = (values: any) => {
    // mutate(values);
  };
  return (
    <div>
      <h2>Lab 6</h2>
      <Form onFinish={onFinish}>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Lab6;
