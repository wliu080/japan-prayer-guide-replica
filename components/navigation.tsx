import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigation() {
  return (
    <Navbar variant="dark">
      <Navbar.Brand href="/" className="logo">
        <Image fluid src="/hero/bts-crane-wht-logo.png" alt=""/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="d-flex justify-content-end" navbarScroll>
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="#about">ABOUT</Nav.Link>
          <Nav.Link href="#order">ORDER</Nav.Link>
          <Nav.Link href="#toolkit">TOOLKIT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
