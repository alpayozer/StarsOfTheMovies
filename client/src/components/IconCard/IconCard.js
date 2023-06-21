import React from 'react';
import styles from "./IconCard.module.css";
import { Link } from "react-router-dom";

const IconCard = ({ title, image }) => {
    return (
        <Link className={styles.icon_link} to={`/movies/?category=${title}`}>
            <div className={styles.icon_body}>
                <img className={styles.icon} src={image} /><p>{title}</p>
            </div>
        </Link>
    );
}

export default IconCard;