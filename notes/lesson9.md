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

## 📁 src/stores/useAuthStore.ts

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

---

Có persist : lưu vào localStorage nên Reload vẫn giữ user

```json
{
  "auth-storage": {
    "state": {
      "user": {...},
      "token": "abc"
    }
  }
}
```

---

Kết luận

- create → tạo store
- set → update state
- persist → lưu localStorage

---

## 📁src/pages/Login.tsx

```tsx
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const Login = () => {
  const { setUser } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      return await axios.post("http://localhost:3000/login", values);
    },

    onSuccess: ({ data }) => {
      // lưu vào zustand
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

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: "50px auto" }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Nhập email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Nhập password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
```

---

## FLOW

1.  User nhập email/password
2.  Gọi API login
3.  Nhận token + user
4.  Lưu vào Zustand
5.  UI tự update
6.  Reload vẫn giữ login

---

## Tổng kết

- Zustand đơn giản hơn Context
- Phù hợp auth thực tế
- Có persist để lưu trạng thái

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
