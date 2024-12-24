// CUSTOM MODULES...
import model from '../lib/googleAi';

const getConversationTitle = async (userPrompt) => {
  try {
    const result = model.generateContent(
      `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not mardown.
            
            Prompt: ${userPrompt}`,
    );

    return result.response.text();
  } catch (error) {
    console.log(`Error generating conversation title: ${error.message}`);
  }
};

export { getConversationTitle };
