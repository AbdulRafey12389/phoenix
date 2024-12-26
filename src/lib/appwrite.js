// NODE MODULES...
import { Client, Account, Avatars, Databases } from 'appwrite';

// INITIAL APPWRITE CLIENT...
const client = new Client();
client
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setEndpoint('https://cloud.appwrite.io/v1');

// INITIAL APPWRITE ACCOUNT...
const account = new Account(client);

// INITIAL APPWRITE AVATARS...
const avatars = new Avatars(client);

// INITIAL APPWRITE DATABASES...
const databases = new Databases(client);

export { account, avatars, databases };
