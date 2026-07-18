import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

interface StoryForm {
  title: string;
  // author, cover, description
}

function Lab5() {
  // useMutation: POST data
  const { mutate } = useMutation({
    mutationFn: async (data: StoryForm) => {
      await axios.post("http://localhost:3000/stories", data);
    },
    onSuccess: () => {
      message.success("Them thanh cong");
      // nav sang list
    },
    onError: () => {
      message.error("Them that bai");
    },
  });

  const onFinish = (values: StoryForm) => {
    console.log(values);
    mutate(values);
  };
  return (
    <div>
      <h2>Lab5</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true },
            {
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Lab5;
