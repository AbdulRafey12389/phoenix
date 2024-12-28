// NODE MODULES...
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighLighter } from 'react-syntax-highlighter';
import { hopscotch, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect, useCallback } from 'react';

// ASSETS...
import { iconLogo } from '../assets/asset';

// CUSTOM HOOKS...
import { useSnackbar } from '../hooks/useSnackbar';

// COMPONENTS...
import { IconBtn } from './Button';

// CUSTOM MODULES...
import toTitleCase from '../utils/toTitleCase';

const AiResponse = ({ aiResponse, children }) => {
  // INITIALIZE THE CODETHEME STATE TO AN EMPTY STRING , THIS WILL BE  USED TO STORE THE SELECTED CODE THEME...
  const [codeTheme, setcodeTheme] = useState('');

  const { showSnackbar, hideSnackbar } = useSnackbar();

  useEffect(() => {
    // CREATE A MEDIA QUERY TO DETECT THE USER'S PREFERRED COLOR THEME...
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // INITIALLY SET THE CODETHEME BASED ON THE CURRENT MEDIA QUERY RESULT...
    setcodeTheme(mediaQuery.matches ? hopscotch : coy);

    // CREATE AN EVENT LISTENER TO HANDLE  CHANGES IN THE PREFERRED COLOR SCHEME...
    const themeListener = mediaQuery.addEventListener('change', (event) => {
      setcodeTheme(event.matches ? hopscotch : coy);
    });

    return () => mediaQuery.removeEventListener('change', themeListener);
  }, []);

  const handleCopy = useCallback(
    async (text) => {
      hideSnackbar();
      try {
        await navigator.clipboard.writeText(text);
        showSnackbar({
          message: 'Copied to clipboard ',
          timeOut: 2500,
        });
      } catch (error) {
        showSnackbar({ message: error.message });
        console.log('Error to copying text clipboard: ', error.message);
      }
    },
    [showSnackbar, hideSnackbar],
  );

  // THIS FUNCTION EXECUTE FOR EVERY CODE TAG
  const code = ({ children, className, ...rest }) => {
    const match = className?.match(/language-(\w+)/);

    return match ? (
      <>
        <div className='code-block'>
          <div className='p-4 pb-0 font-sans'>{toTitleCase(match[1])}</div>

          <SyntaxHighLighter
            {...rest}
            PreTag='div'
            language={match[1]}
            style={codeTheme}
            customStyle={{
              marginBlock: '0',
              padding: '2px',
            }}
            codeTagProps={{
              style: {
                padding: '14px',
                fontWeight: '600',
              },
            }}
          >
            {children}
          </SyntaxHighLighter>
        </div>

        <div className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-t-extraSmall rounded-b-medium flex justify-between items-center h-11 font-sans text-bodyMedium ps-4 pe-2'>
          <p>
            Use code
            <a
              className='link inline-block ms-2'
              href='https://gemini.google.com/faq#coding'
              target='_blank'
            >
              with caution.
            </a>
          </p>

          <IconBtn
            icon='content_copy'
            size='small'
            title='Copy code'
            onClick={handleCopy.bind(null, children)}
          />
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr)] md:gap-5'>
      <figure className='w-8 h-8 grid place-items-center'>
        <img
          src={iconLogo}
          width={32}
          height={32}
          alt='Phoenix logo'
        />
      </figure>

      {children}

      {aiResponse && (
        <div className='markdown-content'>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{ code }}
          >
            {aiResponse}
          </Markdown>
        </div>
      )}
    </div>
  );
};

AiResponse.propTypes = {
  aiResponse: PropTypes.string,
  children: PropTypes.any,
};

export default AiResponse;
