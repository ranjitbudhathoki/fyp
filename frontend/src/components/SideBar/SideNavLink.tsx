import { Link, useLocation } from 'react-router-dom';

const SideNavLink = ({ url, children }) => {
  const location = useLocation();
  const activeLink = location.pathname === url;
  return (
    <button
      className={`${
        activeLink ? 'bg-[#434343]' : ''
      } overflow-hidden rounded-md`}
    >
      <Link className="flex gap-2 items-center px-6 py-3" to={url}>
        {children}
      </Link>
    </button>
  );
};

export default SideNavLink;
