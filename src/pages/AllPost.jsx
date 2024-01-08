/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import  AppwriteService from "../appwrite/config"
import { PostCard,Container } from '../components/index'


function AllPost() {

    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        AppwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        } )
    },[])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...posts}/>
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost