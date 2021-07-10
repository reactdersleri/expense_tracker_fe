import { message } from "antd";

const showError = (errorMessage: string) => {
  message.error(errorMessage);
};

export default showError;
