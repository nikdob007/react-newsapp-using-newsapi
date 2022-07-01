import React, { Component } from 'react'
import Loding from './loading.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center my-3'>
         <img src={Loding} alt="loader" />
      </div>
    )
  }
}

export default Loading