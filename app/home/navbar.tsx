import 'app/styles/navbar.css';



export default function Navbar({ press }:{press:()=> void}) {
  return (
    <nav className="navbar">
      <div className="navbar-section left">
        {press && (
          <button className="back-btn" onClick={press}>
            ← Back
          </button>
        )}
      </div>
      <div className="navbar-section center">
        <h1 className="navbar-title">Type The Rainbow</h1>
      </div>
      <div className="navbar-section right">
        {/* Placeholder for login/logout */}
      </div>
    </nav>
  );
}