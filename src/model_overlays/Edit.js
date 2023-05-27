import React, {useState } from 'react';
import Card from '../components/Card';
import styles from './Edit.module.css';
import { Fragment } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { toast } from 'react-toastify';

const Edit = (props) => {
    const [titleValue, setTitleValue] = useState(props.title || '');
    const [descriptionValue, setDescriptionValue] = useState(props.description || '');
    const [imageValue, setImageValue] = useState(props.image || '');
    
      function submitData() {
        toast(`Your post updated succesfully`);
        const updatedTitle = titleValue;
        const updatedDescription = descriptionValue;
        const updatedImage = imageValue;
    
        const updatedData = doc(db, 'posts', props.id);
    
        updateDoc(updatedData, {
          title: updatedTitle,
          postText: updatedDescription,
          image: updatedImage,
        }).then(() => {
          props.onConfirm();
        });
      }

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
            <input
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            ></input>
            <input
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            ></input>
            <input
              value={imageValue}
              onChange={(e) => setImageValue(e.target.value)}
            ></input>
          </div>
        </div>
        <footer className={styles.actions}>
          <button onClick={submitData} className={styles.button}>
            Update
          </button>
        </footer>
      </Card>
    </Fragment>
  );
};

export default Edit;
