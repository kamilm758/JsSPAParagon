import React from 'react'
import styles from '../style/Modal.module.scss'
import { AddNewProduct } from './AddNewProduct';


const Modal =({closeModalFn}) => (
    <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={closeModalFn}>X</button>
        <AddNewProduct/>
    </div>
);

export default Modal;