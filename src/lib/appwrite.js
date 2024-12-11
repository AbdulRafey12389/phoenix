// NODE MODULES...
import { Client, Account, ID } from 'appwrite';

// INITIAL APPWRITE CLIENT...
const client = new Client();
client
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setEndpoint('https://cloud.appwrite.io/v1');

// INITIAL APPWRITE ACCOUNT...
const account = new Account(client);

export { account };
