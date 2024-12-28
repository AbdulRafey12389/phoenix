// NODE MODULES...
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  Outlet,
  useParams,
  useNavigation,
  useActionData,
} from 'react-router-dom';

// COMPONENTS...
import PageTitle from './components/PageTitle';
import Sidebar from './components/Sidebar';
import TopAppBar from './components/TopAppBar';
import Greetings from './components/Greetings';
import PromtField from './components/PromtField';

// CUSTOM HOOK...
import { useToggle } from './hooks/useToggle';
import { useSnackbar } from './hooks/useSnackbar';
import { usePromptPreLoader } from './hooks/userPromptPreloader';

function App() {
  const navigation = useNavigation();
  const params = useParams();
  const [isSidebarOpen, toggleSidebar] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const { promptPreLoaderValue } = usePromptPreLoader();

  const { showSnackbar } = useSnackbar();

  // GET THE DATA PASSED FROM A FORM ACTION...
  const actionData = useActionData();

  const chatHistoryRef = useRef();

  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (promptPreLoaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, promptPreLoaderValue]);

  // SHOW SNACKBAR AFTER DELETING A CONVERSATION...
  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted '${actionData.conversationTitle} conversation.`,
      });
    }
  }, [actionData, showSnackbar]);

  return (
    <>
      {/* META TITLE */}
      <PageTitle title='Phoenix = chat to supercharge your ideas' />

      <div className='lg:grid lg:grid-cols-[320px,1fr]'>
        {/* SIDEBAR */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
          {/* TOP-APP-BAR */}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* MAIN-CONTENT */}
          <div
            ref={chatHistoryRef}
            className='px-5 pb-5 flex flex-col overflow-y-auto '
          >
            <div className='max-w-[840px] w-full mx-auto grow'>
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet />
              ) : (
                <Greetings />
              )}
            </div>
          </div>

          {/* PROMPT FIELD */}
          <div className='bg-light-background dark:bg-dark-background '>
            <div className='max-w-[870px] px-5 w-full mx-auto'>
              <PromtField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 1 }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3 '
              >
                Phoenix may display inaccurate info, including about people, so
                double-check its responses.
                <a
                  href='https://support.google.com/gemini?p=previcy_notice'
                  target='_blank'
                  className='inline underline ms-1'
                >
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
