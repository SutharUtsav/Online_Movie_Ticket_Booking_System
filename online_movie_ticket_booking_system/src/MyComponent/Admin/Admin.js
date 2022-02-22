import React, {useState} from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContent from './AdminContent';


export default function Admin() {
  const [isProfile,setIsProfile] = useState(false);

  // useEffect(()=>{
  //   console.log(isProfile)
  // })
  return (

    < >
      <AdminHeader isProfile={isProfile} setIsProfile={setIsProfile}/>
      <AdminContent isProfile={isProfile} setIsProfile={setIsProfile}/>
      <AdminFooter />
    </>
    
  );
}
