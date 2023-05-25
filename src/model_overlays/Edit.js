import React from 'react'
import Card from '../components/Card'
import styles from './Edit.module.css'
import { Fragment } from 'react'

const Edit = (props) => {
    return (
        <Fragment>
            <div className={styles.backdrop} onClick={props.onConfirm} />
            <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2>Edit the Blog</h2>
                </header>
                <div className={styles.main_content}>
                    <div className={styles.content}>
                        <p>title</p>
                        <p>description</p>
                        <p>Image</p>
                    </div>
                    <div className={styles.content}>
                        <input defaultValue ={props.title}></input>
                        <input defaultValue ={props.description}></input>
                        <input defaultValue ={props.image}></input>
                    </div>
                </div>
                <footer className={styles.actions}>
                    <button onClick={props.onConfirm} className={styles.button} >Update</button>
                </footer>
            </Card>
        </Fragment>
    )
}

export default Edit;