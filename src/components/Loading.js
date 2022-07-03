import React from 'react'
import Loding from './loading.gif'

const Loading = () => {
    return (
      <div className='text-center my-3'>
         <img src={Loding} alt="loader" />
      </div>
    )
}

export default Loading