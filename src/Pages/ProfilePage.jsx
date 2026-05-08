import { useDispatch, useSelector } from 'react-redux';
import ButtonComp from '../Components/ButtonComp';
import { useEffect, useState } from 'react';
import { updateUser } from '../Redux/Actions/LoginAction';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [userName,setUsername] = useState('');
  const [showEdit,setShowEdit] = useState(false);
  const [newName,setNewName] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!user) return;
    console.log(user,'userDetails')
    setUsername(user?.name)
  },[user]);


  const handleEdit = () =>{
    setShowEdit((prev)=> !prev)
  }
  const handleUpdate = () => {
    if(!newName || newName?.length === 0) return;
    setUsername(newName);
    const payload = {
      name: newName,
      email: "dhanesh123@gmail.com",
      password: "Testing@123",
      id: 4
    }
    
    dispatch(updateUser(payload))
  }

  return (
    <div className="profile-page">
      <h2 className="product-heading">My Profile</h2>
      {showEdit && <input type='text' value={newName} onChange={(e)=>setNewName(e.target.value)} />}
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Username</span>
            <span className="profile-value">{userName}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email}</span>
          </div>
        </div>
       
      </div>
       <div stye={{width:'10%'}}>
         {!showEdit  ? <ButtonComp className="loginBtnStyle" btnLable="Click to Edit user" onClick={handleEdit}/> : <ButtonComp className="loginBtnStyle" btnLable="Click to update user" onClick={handleUpdate}/>}
        </div>
    </div>
  );
};

export default ProfilePage;