import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router";

import api from "../utils/api";
import showError from "../utils/showError";

function SignUp() {

  const token = localStorage.getItem('token');
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  
  useEffect(() => {
    if (token) {
      history.push("/categories");
    }
  }, []);

  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values);
      /**
       ** ÇÖZÜLDÜ Eğer api'a giden parametreler zorunlu parametre olmasa bile yanlış keyde gider ise servis 500 hatası verecektir.
       */
      /**
       ** Bu aşamadan sonra kullanıcı login endpointine yollamamız gerekiyor...
       ** ...bunun için history kullanıcaz
       */
      history.push("/login", { newSignUp: true}); //**Burada kullanıcı yeni üye olup login sayfasına yönlendiğinin bilgisini almak için yapıyoruz bu bilgiyi login sayfasında kullana bilmek için location objesini kullanıcaz reat-dom'dan */
      /**
       ** history react-router-dom'un yönlendirme parametresidir.
       */
    } catch (error) {
      showError((error as any).response.data.errorMessage);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Register for an account
      </h2>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please input your password !", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="full_name" label="Fullname">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
