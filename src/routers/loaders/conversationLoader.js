// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account, databases } from '../../lib/appwrite';

const conversationLoader = async ({ params }) => {
  const { conversationId } = params;
  const data = {};

  try {
    data.user = await account.get();
  } catch (error) {
    console.log(`Error to getting user account: ${error.message}`);
    redirect('/login');
  }

  try {
    data.conversation = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    );
  } catch (error) {
    console.log(`Error getting conversation: ${error.message}`);
    throw error;
  }

  return data;
};

export default conversationLoader;
