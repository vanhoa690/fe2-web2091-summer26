# Lesson 7 – Ôn tập: Table + Form + useQuery + useMutation

## Mục tiêu

Sau bài học này, bạn có thể:

- Hiểu được vai trò của Table trong Ant Design.
- Hiểu được Form hoạt động như thế nào.
- Biết khi nào sử dụng `useQuery`.
- Biết khi nào sử dụng `useMutation`.
- Kết hợp được cả 4 thành phần để xây dựng màn hình CRUD.

---

# 1. Ant Design Table

## Table là gì?

`Table` là component dùng để **hiển thị dữ liệu dạng bảng**.

Ví dụ:

- Danh sách sinh viên
- Danh sách sản phẩm
- Danh sách khách hàng
- Danh sách đơn hàng

Đây là component được sử dụng nhiều nhất trong các trang quản trị (Admin Dashboard).

---

## Table dùng để làm gì?

Table giúp:

- Hiển thị nhiều bản ghi
- Phân trang (Pagination)
- Sắp xếp (Sort)
- Tìm kiếm
- Lọc dữ liệu
- Chọn nhiều dòng
- Thao tác Sửa / Xóa

---

## Cách sử dụng

### Bước 1

Chuẩn bị dữ liệu

```tsx
const data = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
  },
];
```

---

### Bước 2

Định nghĩa cột

```tsx
const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Tuổi",
    dataIndex: "age",
  },
];
```

---

### Bước 3

Hiển thị

```tsx
<Table rowKey="id" columns={columns} dataSource={data} />
```

---

## Một số props thường dùng

| Props      | Ý nghĩa                    |
| ---------- | -------------------------- |
| columns    | Khai báo các cột           |
| dataSource | Dữ liệu                    |
| rowKey     | Khóa duy nhất của mỗi dòng |
| loading    | Hiển thị loading           |
| pagination | Phân trang                 |

---

# 2. Ant Design Form

## Form là gì?

Form là component dùng để:

> Thu thập dữ liệu từ người dùng.

Ví dụ:

- Đăng nhập
- Đăng ký
- Thêm sản phẩm
- Chỉnh sửa sinh viên

---

## Form dùng để làm gì?

Form giúp:

- Quản lý state
- Validate dữ liệu
- Submit dữ liệu
- Reset dữ liệu
- Hiển thị lỗi

---

## Cách sử dụng

### Khởi tạo Form

```tsx
const [form] = Form.useForm();
```

---

### Khai báo Form

```tsx
<Form form={form} onFinish={onFinish}>
```

---

### Input

```tsx
<Form.Item name="name" label="Tên">
  <Input />
</Form.Item>
```

---

### Submit

```tsx
<Button htmlType="submit">Lưu</Button>
```

---

### Lấy dữ liệu

```tsx
const onFinish = (values) => {
  console.log(values);
};
```

---

## Validate

```tsx
<Form.Item
  name="email"
  rules={[
    {
      required: true,
      message: "Không được bỏ trống",
    },
  ]}
>
  <Input />
</Form.Item>
```

---

## Một số hàm thường dùng

```tsx
form.resetFields();

form.setFieldsValue(data);

form.getFieldsValue();

form.validateFields();
```

---

# 3. React Query - useQuery

## useQuery là gì?

`useQuery` là hook dùng để:

> Lấy dữ liệu từ API.

Có thể hiểu:

```
GET dữ liệu
```

---

## useQuery dùng để làm gì?

Ví dụ:

- Lấy danh sách sản phẩm
- Lấy danh sách sinh viên
- Lấy chi tiết sản phẩm
- Lấy danh sách người dùng

---

## Cách sử dụng

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["students"],
  queryFn: getStudents,
});
```

---

## Các giá trị thường dùng

| Thuộc tính | Ý nghĩa      |
| ---------- | ------------ |
| data       | Dữ liệu      |
| isLoading  | Đang tải     |
| isError    | Có lỗi       |
| error      | Nội dung lỗi |
| refetch    | Gọi lại API  |

---

## Quy trình

```
Component

↓

useQuery

↓

queryFn

↓

API

↓

Server

↓

Dữ liệu trả về

↓

Component render
```

---

## Khi nào dùng useQuery?

✔ Lấy dữ liệu

✔ Hiển thị danh sách

✔ Hiển thị chi tiết

✔ Dashboard

---

# 4. React Query - useMutation

## useMutation là gì?

`useMutation` là hook dùng để:

> Thay đổi dữ liệu trên Server.

Có thể hiểu:

```
POST

PUT

PATCH

DELETE
```

---

## useMutation dùng để làm gì?

Ví dụ:

- Thêm sản phẩm
- Cập nhật sản phẩm
- Xóa sản phẩm
- Đăng nhập
- Upload ảnh

---

## Cách sử dụng

```tsx
const mutation = useMutation({
  mutationFn: createStudent,
});
```

---

## Gọi mutation

```tsx
mutation.mutate(values);
```

---

## Có callback

```tsx
const mutation = useMutation({
  mutationFn: createStudent,

  onSuccess() {
    console.log("Thành công");
  },

  onError(error) {
    console.log(error);
  },
});
```

---

## Các thuộc tính thường dùng

| Thuộc tính | Ý nghĩa      |
| ---------- | ------------ |
| mutate     | Gọi API      |
| isPending  | Đang xử lý   |
| isSuccess  | Thành công   |
| isError    | Có lỗi       |
| error      | Nội dung lỗi |

---

# 5. useQuery và useMutation khác nhau như thế nào?

| useQuery                     | useMutation                                    |
| ---------------------------- | ---------------------------------------------- |
| Lấy dữ liệu                  | Thay đổi dữ liệu                               |
| GET                          | POST / PUT / PATCH / DELETE                    |
| Tự chạy khi component render | Chỉ chạy khi gọi `mutate()`                    |
| Có cache                     | Không cache dữ liệu trả về theo cách của query |
| Hiển thị danh sách           | Thêm, sửa, xóa                                 |

---

# 6. Kết hợp Table + Form + React Query

Một màn hình CRUD thường hoạt động như sau:

```
useQuery
      │
      ▼
Lấy dữ liệu từ API
      │
      ▼
Hiển thị bằng Table
      │
      ▼
Nhấn Thêm hoặc Sửa
      │
      ▼
Mở Form
      │
      ▼
Nhập dữ liệu
      │
      ▼
Submit Form
      │
      ▼
useMutation gọi API
      │
      ▼
Thành công
      │
      ▼
Invalidate Query / Refetch
      │
      ▼
Table cập nhật dữ liệu mới
```

---

# 7. Khi nào dùng thành phần nào?

| Nhu cầu            | Sử dụng     |
| ------------------ | ----------- |
| Hiển thị danh sách | Table       |
| Nhập dữ liệu       | Form        |
| Lấy dữ liệu        | useQuery    |
| Thêm, sửa, xóa     | useMutation |

---

# 8. Tóm tắt

## Table

- Hiển thị dữ liệu dạng bảng.
- Có phân trang, sắp xếp, lọc.
- Thường dùng trong các trang quản trị.

---

## Form

- Thu thập dữ liệu từ người dùng.
- Quản lý giá trị nhập.
- Kiểm tra hợp lệ trước khi gửi.

---

## useQuery

- Dùng để lấy dữ liệu (GET).
- Tự động gọi API khi component được render.
- Có cơ chế cache và refetch.

---

## useMutation

- Dùng để thay đổi dữ liệu (POST, PUT, PATCH, DELETE).
- Chỉ thực thi khi gọi `mutate()`.
- Thường kết hợp với `invalidateQueries` để cập nhật lại dữ liệu.

---

# 9. 5 câu hỏi vấn đáp

## Câu 1

**Table trong Ant Design dùng để làm gì? có thành phần nào ?**

---

## Câu 2

**Form trong Ant Design có vai trò gì? có thành phần nào ?**

## Câu 3

**Khi nào nên sử dụng `useQuery`? cách dùng `useQuery` như nào ?**

---

## Câu 4

**`useMutation` khác `useQuery` ở điểm nào? cách dùng `useMutation` như nào ?**

---

## Câu 5

**Trong một màn hình CRUD, Table, Form, useQuery và useMutation phối hợp với nhau như thế nào?**

---

# Kết luận

Bốn thành phần **Table**, **Form**, **useQuery** và **useMutation** là nền tảng để xây dựng hầu hết các màn hình quản trị trong React.

- **Table** giúp hiển thị dữ liệu.
- **Form** giúp nhập và kiểm tra dữ liệu.
- **useQuery** giúp lấy dữ liệu từ API.
- **useMutation** giúp thay đổi dữ liệu trên server.

Nắm vững cách sử dụng và phối hợp bốn thành phần này sẽ giúp bạn xây dựng các chức năng CRUD một cách hiệu quả, dễ bảo trì và tối ưu trải nghiệm người dùng.
