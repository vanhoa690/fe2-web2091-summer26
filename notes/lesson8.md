# Lesson 8 - Context API (State dùng chung trong React)

## Nội dung

- Context API là gì?
- Vì sao cần Context?
- Tạo Context
- Đọc và cập nhật dữ liệu
- Khi nào nên dùng

---

# 1. Bài toán

Giả sử ứng dụng có:

```text
App
 ├── Header
 └── Login
```

Sau khi Login:

- Header phải hiển thị tên người dùng
- Login phải cập nhật người dùng

Nếu truyền props:

```text
App
 ↓
Header

App
 ↓
Login
```

Khi project lớn:

```text
App
 ↓
Layout
 ↓
Home
 ↓
Header
```

Phải truyền props qua rất nhiều component.

Đây gọi là **Props Drilling**.

---

# 2. Context API là gì?

Context API giúp nhiều component **dùng chung dữ liệu** mà không cần truyền props qua nhiều tầng.

Ví dụ:

- User đăng nhập
- Theme
- Language

---

# Cấu trúc project

```text
src
│
├── context
│   └── UserContext.tsx
│
├── components
│   ├── Header.tsx
│   └── Login.tsx
│
├── App.tsx
└── main.tsx
```

---

# Bước 1 - Tạo Context

## src/context/UserContext.tsx

```tsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
```

> Với bài học đầu tiên, dùng `any` để tập trung hiểu Context API. Sau này sẽ thay bằng TypeScript đầy đủ.

---

# Bước 2 - Bọc App

## main.tsx

```tsx
<UserProvider>
  <App />
</UserProvider>
```

Ý nghĩa:

```text
UserProvider
     │
     App
   /     \
Header  Login
```

Mọi component bên trong đều dùng được Context.

---

# Bước 3 - Đọc dữ liệu

## Header.tsx

```tsx
import { Avatar } from "antd";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { user } = useUser();

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <>
          <Avatar src={user.avatar} />
          <span style={{ marginLeft: 10 }}>{user.name}</span>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </div>
  );
};

export default Header;
```

---

# Bước 4 - Cập nhật dữ liệu

## Login.tsx

```tsx
import { Button } from "antd";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        onClick={() =>
          setUser({
            name: "Hoà DV",
            avatar: "https://i.pravatar.cc/150",
          })
        }
      >
        Login
      </Button>

      <Button danger style={{ marginLeft: 10 }} onClick={() => setUser(null)}>
        Logout
      </Button>
    </div>
  );
};

export default Login;
```

---

# App.tsx

```tsx
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Header />
      <Login />
    </>
  );
}

export default App;
```

---

# Flow hoạt động

```text
Click Login
      │
      ▼
setUser(...)
      │
      ▼
UserContext thay đổi
      │
      ▼
Header tự render lại
      │
      ▼
Hiển thị tên người dùng
```

---

# Context hoạt động như thế nào?

```text
             UserProvider
                  │
      -------------------------
      │                       │
   Header                  Login
      │                       │
Đọc user              Gọi setUser()
      │                       │
      -------- Context --------
```

---

# So sánh Props và Context

| Props                       | Context                            |
| --------------------------- | ---------------------------------- |
| Truyền dữ liệu từ cha → con | Dùng chung dữ liệu                 |
| Dễ hiểu                     | Tiện khi nhiều component cùng dùng |
| Bị Props Drilling           | Không cần Props Drilling           |

---

# Khi nào dùng Context?

Nên dùng:

- Thông tin người dùng
- Theme
- Ngôn ngữ
- Cài đặt ứng dụng

Không nên dùng:

- Danh sách sản phẩm lớn
- Chat realtime
- Dữ liệu cập nhật liên tục

Khi ứng dụng lớn, nên dùng **Zustand**, **Redux Toolkit**.

---

# Bài tập

## Bài 1

- Tạo UserContext.
- Có `user` và `setUser`.

## Bài 2

- Header hiển thị "Chưa đăng nhập" hoặc tên người dùng.

## Bài 3

- Tạo nút Login cập nhật `user`.

## Bài 4

- Tạo nút Logout với `setUser(null)`.

## Bài 5 (Nâng cao)

- Tạo ThemeContext và chuyển đổi Light/Dark.

---

# Tổng kết

- Context API giúp chia sẻ dữ liệu giữa nhiều component.
- Provider lưu state dùng chung.
- Component dùng `useContext()` hoặc custom hook để đọc/cập nhật dữ liệu.
- Phù hợp với User, Theme, Language.
- Dự án lớn nên cân nhắc Zustand hoặc Redux Toolkit.
