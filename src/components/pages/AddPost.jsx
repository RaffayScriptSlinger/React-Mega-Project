import React from 'react'
import PostForm from '../Post-Form/postForm'
import { Container } from '../index'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost