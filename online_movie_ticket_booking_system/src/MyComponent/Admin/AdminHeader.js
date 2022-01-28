import React from 'react';
import styles from './Admin.module.css';

export default function AdminHeader() {
    const today = new Date();
    var day = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3:"Wednesday",
        4:"Thursday",
        5:"Friday",
        6:"Saturday"
    };
    const today_day = today.getDay()
    const date = `${day[today_day]}, ${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`;
    return (
        <div className={styles.header}>
            <div className={styles.left_header}>
                Administrator Portal
            </div>
            <div className={styles.right_header}>
                <p>{date}</p>
            </div>
        </div>

    );
}
