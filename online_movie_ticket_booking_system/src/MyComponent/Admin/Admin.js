
import styles from './Admin.module.css'; 
import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContent from './AdminContent';

export default function Admin() {

  

  return (

    <div className={styles.root} >
      <AdminHeader/>
      <AdminContent />
      <AdminFooter />
    </div>
    
  );
}
