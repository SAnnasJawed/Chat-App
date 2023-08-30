import { useContext, useState } from "react";
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import showPwdImg from "/home/misbah/Desktop/chatApp/client/vite-project/src/assets/showpassword.svg";
import hidePwdImg from "/home/misbah/Desktop/chatApp/client/vite-project/src/assets/hidepassword.svg";

const Login = () => {
  const { loginUser, loginError, isLoginLoading, loginInfo, updateLoginInfo } =
    useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const handleChange = (e) => {
    updateLoginInfo({
      ...loginInfo,
      password: e.target.value,
    });
    setPwd(e.target.value);
  };
  return (
    <>
      <div className="App">
        <div className="">
          <Form onSubmit={loginUser}>
            <Row style={{ height: "100vh", justifyContent: "center" }}>
              <Col
                xs={4}
                style={{
                  boxShadow: "5px 10px 20px lightblue",
                  margin: "5em",
                  padding: "1em",
                  height: "370px",
                  borderRadius: "15px",
                  backgroundColor: "#1B1212",
                }}
              >
                <Stack gap={3}>
                  <h2 className="text-center">Login</h2>
                  <h6 className="text-center">
                    New to this App..?
                    <span>
                      <a href="/signup" style={{ color: "#D2042D" }}>
                        Register
                      </a>
                    </span>
                  </h6>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      updateLoginInfo({
                        ...loginInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                  <Form.Control
                    name="pwd"
                    placeholder="Enter Password"
                    type={isRevealPwd ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <img
                  className="login-img"
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                  <Button className="btn btn-danger" type="submit">
                    {isLoginLoading ? "Logging In...." : "LogIn"}
                  </Button>
                  {loginError?.error && (
                    <>
                      <Alert variant="danger">
                        <p>{loginError?.message}</p>
                      </Alert>
                    </>
                  )}
                </Stack>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
