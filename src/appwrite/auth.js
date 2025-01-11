import config from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    account;

    constructor() {
        this.Client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)
        this.account = new Account(this.Client)

    }
    async createAcount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // Here We Call Another Method

            } else {
                return userAccount
            }
        }
        catch (error) {
            throw error
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        }
        catch (error) {
            console.log(error);
        }

    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error('Error fetching current user:', error); // Optional: log error for debugging
            return null; // Gracefully return null if an error occurs
        }
    }
    
    async logout() {
        try {
            await this.account.deleteSessions()

        } catch (error) {
            throw error
        }
    }
}


export const authService = new AuthService();

export default authService;