import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../store/actions/userActions";

const token = localStorage.getItem("token");

function AppHeader() {
  const history = useHistory();

  const logoutBtn = () => {
    logout();
    history.push("/login");
  };
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        {token === null ? (
          <>
            <Link to="/login">
              <Menu.Item key="/login">Giriş Yap</Menu.Item>
            </Link>
            <Link to="/register">
                <Menu.Item key="/register">Kayıt Ol</Menu.Item>
            </Link>
          </>
        ) : (
          <>
            <Link to="/categories">
              <Menu.Item key="/categories">Kategoriler</Menu.Item>
            </Link>
            <Link to="/records">
              <Menu.Item key="/records">Harcama Kayıtlarım</Menu.Item>
            </Link>
            <Menu.Item onClick={logoutBtn}>Çıkış Yap</Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
}

export default AppHeader;
