import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="profile-page">
      <h2 className="product-heading">My Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Username</span>
            <span className="profile-value">{user?.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;