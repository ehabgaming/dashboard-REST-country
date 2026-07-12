import { Link } from "react-router";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>World Data</h2>

      <p>Explore population and regional information about countries.</p>

      <Link to="/">Dashboard</Link>
    </aside>
  );
}

export default Sidebar;
