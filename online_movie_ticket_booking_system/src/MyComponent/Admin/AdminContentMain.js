import React from 'react';
import styles from "./Admin.module.css"
const AdminContentMain = (props) => {
    console.log(props.selection);
    return (
        <div>
            <div className={styles.content}>
                    <p>Dashboard!!</p>
                </div>
        
                <div className={styles.content}>
                    <p>Profile</p>
                </div>
        </div>
    );
}

export default AdminContentMain;