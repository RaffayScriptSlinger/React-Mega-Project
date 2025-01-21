import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../index"
import appwriteService from '../../appwrite/databaseConfig'
import { useNavigate } from 'react-router-dom'

function Home() {
    
    const [post, setPost] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if (post) {
                setPost(post.documents)
            }
        })
    })
    if (post.length === 0) {
        return (
            <Container>
                <div className="container">
                    <h1 className="text-center">No Posts Found</h1>
                    <h2 className="text-center text-red-700">Login To View All Posts</h2>
                </div>
            </Container>
        )
    }

    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        post.map((post) => {
                            <div key={post.$id} className='p-2'>
                                <PostCard post={post} />

                            </div>
                        })
                    }

                </div>
            </Container>
        </div>)
}

// Here is an commit

export default Home