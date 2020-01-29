import React from 'react'
import styles from '../style/Modal.module.scss'
import { AddNewProduct } from './AddNewProduct';


const Modal =() => (
    <div className={styles.wrapper}>
        <AddNewProduct/>
    </div>
);

export default Modal;