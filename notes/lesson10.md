# Lesson 10 - Custom Hook với React Query (Quản lý Stories)

## Nội dung bài học

1. Hook là gì?
2. Custom Hook là gì?
3. Vì sao cần Custom Hook?
4. Cấu trúc thư mục
5. Viết useStoryList
6. Viết useAddStory
7. Viết useDeleteStory
8. Sử dụng trong UI
9. invalidateQueries hoạt động như thế nào?
10. Bài tập thực hành

---

## 1. Hook là gì?

Hook là các hàm đặc biệt của React giúp Function Component có thêm các khả năng như:

- Quản lý state (`useState`)
- Theo dõi vòng đời (`useEffect`)
- Quản lý Context (`useContext`)
- Thao tác DOM (`useRef`)

Ví dụ:

```tsx
const [count, setCount] = useState(0);
```

React đã cung cấp rất nhiều Hook có sẵn.

Ngoài ra chúng ta còn có thể tự tạo Hook riêng. Đó gọi là **Custom Hook**.

---

## 2. Custom Hook là gì?

Custom Hook là một hàm JavaScript/TypeScript có sử dụng Hook của React bên trong.

Quy tắc:

- Bắt đầu bằng `use`
- Có thể gọi các Hook khác
- Có thể trả về dữ liệu hoặc hàm

Ví dụ:

```ts
export const useHello = () => {
  return "Hello React";
};
```

Sử dụng:

```tsx
const text = useHello();
```

---

## 3. Tại sao cần Custom Hook?

Nếu viết API trực tiếp trong mỗi Component:

```tsx
const StoryList = () => {
  const { data } = useQuery(...);
}
```

Khi nhiều trang cùng cần dữ liệu Story, chúng ta phải lặp lại rất nhiều code.

Custom Hook giúp:

- Tái sử dụng logic
- Component ngắn gọn
- Dễ bảo trì

Ví dụ:

```tsx
const { data } = useStoryList();
```

---

## 4. So sánh trước và sau khi dùng Custom Hook

### Không dùng

```text
StoryList
 ├── useQuery
 ├── axios
 ├── loading
 ├── error
 └── UI
```

### Có dùng

```text
StoryList
 └── useStoryList()

useStoryList
 ├── useQuery
 ├── axios
 └── return data
```

---

## 5. Cấu trúc thư mục

```text
src
├── hooks
│   ├── useStoryList.ts
│   ├── useAddStory.ts
│   └── useDeleteStory.ts
├── pages
├── services
└── App.tsx
```

---

## 6. useStoryList

```ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStoryList = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });
};
```

---

## 7. useAddStory

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:3000/stories", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};
```

Luồng:

```text
POST
↓
onSuccess
↓
invalidateQueries
↓
useQuery gọi lại API
↓
UI cập nhật
```

---

## 8. useDeleteStory

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};
```

---

## 9. Sử dụng trong Component

```tsx
const { data, isLoading, isError } = useStoryList();
const { mutate } = useDeleteStory();
```

```tsx
<Button danger onClick={() => mutate(record.id)}>
  Xóa
</Button>
```

---

## 10. Hook thêm Story

```tsx
const { mutate, isPending } = useAddStory();

const onFinish = (values: any) => {
  mutate(values);
};
```

---

## 11. invalidateQueries

```ts
queryClient.invalidateQueries({
  queryKey: ["stories"],
});
```

Ý nghĩa:

> Dữ liệu `stories` đã thay đổi, React Query sẽ tự động gọi lại API và cập nhật giao diện.

---

## 12. Luồng hoạt động

```text
Component
↓
useStoryList
↓
useQuery
↓
axios
↓
Server
↓
Data
↓
Component
```

Thêm dữ liệu:

```text
Form
↓
useAddStory
↓
POST API
↓
onSuccess
↓
invalidateQueries
↓
Danh sách cập nhật
```

---

# Tổng kết

- Hook là gì
- Custom Hook là gì
- Tách logic khỏi UI
- useQuery
- useMutation
- invalidateQueries

---

# Bài tập

## Bài 1

Tạo `useUpdateStory`

- PUT `/stories/:id`
- Sau khi update tự reload dữ liệu

## Bài 2

Tạo `useStoryDetail(id)`

- GET `/stories/:id`

## Bài 3

Tách toàn bộ API sang:

```text
src/services/story.service.ts
```

Sau đó các Custom Hook chỉ gọi các hàm trong service.
