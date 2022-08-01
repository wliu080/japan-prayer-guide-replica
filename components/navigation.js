import Image from "react-bootstrap/Image";
import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar>
      <Navbar.Brand href="/" className="logo">
        <Image fluid src="/bts-crane-wht-logo.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="d-flex justify-content-end" navbarScroll>
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="/about">ABOUT</Nav.Link>
          <Nav.Link href="#order">ORDER</Nav.Link>
          <Nav.Link href="/toolkit">TOOLKIT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
