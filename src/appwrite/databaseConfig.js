import config from "../config"
import { Client, ID, Databases, Storage, Query } from "appwrite"

export default class appwriteService {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            throw error
        }


    }
    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )

        } catch (error) {
            throw error
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
            return true


        } catch (error) {
            throw error;
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    async getPosts(queries = [Query.equal("status", "equal")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            )


        } catch (error) {
            throw error
        }
    }
    // file Upload Services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file,
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }
    async deleteFile(FileId) {
        try {
            return await this.bucket.deleteFile(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                FileId
            )
            return true

        } catch (error) {
            throw error
            return false
        }
    }
    getFilePreview(FileId) {
        this.bucket.getFilePreview(
            config.appWriteBucketId,
            FileId
        )
    }
    getFileDownload(FileId) {
        this.bucket.getFileDownload(
            config.appWriteBucketId,
            FileId
        )
    }
}
