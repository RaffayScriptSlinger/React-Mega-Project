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
            return this.account.get()

        } catch (error) {
            throw error
        }
        return null;
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