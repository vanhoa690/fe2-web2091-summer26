# Lesson 9 -- Zustand (Quản lý Auth User với JSON Server Auth)

---

## Nội dung bài học

- Zustand là gì?
- So sánh với Context API
- Cài đặt Zustand
- Tạo auth store
- Kết nối JSON Server Auth
- Login / Logout thật
- Persist user (localStorage)

---

## 1. Zustand là gì?

Zustand là thư viện quản lý state nhẹ, đơn giản, không cần Provider.

---

## 2. Vì sao dùng Zustand?

### Context API

- Phải tạo Provider
- useContext
- Dễ re-render

### Zustand

- Không cần Provider
- Gọi trực tiếp store
- Code ngắn gọn

---

## Cài đặt

```bash
npm install zustand
```

---

## Setup JSON Server Auth

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

### Run server

```bash
npm run db
```

---

## 3. Tạo Auth Store

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
    },
  ),
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

Kết luận

- create → tạo store
- set → update state
- persist → lưu localStorage

---

## 4. Login

```tsx
const { mutate } = useMutation({
  mutationFn: async (values: any) => {
    return await axios.post("http://localhost:3000/login", values);
  },
  onSuccess: ({ data }) => {
    setUser({
      user: data.user,
      token: data.accessToken,
    });
    message.success("Đăng nhập thành công!");
  },
  onError: () => {
    message.error("Sai email hoặc password!");
  },
});
```

## 5. Đọc dữ liệu từ Store

```tsx
const user = useAuthStore((state) => state.user);

return <h3>{user?.email}</h3>;
```

Khi dữ liệu trong Store thay đổi, component sẽ tự động render lại.

---

## 6. Logout

```tsx
const logout = useAuthStore((state) => state.logout);

<Button onClick={logout}>Logout</Button>;
```

---

## 7. Flow

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

## Bài 1 – Register User

### Yêu cầu

- Tạo form đăng ký gồm:
  - username
  - email
  - password
- Sử dụng useMutation gọi API URL http://localhost:3000/register

### Kết quả mong muốn

- Đăng ký thành công
- Tự động login sau khi register

---

## Bài 2 – Hiển thị thông tin user

### Yêu cầu

- Sau khi login:
  - Hiển thị email ở Header
  - Hiển thị trạng thái: "Đã đăng nhập"

### Gợi ý

- Lấy `user` từ Zustand

---

## Bài 3 – Logout

### Yêu cầu

- Tạo nút Logout
- Khi click:
  - Xóa user
  - Xóa token

### Kết quả

- UI cập nhật ngay
- Header hiển thị "Chưa đăng nhập"

---

## Bài 4 – Persist Login

### Yêu cầu

- Reload trang
- Vẫn giữ trạng thái login

### Gợi ý

- Dùng middleware `persist` của Zustand

---
