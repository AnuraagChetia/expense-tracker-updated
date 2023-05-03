import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-reducer";
// import { useNavigate } from "react-router-dom";

const NavigationBar = (props) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = (props) => {
    dispatch(authActions.logout());
    // navigate("/");
  };
  const theme = useSelector((state) => {
    return state.theme.darkTheme;
  });

  return (
    <Navbar bg={!theme ? "primary" : "dark"} variant="dark">
      <Container fluid>
        <NavbarBrand>Expense Tracker</NavbarBrand>
        <Nav>
          <Nav.Link to="/home">Home</Nav.Link>
          <Nav.Link>Product</Nav.Link>
          <Nav.Link>About Us</Nav.Link>
          <Nav.Link href="/" onClick={logoutHandler}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
