const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <a href="/regions" className="btn btn-ghost normal-case text-xl">
        NZ
      </a>
      <div className="ml-auto flex space-x-4">
        <button className="btn btn-ghost">
        <a href="/regions">Regions</a>
        </button>
        <button className="btn btn-ghost">
        <a href="/admin">Admin</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

