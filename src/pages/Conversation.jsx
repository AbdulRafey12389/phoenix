// NODE MODULES...
import { motion } from 'framer-motion';
import { useLoaderData, useLocation } from 'react-router-dom';

// CUSTOM HOOKS...
import { usePromptPreLoader } from '../hooks/userPromptPreloader';

// COMPONENTS...
import PageTitle from '../components/PageTitle';
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreLoader from '../components/PromptPreLoader';

const Conversation = () => {
  const {
    conversation: { title, chats },
  } = useLoaderData() || {};

  const { promptPreLoaderValue } = usePromptPreLoader();

  // OBTAIN THE CURRENT URL LOCATION INFORMATION USING THE USELOCATION HOOK...
  const location = useLocation();

  return (
    <>
      {/* META TITLE */}
      <PageTitle title={`${title} | Phoenix`} />

      <motion.div
        className='max-w-[700px] mx-auto !will-change-auto'
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats?.map((chat) => (
          <div key={chat.$id}>
            {/* USER PROMPT */}
            <UserPrompt text={chat.user_prompt} />
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>

      {promptPreLoaderValue && (
        <PromptPreLoader promptValue={promptPreLoaderValue} />
      )}
    </>
  );
};

export default Conversation;
