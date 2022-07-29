import NavItem from "../components/navitem";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-section left">Beneath the Surface</div>
      <div className="nav-section right">
        <ul>
          <NavItem>Home</NavItem>
          <NavItem post="about">About</NavItem>
          <NavItem post="order">Order</NavItem>
          <NavItem post="toolkit">Toolkit</NavItem>
        </ul>
      </div>
    </nav>
  );
}
