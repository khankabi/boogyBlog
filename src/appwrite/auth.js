import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            // .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // your project id
        this.account = new Account(this.client);
    }
    // sign up
    async createAccount({ email, password, name }) {
        try {
            // this unique method provided by appwrite
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Login 
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // to check the user while login
    //from -> https://appwrite.io/docs/references/cloud/client-web/account
    async getCurrentUser() {
        try {
            const result = await this.account.get();
            return result
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: Error", error);
        }
        return null;
    }


    //delete session means LOG OUT
    async logout() {
        try {
            //  for single session
            // const result = await this.account.deleteSessions('<SESSION_ID>');

            // for multiple session i guess
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite service :: logout :: Error", error);
        }
    }
}
const authService = new AuthService();

export default AuthService;
