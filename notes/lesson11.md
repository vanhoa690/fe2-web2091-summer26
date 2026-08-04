# Lesson 11 --- Authentication & Private Route

## Nội dung bài học

- Authentication Flow
- Bearer Token
- Axios Interceptor
- Protected Route

---

## Authentication Flow

```text
User
  │
  ▼
Đăng nhập
  │
  ▼
POST /login
  │
  ▼
Server xác thực
  │
  ▼
Trả về User + Token
  │
  ▼
Lưu LocalStorage
  │
  ▼
Protected Route kiểm tra Token
  │
  ▼
Axios Interceptor thêm Bearer Token
  │
  ▼
Call API
  │
  ▼
Server xác thực
  │
  ▼
200 OK hoặc 401 Unauthorized
```

## Lưu Token

```ts
localStorage.setItem("token", token);

const token = localStorage.getItem("token");
```

## Axios Instance

```ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosClient;
```

## Request Interceptor

```ts
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

## Protected Route

```tsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## Sử dụng Protected Route

```tsx
<Route
  path="/add"
  element={
    <ProtectedRoute>
      <AddPage />
    </ProtectedRoute>
  }
/>
```

## Logout

```ts
localStorage.removeItem("token");
navigate("/login");
```

## Best Practice

- Chỉ tạo một `axiosClient`
- Dùng Request Interceptor để thêm Bearer Token
- Dùng Response Interceptor xử lý `401`
- Bảo vệ UI bằng `ProtectedRoute`
- Backend luôn phải xác thực token

## Bài tập

1.  Tạo `axiosClient.ts`
2.  Thêm Request Interceptor.
3.  Thêm Response Interceptor xử lý `401`.
4.  Tạo `ProtectedRoute`.
5.  Tạo `PublicRoute`.
6.  Gọi API bằng React Query.
7.  Kiểm tra toàn bộ Authentication Flow.
