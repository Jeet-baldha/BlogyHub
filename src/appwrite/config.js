import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query} from "appwrite"


export class Service{

    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setEndpoint(conf.appWriteProjectID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async creatPost({title,slug,content,image,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error: " + error);
        }
    }

    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error: " + error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            );

            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error: " + error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error: " + error);
            return false;
        }

    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {

            return await this.databases.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                queries,
            )   
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error: " + error);
            return false;
        }

    }

    // file upload service

    async uplodaFile(file){

        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uplodaFile :: error: " + error);
            return false;
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error: " + error);
            return false;
        }
    }

    async getFilePreview(fileId){
        return  this.bucket.getFilePreview(
            conf.appWriteBucketID,
            fileId
        )
    }
}

const service = new Service();

export default service;