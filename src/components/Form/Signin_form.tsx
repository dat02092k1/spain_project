import { useEffect } from "react";
import { Checkbox, Form, Input } from "antd";
import { FieldType, IUser } from "../../types/interface";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../repository/auth";
import { useStoreActions, useStoreState } from "../../store/hook";
import Swal from "sweetalert2";
import "./Antd.css";
import { motion } from "framer-motion";
import { UtilConstants } from "../../shared/constant";

function Signin_form() {
  const setUserInfo = useStoreActions((actions) => actions.setUserInfo);
  const currentUser = useStoreState((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.loggedIn) {
      console.log("User has logged in:", currentUser?.loggedIn);
      navigate("/shop");
    }
  }, [currentUser?.loggedIn, navigate]);

  const onFinish = async (values: any) => {
    try {
      const user: IUser = {
        email: values.username,
        password: values.password,
      };

      const res = await signin(user);
       
      setUserInfo({
        email: user.email,
        password: user.password,
        loggedIn: true,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Tên đăng nhập hoặc mật khẩu không đúng`,
        showConfirmButton: true,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <motion.div
        className="mt-[100px]"
        variants={UtilConstants.variants}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <Form
          className="m-auto text-[#fff]"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox className="text-[#fff]">Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="flex gap-3">
              <button className="bg-[#1576ff] text-[#ffffff] p-4 rounded">
                Signin
              </button>

              <Link
                className="p-4 bg-red-500 text-[#ffffff] rounded"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
}

export default Signin_form;
