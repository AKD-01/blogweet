import React from 'react';
import './Alert.css'
export function Alert({ message, type ,setAlert}) {
   React.useEffect(()=>{
      setTimeout(()=>{
         setAlert(null)
      },3000)
   },[setAlert])
   return <div className={`alert ${type}`}>{message}</div>;
}