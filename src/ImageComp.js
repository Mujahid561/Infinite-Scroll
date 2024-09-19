import React from 'react'

function ImageComp({data}) {
  return (
    <div className='w-[18%] my-3 mx-[10px]'>
      <img className='w-[100%] h-[200px]' src={data?.url} alt="image"/>
    </div>
  )
}

export default ImageComp
