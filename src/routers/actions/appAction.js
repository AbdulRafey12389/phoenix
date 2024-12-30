// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

const userPromptAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');

  // GET CURRENT USER INFO...
  const user = await account.get();

  // GET A CONVERSATION TITLE BASED ON USER PROMPT...
  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation = null;

  try {
    // CREATE A NEW CONVERSATION DOCUMENT IN THE  APPWRITE DATABASE...
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      generateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      },
    );
  } catch (error) {
    console.log('Error creating conversation: ', error.message);
  }

  // GENERATE AI RESPONSE BASED ON THE USER PROMPT...
  const aiResponse = await getAiResponse(userPrompt);

  try {
    // CREATE A NEW CHAT DOCUMENT IN THE 'CHATS' COLLECTION...
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      },
    );
  } catch (error) {
    console.log(`Error creating chat: ${error.message}`);
  }

  return redirect(`/home/${conversation.$id}`);
};

const conversationAction = async (formData) => {
  const conversationId = formData.get('conversation_id');
  const conversationTitle = formData.get('conversation_title');

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    );

    return { conversationTitle };
  } catch (error) {
    console.log(`Error to deleting conversation: ${error.message}`);
  }
};

const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type');

  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }

  if (requestType === 'delete_conversation') {
    return await conversationAction(formData);
  }
};

export default appAction;
