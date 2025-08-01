// Major configuration for appwrite
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf/conf'

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            // .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // your project id
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //Create document means data record
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug, // documentId // random id 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }, // data
            );
            return result;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: createPost :: error', error);
        }
    }

    //Update database collection
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }, // data (optional)
            );
            return result
        }
        catch (error) {
            console.log('Appwrite Service :: config.js :: updatePost :: error', error);
        }
    }

    //Delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug, // documentId
            );
            return true;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: deletePost :: error', error);
            return false;
        }
    }

    //getParticularDocument
    async getPost(slug) {
        try {
            const result = await this.databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug, // documentId
            );
            return result;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: getPost:: error', error);
            return false;
        }
    }

    //qeury
    async getPosts(qeuries = [Query.equal('status', "active")]) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                qeuries,

            );
            return result;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: getPosts:: error', error);
            return false;
        }
    }

    //file upload service
    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId, // bucketId
                ID.unique(), // fileId
                file, // file
            );
            return result;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: uploadFile:: error', error);
            return false;
        }
    }

    //delete file
    async deleteFile(fileId) {
        try {
            const result = await this.bucket.deleteFile(
                conf.appwriteBucketId, // bucketId
                fileId
            );
            return true;
        } catch (error) {
            console.log('Appwrite Service :: config.js :: getPost:: error', error);
            return false;
        }
    }

    //file preview
    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('Appwrite Service :: config.js :: getFilePreview:: error', error);
            return false;
        }
    }

}
const service = new Service();
export default service;