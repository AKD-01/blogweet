import React from 'react'


import { TailSpin } from  'react-loader-spinner'
function Loading() {
  return (
    <div >
      <TailSpin
     
  height="80"
  width="80"
  color="#fff"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
  )
}

export default Loading

