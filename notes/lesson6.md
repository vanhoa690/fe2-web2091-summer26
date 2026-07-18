# Ant Design + React + React Query

# Lesson 6 – Edit Story (Cập nhật truyện với useMutation + Form AntD)

---

# Nội dung bài học

Trong bài này chúng ta sẽ học:

- Cách edit (update) dữ liệu
- Sử dụng useMutation để gọi API PUT/PATCH
- Load dữ liệu chi tiết để edit
- Fill dữ liệu vào Form Ant Design
- Submit form để cập nhật
- Tự động reload lại danh sách sau khi edit

---

# 1. Edit Story là gì?

Edit (cập nhật) là:

Click Edit → Load dữ liệu → Fill form → Submit → Update API → Reload list

---

# 2. API cập nhật truyện

**PUT** http://localhost:3000/stories/:id

Ví dụ body:

```json
{
  "title": "Naruto Updated",
  "author": "Kishimoto",
  "description": "New description",
  "cover": "https://..."
}
```

---

# 3. Lấy dữ liệu chi tiết (useQuery)

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["story", id],
  queryFn: async () => {
    const res = await axios.get(`http://localhost:3000/stories/${id}`);
    return res.data;
  },
});
```

---

# 4. Fill dữ liệu vào Form

```tsx
useEffect(() => {
  if (data) {
    form.setFieldsValue(data);
  }
}, [data]);
```

---

# 5. useMutation để update

```tsx
const mutation = useMutation({
  mutationFn: async (values: any) => {
    return axios.put(`http://localhost:3000/stories/${id}`, values);
  },
});
```

---

# 6. Ví dụ hoàn chỉnh

```tsx
import { Form, Input, Button, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditStory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Lấy dữ liệu chi tiết
  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
  });

  // Fill form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  // Update
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.put(`http://localhost:3000/stories/${id}`, values);
    },
    onSuccess: () => {
      // reload list
      queryClient.invalidateQueries({ queryKey: ["stories"] });

      // quay lại list
      navigate("/");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Spin />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tên truyện">
        <Input />
      </Form.Item>

      <Form.Item name="author" label="Tác giả">
        <Input />
      </Form.Item>

      <Form.Item name="image" label="Ảnh">
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={mutation.isPending}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default EditStory;
```

---

# 7. Bài tập thực hành

### Bài 1 – Validate Form

#### Yêu cầu:

- Không cho submit nếu thiếu:
  - `title`
  - `author`

#### Gợi ý:

```tsx
<Form.Item
  name="title"
  rules={[{ required: true, message: "Nhập tên truyện" }]}
>
  <Input />
</Form.Item>
```

## Bài 2 – Loading khi update

- Button loading khi submit

#### Gợi ý:

```tsx
<Button loading={mutation.isPending}>
```

## Bài 3 – Thông báo thành công

- Hiển thị message success

#### Gợi ý:

```tsx
import { message } from "antd";

onSuccess: () => {
  message.success("Cập nhật thành công");
};
```

## Bài 4 – Quay lại trang list

- Dùng navigate("/")

#### Gợi ý:

```tsx
navigate("/");
```

## Bài 5 – Disable form khi loading

- Form disabled khi đang load

#### Gợi ý:

```tsx
<Form disabled={isLoading}>
```

## Bài 6 – PATCH (Nâng cao)

- Chỉ update 1 field

#### Gợi ý:

```tsx
axios.patch(`http://localhost:3000/stories/${id}`, {
  title: values.title,
});
```

---

# Tổng kết

- useQuery → GET data
- useMutation → UPDATE data
- setFieldsValue → fill form
- invalidateQueries → reload list
