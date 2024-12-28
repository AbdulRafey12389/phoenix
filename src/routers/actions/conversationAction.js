// CUSTOM MODULES...
import { databases } from '../../lib/appwrite';
import { getAiResponse } from '../../api/googleAi';
import generateId from '../../utils/generateID';

const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get('user_prompt');

  let chatHistory = [];
  let aiResponse = '';

  try {
    const { chats } = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    );
    chatHistory = chats.map(({ user_prompt, ai_response }) => {
      return { user_prompt, ai_response };
    });
  } catch (error) {
    console.log(`Error getting chats: ${error.message}`);
  }

  try {
    aiResponse = await getAiResponse(userPrompt, chatHistory);
  } catch (error) {
    console.log(`Error getting gemini response: ${error.message}`);
  }

  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      generateId(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversationId,
      },
    );
  } catch (error) {
    console.log(`Error stroing chats: ${error.message}`);
  }

  return;
};

export default conversationAction;
