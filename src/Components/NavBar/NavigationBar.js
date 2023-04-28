import { useContext } from "react";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const NavigationBar = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = (props) => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <Navbar bg="primary" variant="dark">
      <Container fluid>
        <NavbarBrand>Expense Tracker</NavbarBrand>
        <Nav>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Product</Nav.Link>
          <Nav.Link>About Us</Nav.Link>
          <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
