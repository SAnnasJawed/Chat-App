import { useContext, useState } from "react";
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import showPwdImg from "/home/misbah/Desktop/chatApp/client/vite-project/src/assets/showpassword.svg";
import hidePwdImg from "/home/misbah/Desktop/chatApp/client/vite-project/src/assets/hidepassword.svg";

const SignUp = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerError,
    registerUser,
    isRegisterLoading,
  } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  console.log(registerInfo);
  const handleChange = (e) => {
    updateRegisterInfo({
      ...registerInfo,
      password: e.target.value,
    });
    setPwd(e.target.value);
  };
  return (
    <>
      <div className="App">
        <div className="pwd-container">
          <Form onSubmit={registerUser} to="/login">
            <Row
              style={{
                height: "100vh",
                justifyContent: "center",
              }}
            >
              <Col
                xs={4}
                style={{
                  boxShadow: "5px 10px 20px lightblue",
                  margin: "4em",
                  padding: "1em",
                  height: "490px",
                  borderRadius: "15px",
                  backgroundColor: "#1B1212",
                }}
              >
                <Stack gap={3}>
                  <h2 className="text-center">Register</h2>
                  <h6 className="text-center">
                    Already have an account..?
                    <span>
                      <a href="/login" style={{ color: "#D2042D" }}>
                        SignIn
                      </a>
                    </span>
                  </h6>
                  <Form.Control
                    type="text"
                    placeholder="FirstName"
                    onChange={(e) => {
                      updateRegisterInfo({
                        ...registerInfo,
                        first_name: e.target.value,
                      });
                    }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="LastName"
                    onChange={(e) => {
                      updateRegisterInfo({
                        ...registerInfo,
                        last_name: e.target.value,
                      });
                    }}
                  />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      updateRegisterInfo({
                        ...registerInfo,
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
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                  {/* <Button
                  className="btn btn-outline-primary"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </Button> */}

                  <Button className="btn btn-secondary" type="submit">
                    {isRegisterLoading ? "Creating your account" : "Register"}
                  </Button>

                  {registerError?.error && (
                    <Alert variant="danger">
                      <p>{registerError?.message}</p>
                    </Alert>
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

export default SignUp;
