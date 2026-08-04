# Ant Design + React + React Query

# Lesson 11 --- Authentication với Bearer Token, Axios Interceptor & Private Route

## Nội dung bài học

- Authentication là gì
- Authentication Flow
- Token & JWT
- Login Flow
- Lưu Token
- Bearer Token
- Axios Instance
- Axios Request Interceptor
- Axios Response Interceptor
- React Query
- Protected Route
- Public Route
- Logout
- Best Practice
- Bài tập thực hành

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

## Response Interceptor

```ts
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
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
