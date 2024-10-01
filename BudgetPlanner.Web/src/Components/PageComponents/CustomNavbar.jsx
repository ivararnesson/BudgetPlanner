import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "../style/SideNavbar.css"
import bpIcon from "../../Assets/BP-icon.png"

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="nav">
      <Container fluid>
        <Navbar.Brand className="nav--title" as={Link} to="/">
          <img
            className="nav--img"
            src={bpIcon}
            alt='Brand'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/income">Inkomst</Nav.Link>
            <Nav.Link as={Link} to="/expences">Utgifter</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Sök"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Sök</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// npm install react-bootstrap bootstrap
// npm install react-router-dom

