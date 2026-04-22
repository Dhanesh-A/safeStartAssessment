import SideMenu from './SideMenu';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideMenu />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;