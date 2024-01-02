const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID : String(import.meta.env.VITE_APPWRITE_PROCJECT_ID),
    appWriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;