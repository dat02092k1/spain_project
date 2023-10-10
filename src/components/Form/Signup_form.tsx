import { useEffect } from "react";
import { Form, Input } from "antd";
import { signup } from "../../repository/auth";
import { useStoreActions, useStoreState } from "../../store/hook";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { UtilConstants } from "../../shared/constant";

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

function Signup_form() {
  const setUserInfo = useStoreActions((actions) => actions.setUserInfo);
  const currentUser = useStoreState((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.loggedIn) {
      navigate("/shop");
    }
  }, [currentUser?.loggedIn, navigate]);

  const onFinish = async (values: any) => {
    try {
      await signup(values.user);
      setUserInfo({
        email: values.user.email,
        password: values.user.password,
        loggedIn: true,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Tài khoản đã tồn tại`,
        showConfirmButton: true,
      });
    }
  };
  return (
    <>
      <motion.div
        className="mt-[100px]"
        initial="initial"
        animate="visible"
        exit="exit"
        variants={UtilConstants.variants}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          className="mx-auto mt-[300px]"
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[{ required: true, min: 6, max: 10 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <button className="bg-[#1576ff] text-[#ffffff] p-4 rounded">
              Signup
            </button>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
}

export default Signup_form;
