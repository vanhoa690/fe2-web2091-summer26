import { Button } from "antd";
import { useUser } from "../context/UserContext";

function Login() {
  // sau login co user info
  const { setUser } = useUser();

  return (
    <div>
      <h2>Login</h2>
      <Button
        type="primary"
        onClick={() => setUser({ username: "hoadvUpdate" })}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
