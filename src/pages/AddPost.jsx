import React from 'react'
import {Container,PostCard, PostForm} from "../components/index"

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <PostForm></PostForm>
            </Container>
        </div>
    )
}

export default AddPost