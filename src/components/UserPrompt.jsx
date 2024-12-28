// NODE MODULES...
import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// COMPONENTS...
import Avatar from './Avatar';
import { IconBtn } from './Button';

//CUSTOM MODULES...
import { useToggle } from '../hooks/useToggle';

const UserPrompt = ({ text }) => {
  const { user } = useLoaderData();

  const [isExpand, toggleExpand] = useToggle();

  const textBoxRef = useRef();
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    setHasMoreContent(
      textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight,
    );
  }, [textBoxRef]);

  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5'>
      <Avatar name={user?.name} />

      <p
        className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!isExpand ? 'line-clamp-4' : ''}`}
        ref={textBoxRef}
      >
        {text}
      </p>

      {hasMoreContent && (
        <IconBtn
          icon={isExpand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onClick={toggleExpand}
          title={isExpand ? 'Collapse text' : 'Expand text'}
        />
      )}
    </div>
  );
};

UserPrompt.propTypes = {
  text: PropTypes.string,
};

export default UserPrompt;
