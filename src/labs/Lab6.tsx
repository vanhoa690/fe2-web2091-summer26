import { Button, Form, Input } from "antd";

function Lab6() {
  const onFinish = () => {};
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
