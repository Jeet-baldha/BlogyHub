/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import  AppwriteService from "../appwrite/config"
import { PostForm,Container } from '../components/index'
import { useParams, useNavigate } from 'react-router-dom';


function EditPost() {

    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if(slug){
            AppwriteService.getPost(slug).then((post) => {
                    if(post){
                        setPost(post);
                    }
                }
            )
        }
        else{
            navigate('/');
        }
    },[navigate,slug])

    return (
        post ? (
            <div className='py-8'>
                <Container>
                    <PostForm post={post}></PostForm>
                </Container>
            </div>
        ) : null
    )
}

export default EditPost