import { Button } from "antd";
import useAuthStore from "../stores/useAuthStore";

function Login() {
  // sau login co user info
  const { setUser } = useAuthStore();

  return (
    <div>
      <h2>Login</h2>
      <Button
        type="primary"
        onClick={() =>
          setUser({ username: "hoadv", email: "hoadvUpdate@gmail.com" })
        }
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
