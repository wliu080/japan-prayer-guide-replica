import NavItem from "../components/navitem";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-section left">Beneath the Surface</div>
      <div className="nav-section right">
        <ul>
          <NavItem>Home</NavItem>
          <NavItem page="about">About</NavItem>
          <NavItem page="order">Order</NavItem>
          <NavItem page="toolkit">Toolkit</NavItem>
        </ul>
      </div>
    </nav>
  );
}
