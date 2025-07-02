import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src="/logo.jpeg" alt="Base Badge" className="logo rounded-full w-16 h-16" />
        <h1 className="title">Base Badge</h1>
      </div>
    </nav>
  );
};

export default Navbar;
