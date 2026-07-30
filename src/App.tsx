import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import Lab6 from "./labs/Lab6";
import Lab4 from "./labs/Lab4";
// import { useUser } from "./context/UserContext";
import Login from "./labs/Login";
import useAuthStore from "./stores/useAuthStore";

function App() {
  //  lay user
  // const { user } = useUser();

  const { user } = useAuthStore();
  console.log(user);

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user && <span>{user.email}</span>}
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        <Routes>
          <Route path="/" element={<Lab4 />}></Route>
          <Route path="/edit/:id" element={<Lab6 />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
