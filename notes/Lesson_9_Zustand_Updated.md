# Lesson 9 -- Zustand (Quản lý trạng thái đăng nhập với Zustand)

---

## Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu Zustand là gì
- So sánh Zustand với Context API
- Tạo Store bằng Zustand
- Quản lý trạng thái đăng nhập
- Gọi API Login bằng React Query
- Lưu trạng thái bằng `persist`
- Đọc dữ liệu từ Store và Logout

---

## Nội dung bài học

- Ôn lại Context API
- Zustand là gì?
- Vì sao dùng Zustand?
- Cài đặt Zustand
- Tạo Auth Store
- Kết nối JSON Server Auth
- Login với React Query
- Đọc dữ liệu từ Store
- Logout
- Persist với localStorage

---

## 1. Ôn lại Context API

Ở bài trước chúng ta đã học Context API để chia sẻ dữ liệu giữa nhiều component.

Tuy nhiên khi ứng dụng lớn hơn (quản lý đăng nhập, giỏ hàng, theme...), việc sử dụng Context API sẽ khá dài dòng.

Zustand giúp quản lý state toàn cục đơn giản hơn và **không cần Provider**.

---

## 2. Zustand là gì?

Zustand là thư viện quản lý state nhẹ, đơn giản và dễ học.

Store có thể hiểu là một **kho dữ liệu chung** của toàn bộ ứng dụng.

Thay vì truyền props qua nhiều component, mọi component đều có thể lấy dữ liệu trực tiếp từ Store.

---

## 3. Context API và Zustand

| Context API | Zustand |
|-------------|----------|
| Cần Provider | Không cần Provider |
| Dùng useContext | Gọi Store trực tiếp |
| Phù hợp project nhỏ | Phù hợp project vừa và lớn |
| Code nhiều hơn | Code ngắn gọn hơn |

> Context API vẫn là lựa chọn rất tốt cho các ứng dụng nhỏ.

---

## 4. Cài đặt

```bash
npm install zustand
```

---

## 5. Setup JSON Server Auth

Trong bài học này chúng ta sử dụng JSON Server Auth để mô phỏng API đăng nhập.

Trong dự án thực tế, API sẽ được cung cấp bởi Backend (NodeJS, Laravel, Spring Boot,...), còn cách sử dụng Zustand vẫn tương tự.

### db.json

```json
{
  "users": [
    {
      "email": "admin@gmail.com",
      "password": "$2a$10$3cvf5QEZ67nFSzYpYScBiOcyghM9w/Y.2HoZs/9ZJC6qccHPv62Cq",
      "id": 1
    }
  ]
}
```

### Chạy server

```bash
npm run db
```

---

## 6. Tạo Auth Store

**src/stores/useAuthStore.ts**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  token: string | null;

  setUser: (data: { user: any; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: ({ user, token }) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
```

### create()

Tạo một Store mới.

Store sẽ chứa:

- user
- token
- các hàm cập nhật dữ liệu

### persist()

`persist` tự động lưu dữ liệu vào localStorage.

```
Đăng nhập
    ↓
Store cập nhật
    ↓
persist lưu localStorage
    ↓
Reload
    ↓
Đọc lại dữ liệu
```

---

## 7. Login

```tsx
const { mutate } = useMutation({
  mutationFn: async (values:any)=>{
    return await axios.post("http://localhost:3000/login", values);
  },
  onSuccess:({data})=>{
    setUser({
      user:data.user,
      token:data.accessToken
    });
    message.success("Đăng nhập thành công!");
  },
  onError:()=>{
    message.error("Sai email hoặc password!");
  }
});
```

### mutate()

```
mutate(values)
      ↓
Gọi API Login
      ↓
onSuccess hoặc onError
```

---

## 8. Đọc dữ liệu từ Store

```tsx
const user = useAuthStore((state) => state.user);

return <h3>{user?.email}</h3>;
```

Khi dữ liệu trong Store thay đổi, component sẽ tự động render lại.

---

## 9. Logout

```tsx
const logout = useAuthStore((state)=>state.logout);

<Button onClick={logout}>
  Logout
</Button>
```

---

## 10. Flow

```
Form Login
      ↓
useMutation
      ↓
POST /login
      ↓
API trả về user + token
      ↓
setUser()
      ↓
Store cập nhật
      ↓
Header tự render
      ↓
persist
      ↓
Reload vẫn đăng nhập
```

---

## Khi nào nên dùng Zustand?

Nên dùng:

- Đăng nhập
- Giỏ hàng
- Theme
- User Profile
- Ngôn ngữ

Không nên dùng:

- State chỉ sử dụng trong một component.

---

# Tổng kết

- Zustand đơn giản hơn Context API
- Không cần Provider
- Dễ quản lý state toàn cục
- Persist giúp lưu trạng thái sau khi reload
- Có thể kết hợp React Query để quản lý đăng nhập

---

# Bài tập

## Bài 1

Hiển thị email người dùng từ Store.

## Bài 2

Tạo nút Logout.

## Bài 3

Tạo form Register và gọi API `/register`, sau đó tự động đăng nhập.

## Bài 4

Kiểm tra tính năng Persist bằng cách reload trang.
