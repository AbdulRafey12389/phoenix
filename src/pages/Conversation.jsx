// NODE MODULES...
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';

// COMPONENTS...
import PageTitle from '../components/PageTitle';
import UserPrompt from '../components/UserPrompt';

const Conversation = () => {
  const {
    conversation: { title, chats },
  } = useLoaderData() || {};

  console.log(chats);

  return (
    <>
      {/* META TITLE */}
      <PageTitle title={`${title} | Phoenix`} />

      <motion.div className=''>
        {chats.map((chat) => (
          <div key={chat.$id}>
            {/* USER PROMPT */}
            <UserPrompt text={chat.user_prompt} />
            <p>{chat.ai_response}</p>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default Conversation;
