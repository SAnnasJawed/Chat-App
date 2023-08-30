import { useContext } from "react";
import { Container, Nav, Stack, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar
      bg="dark"
      className="mb-4 blur"
      style={{ height: "3.75rem" }}
      sticky="top"
    >
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {user && (
          <>
            <span className="text-warning">
              Logged In As {user?.data.first_name + " " + user?.data.last_name}
            </span>
          </>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link to="/signup" className="link-light text-decoration-none">
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
