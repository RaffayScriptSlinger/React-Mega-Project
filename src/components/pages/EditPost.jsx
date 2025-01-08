import React, { useEffect, useState } from 'react'
import appwriteService from '../../appwrite/databaseConfig'
import { Container, PostForm } from "../index"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function EditPost() {
  const [post, setPost] = useState([])
  let navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    } else {
      navigate("/")
    }

  }, [slug, navigate])

  return (
    post ? (
      <div>
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    ) : null


  )
}

export default EditPost