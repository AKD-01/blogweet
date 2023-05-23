import React, { useState, useEffect } from "react";
import { addPostToDb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

 
  let navigate = useNavigate();
  // form validation rules
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    postText: yup.string().required('PostText is required'),
    image: yup.string().url('Invalid link').matches(/^https:/, 'Link must start with "https://"').required('Image Link is required'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  


  const createPost = async () => {
    await addPostToDb(title, postText, image);
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldleImageUpload = (e) => {
    setImage(e.target.value);
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <form onSubmit={handleSubmit(createPost)}>
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            {...register('title')}
          />
          <p className="errorMessage">{errors.title?.message}</p>
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            {...register('postText')}
         />
         <p  className="errorMessage">{errors.postText?.message}</p>
        </div>
        <div className="inputImg">
          <label> Image Link</label>
          <div className="cont">
            <div>
              <input placeholder="https://" onChange={hanldleImageUpload} {...register('image')} />
              <p className="errorMessage">{errors.image?.message}</p>
            </div>
            <img src={image} alt="Uploaded preview" />
          </div>
        </div>

        <button > Submit Post </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
