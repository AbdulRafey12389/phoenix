// NODE MODULES...
import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useSubmit, useNavigation, useParams } from 'react-router-dom';

// COMPONENTS...
import { IconBtn } from './Button';

const PromtField = () => {
  const inputField = useRef();
  const inputFieldContainer = useRef();

  // STATE FOR INPUTFIELD...
  const [placeholderShown, setPlaceholderShown] = useState(true);
  const [isMultiline, setIsMultiline] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // MANUAL FORM SUBMISSION...
  const submit = useSubmit();

  // INITIAL NAVIGATION FOR CHCKING STATE...
  const navigation = useNavigation();

  // RETRIEVE THE CONVERSATIONID FROM URL PATH...
  const { conversationId } = useParams();

  const handleInputChange = useCallback(() => {
    if (inputField.current.innerText === '\n')
      inputField.current.innerHTML = '';
    setPlaceholderShown(!inputField.current.innerText);
    setIsMultiline(inputFieldContainer.current.clientHeight > 72);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  // MOVE CURSOR TO THE END AFTER PASTE INPUT FIELD...
  const moveCursorToEnd = useCallback(() => {
    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    // SET THE RANGE TO THE LAST CHILD OF THE EDITABLE ELEMENT...
    range.selectNodeContents(editableElem);
    range.collapse(false); // COLLAPS THE RANGE TO THE END...

    // CLEAR EXISTING SELECTIONS AND ADD THE NEW RANGE...
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  // HANDLE PASTE TEXT...
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChange();
      moveCursorToEnd();
    },
    [handleInputChange, moveCursorToEnd],
  );

  // HANDLE SUBMIT...
  const handleSubmit = useCallback(() => {
    // PREVENT SUBMISSION IF THE INPUT IS EMPTY OR FORM SUBMISSION ONGOING...
    if (!inputValue || navigation.state === 'submitting') return;

    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt',
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `/home/${conversationId || ''}`,
      },
    );

    inputField.current.innerHTML = '';
    handleInputChange();
  }, [handleInputChange, inputValue, navigation.state, submit, conversationId]);

  const promptFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { when: 'beforeChildren' },
      staggerChildren: 0.2,
      duration: 0.4,
      delay: 0.4,
      ease: [0.05, 0.7, 0.1, 1],
    },
  };

  const promptFieldChildrenVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''}`}
      variants={promptFieldVariant}
      initial='hidden'
      animate='visible'
      ref={inputFieldContainer}
    >
      <motion.div
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable={true}
        role='textbox'
        aria-multiline={true}
        aria-label='enter a prompt here'
        data-placeholder='Enter your prompt here'
        variants={promptFieldChildrenVariant}
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          // HANDLE CASE WHERE USER PRESS ONLY 'ENTER' KEY
          if (e.key === 'Enter' && !e.shiftKey) {
            // SUBMIT INPUT...
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <IconBtn
        icon='send'
        title='Submit'
        size='large'
        classes='ms-auto '
        variants={promptFieldChildrenVariant}
        onClick={handleSubmit}
      />

      <div className='state-layer'></div>
    </motion.div>
  );
};

export default PromtField;
