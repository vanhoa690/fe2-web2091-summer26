import { Button, Form, Input } from "antd";

function Lab5() {
  const onFinish = () => {};
  return (
    <div>
      <h2>Lab5</h2>
      <Form onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[]}>
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Lab5;
