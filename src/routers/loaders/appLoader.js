// NODE MODULES...
import { redirect } from 'react-router-dom';
import { Query } from 'appwrite';

// CUSTOM MODULES...
import { account, databases } from '../../lib/appwrite';

const appLoader = async () => {
  const data = {};

  try {
    // ATTEMPT TO RETRIVE  THE USER'S ACCOUNT INFORMATION...
    data.user = await account.get();
  } catch (error) {
    console.log(`Error to getting user account: ${error.message} `);
    return redirect('/login');
  }

  try {
    data.conversations = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      [
        Query.select(['$id', 'title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', data.user.$id),
      ],
    );
  } catch (error) {
    console.log(`Error getting conversation: ${error.message}`);
  }

  return data;
};

export default appLoader;
