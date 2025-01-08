import React from 'react'
import appwriteService from "../../appwrite/databaseConfig"
import { Link } from 'react-router-dom'

function PostCard({
    $id, title, featureImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-300 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService && appwriteService.getFilePreview(featureImage)} alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>

    )
}

export default PostCard