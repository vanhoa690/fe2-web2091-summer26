# Ant Design + React + React Query

# Lesson 4 – Hiển thị danh sách truyện với useQuery + Table AntD

---

# Nội dung bài học

Trong bài này chúng ta sẽ học:

- React Query là gì
- useQuery trong React Query
- Gọi API GET danh sách truyện
- Hiển thị dữ liệu với Table Ant Design
- Xử lý loading & error
- Mapping dữ liệu vào columns
- Kết hợp React Query + Table

---

# 1. React Query là gì?

React Query là thư viện giúp **quản lý dữ liệu API trong React**.

Thư viện này giúp:

- Gọi API dễ dàng
- Quản lý loading
- Quản lý error
- Cache dữ liệu
- Đồng bộ dữ liệu

Tên chính thức hiện nay là:

**TanStack Query**

---

# 2. useQuery là gì?

Trong React Query có hai loại hook chính:

| Hook        | Mục đích          |
| ----------- | ----------------- |
| useQuery    | Lấy dữ liệu (GET) |
| useMutation | Thay đổi dữ liệu  |

`useQuery` dùng để **lấy dữ liệu từ API (GET)**.

`useQuery` sẽ:

- Tự động gọi API
- Cache dữ liệu
- Tự động refetch
- Quản lý loading & error

---

# 2. Cách dùng cơ bản

```tsx
useQuery({
  queryKey: ["stories"],
  queryFn: fetchStories,
});
```

---

# 3. API lấy danh sách truyện

GET http://localhost:3000/stories

---

# 4. Ví dụ hoàn chỉnh

```tsx
import { Table, Image, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const StoryList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url: string) => <Image src={url} width={60} />,
    },
    {
      title: "Tên truyện",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
  ];

  if (isLoading) return <Spin />;

  if (isError) return <p>Lỗi khi tải dữ liệu</p>;

  return <Table columns={columns} dataSource={data} />;
};

export default StoryList;
```

---

# 5. Bài tập thực hành

---

## Bài 1 – Hiển thị cột Created At

Thêm cột hiển thị ngày tạo của truyện trong Table.

### Yêu cầu:

- Hiển thị thêm cột `Created At`
- Format ngày theo dạng: `dd/mm/yyyy`

### Gợi ý:

Thêm column:

```tsx
{
  title: "Created At",
  dataIndex: "createdAt",
  render: (date: string) => new Date(date).toLocaleDateString("vi-VN")
}
```

---

## Bài 2 – Thêm cột Action (Xóa)

Thêm cột chứa nút **Xóa truyện**.

### Yêu cầu:

- Mỗi dòng có 1 nút "Xóa"
- Click → gọi API DELETE
- Xóa thành công → cập nhật lại danh sách

### Gợi ý:

Tạo button trong column:

```tsx
{
  title: "Action",
  render: (_, record) => (
    <button onClick={() => handleDelete(record.id)}>
      Xóa
    </button>
  )
}
```

Hàm gọi API:

```tsx
const handleDelete = async (id: number) => {
  await axios.delete(`http://localhost:3000/stories/${id}`);
};
```

👉 Nâng cao: dùng `useMutation` + `invalidateQueries`

---

## Bài 3 – Thêm phân trang (Pagination)

Thêm phân trang cho Table.

### Yêu cầu:

- Mỗi trang hiển thị 5 bản ghi
- Có thể chuyển trang

### Gợi ý:

```tsx
<Table pagination={{ pageSize: 5 }} />
```

---

## Bài 4 – Reload danh sách sau khi thêm truyện

Sau khi thêm truyện ở Lesson 4 → danh sách tự động cập nhật.

### Yêu cầu:

- Không cần reload trang
- Table tự cập nhật dữ liệu mới

### Gợi ý:

Sử dụng `queryClient.invalidateQueries`

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

queryClient.invalidateQueries({ queryKey: ["stories"] });
```

👉 Gọi trong `onSuccess` của `useMutation`

---

## Bài 5 (Nâng cao) – Tìm kiếm truyện

Thêm chức năng search theo tên truyện.

### Yêu cầu:

- Input tìm kiếm
- Lọc danh sách theo title

### Gợi ý:

```tsx
const filteredData = data?.filter((item: any) =>
  item.title.toLowerCase().includes(keyword.toLowerCase()),
);
```

# Tổng kết

- useQuery giúp gọi API GET
- Table AntD giúp hiển thị dữ liệu đẹp
- Kết hợp giúp xây dựng UI nhanh và clean
