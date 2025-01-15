import PropTypes from 'prop-types';

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <a className="btn btn-ghost normal-case text-xl">
        NZWalks
      </a>
      <div className="ml-auto flex space-x-4">
        <button className="btn btn-ghost">
        <a href="/regions">Regions</a>
        </button>
        <button className="btn btn-ghost" onClick={() => onMenuClick('privacy')}>
          Privacy
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Navbar;

