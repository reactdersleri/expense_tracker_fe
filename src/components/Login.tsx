import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { login } from "../store/actions/userActions";
import { LoginForm } from "../types/user";
import { AppState } from "../store";
import { useEffect } from "react";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

// import api from "../utils/api";
// import showError from "../utils/showError";

function Login() {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    /**
     * Todo Sorun Data'da use effect data'yı görmediği için tekrar çalışmıyor sadece sayfa başlangıcında çalışıyor.
    ** userReducerda "LOGİN_SUCCESS" olduğu anda data'ya action payload'dan veri yollamadığımız için data'yı görmemekteydi.
     */
    dispatch(login(values));
  };
  useEffect(() => {
    error && showError(error);
  }, [error]);

  /**
   * Todo: Zaten kullanıcı giriş yaptıysa showSuccess mesajı gelmiyor. Ona bak!
   */

  useEffect(() => {
    data.username && showSuccess("You have successfuly logged in!");
  }, [data]);
  
  useEffect(() => {
    if (token) {
      history.push("/categories");
    }
  }, [data]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>
      {location.state?.newSignUp && (
        <Result
          status="success"
          title="You succesfuly sign up"
          subTitle="Please login using your credentials"
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!", },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
