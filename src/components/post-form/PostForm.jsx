import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function PostForm(post) {

    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            content:post?.content || '',
            slug:post?.slug || '',
            status:post?.status || ''

        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit = async (data) => {
        if(post) {
            const file =  data.image[0] ? appwriteService.uplodaFile(data.image[0]):null;

            if(file){
                appwriteService.deleteFile(post.image)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{...data,image: file ? file.$id : undefined})
            
            if(dbPost){
                navigate(  `/post/${dbPost.$id}`);
            }
        }
        else{
            const file = data.image[0] ? appwriteService.uplodaFile(data.image[0]):null;

            if(file){
                const fileID =  file.$id;
                data.image = fileID;
                const dbPost = await appwriteService.creatPost({
                    ...data,
                    userId:userData.$id
                })

                if(dbPost){
                    navigate(`/psot/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof(value) === 'string'){
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
        }
        else{
            return "";
        }
    },[])

    useEffect(() => {
        const subcription = watch((value,{name}) => {
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,
                    {shouldValidate:true}));
            }
        })

        return () => {
            subcription.unsubscribe();
        }


    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm