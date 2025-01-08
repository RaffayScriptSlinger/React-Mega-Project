import React, { useState, useEffect } from 'react'
import appwriteService from '../../appwrite/databaseConfig'
import { Container, PostCard } from "../index"


function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPost([]).then((posts) => {
            posts ? setPosts(posts.documents) : setPosts([])
        })


    }, [])
    return (
        <div className='py-8 w-full '>
            <Container>
                {posts.map((post) => {
                    <PostCard key={post.$id} post={post} />
                })}
            </Container>
        </div>
    )
}

export default AllPosts