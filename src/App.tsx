import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

function App() {
  return (
    <Layout>
      <AppHeader/>
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Category}/>
        <PrivateRoute path="/records" component={Records}/>
        <PrivateRoute path="/logout" component={Logout}/>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
