# Ant Design + React + React Query

# Lesson 5 – Thêm truyện tranh với useMutation + Axios

---

# Nội dung bài học

Trong bài này chúng ta sẽ học:

- Mutation trong React Query
- Gọi API bằng Axios
- Kết hợp Ant Design Form + React Query
- Ví dụ thêm truyện tranh
- Xử lý loading khi submit
- Bài tập thực hành

---

# 2. Khi nào dùng useMutation?

Trong React Query có hai loại hook chính:

| Hook        | Mục đích          |
| ----------- | ----------------- |
| useQuery    | Lấy dữ liệu (GET) |
| useMutation | Thay đổi dữ liệu  |

useMutation dùng cho:

- POST
- PUT
- PATCH
- DELETE

Ví dụ:

```id="mutation-example"
useMutation({
  mutationFn: createStory
})
```

---

# 3. API thêm truyện tranh

Giả sử API:

```
POST http://localhost:3000/stories
```

Body dữ liệu:

```json
{
  "title": "Naruto",
  "author": "Masashi Kishimoto",
  "cover": "https://image.com/naruto.jpg",
  "description": "Truyện hải tặc"
}
```

---

# 4. Form thêm truyện tranh

Chúng ta sẽ:

- dùng **Ant Design Form**
- gọi API bằng **Axios**
- sử dụng **useMutation**

---

# 5. Ví dụ hoàn chỉnh

```tsx
import { Form, Input, Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AddStory = () => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:3000/stories", data);

      return res.data;
    },

    onSuccess: () => {
      toast.success("Thêm truyện thành công");
    },

    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Tên truyện"
        name="title"
        rules={[{ required: true, message: "Nhập tên truyện" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Tác giả" name="author">
        <Input />
      </Form.Item>

      <Form.Item label="Image URL" name="cover">
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={mutation.isPending}>
        Thêm truyện
      </Button>
    </Form>
  );
};

export default AddStory;
```

---

# 6. Giải thích code

## useMutation

```tsx
const mutation = useMutation({
  mutationFn: async (data) => {...}
});
```

`mutationFn` là hàm thực hiện gọi API.

---

## Axios POST

```tsx
axios.post("http://localhost:3000/stories", data);
```

Axios sẽ gửi dữ liệu lên server.

---

## mutate

```tsx
mutation.mutate(values);
```

Gửi dữ liệu form tới API.

---

## loading khi submit

```tsx
loading={mutation.isPending}
```

Khi đang gọi API:

→ nút submit sẽ hiển thị loading.

---

# 7. Flow hoạt động

Luồng hoạt động của form:

```
User nhập form
      ↓
Submit form
      ↓
onFinish
      ↓
mutation.mutate()
      ↓
Axios POST API
      ↓
onSuccess / onError
```

---

# 8. Dữ liệu gửi lên server

Ví dụ khi submit form:

```json
{
  "title": "One Piece",
  "author": "Oda",
  "cover": "https://img.com/op.jpg",
  "description": "Truyện hải tặc"
}
```

---

# 9. Ưu điểm của React Query Mutation

| Feature        | Lợi ích            |
| -------------- | ------------------ |
| loading state  | không cần useState |
| error handling | xử lý lỗi dễ       |
| async API      | code gọn           |
| retry          | tự retry request   |

---

# 10. Bài tập thực hành

## Bài 1

Tạo **Form thêm danh mục truyện**

Field:

- Title (required)
- Description (Input.TextArea)
- Active (Checkbox)

Submit → gọi **Axios POST API**

```
POST /categories
```

---

## Bài 2

Thay **any** thành type/interface tương ứng Story

```
data: any
values: any
```

---

## Bài 3

Hiển thị **loading khi submit**

Sử dụng:

```
mutation.isPending
```

---

## Bài 4 (Nâng cao)

Hiển thị danh sách để chọn 1 danh mục khi thêm truyện mới.

- Call API GET /categories để lấy danh sách
- Đưa dữ liệu categories vào options của Select

Sử dụng:

```
Select options: [
    {
        value: categoryId,
        label: categoryTitle
    }
]
```

---

# Tổng kết

Trong bài này bạn đã học:

- React Query Mutation
- useMutation
- Gọi API bằng Axios
- Kết hợp Ant Design Form
- Submit dữ liệu lên server
