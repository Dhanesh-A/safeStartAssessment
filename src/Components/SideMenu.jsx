import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../Redux/Actions/LoginAction';

// ✅ Import icons from react-icons
import { FiShoppingBag, FiUser, FiLogOut, FiChevronLeft, FiChevronRight, FiMenu } from 'react-icons/fi';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
      </button>

      {isOpen && (
        <>
          {/* Header */}
          <div className="sidebar-header">
            <FiMenu size={20} />
            <span>Dashboard</span>
          </div>

          {/* User Details Section */}
          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>

          <hr className="sidebar-divider" />

          {/* Menu Items */}
          <nav className="sidebar-nav">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'nav-item nav-active' : 'nav-item'
              }
            >
              <FiShoppingBag size={18} />   {/* ✅ Product icon */}
              <span>Product List</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'nav-item nav-active' : 'nav-item'
              }
            >
              <FiUser size={18} />           {/* ✅ Profile icon */}
              <span>Profile</span>
            </NavLink>
          </nav>

          <hr className="sidebar-divider" />

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
};

export default SideMenu;