import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import appwriteService from '../../appwrite/databaseConfig'
import { Container, Button } from '../index'
import { useSelector } from 'react-redux'
import parse from "html-react-parser"





export default function Post() {
    const Navigate = useNavigate()
    const slug = useParams()
    const [post, setPost] = useState({})
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                post ? setPost(post) : Navigate('/')
            })
        } else {
            Navigate('/')
        }

    }, [slug, Navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((currentSatus) => {
            if (currentSatus) {
                appwriteService.deleteFile(post.featureImage);
                Navigate("/")
            }
        })

    }
    return (
        <div>
            <Container>
                <h1>{post.title}</h1>
                <p>{parse(post.content)}</p>
                {isAuthor && (
                    <div>
                        <Button onClick={deletePost}>Delete Post</Button>
                        <Link to={`/edit/${post.$id}`}>Edit Post</Link>
                    </div>
                )}

            </Container>
        </div>
    )
}

