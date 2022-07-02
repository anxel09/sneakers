import React from 'react';
import styles from './Info.module.scss'
export default function Info({title, description , image }){
    return (
        <div className={styles.emptyCart}>
            <img width={120} height={120} src={image} alt="cart" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}