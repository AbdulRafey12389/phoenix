// NODE MODULES...
import PropTypes from 'prop-types';

//COMPONENTS...
import UserPrompt from './UserPrompt';
import AiResponse from './AiResponse';
import Skeleton from './Skeleton';

const PromptPreLoader = ({ promptValue }) => {
  return (
    <div className='max-w-[700px] mx-auto '>
      <UserPrompt text={promptValue} />

      <AiResponse>
        <Skeleton />
      </AiResponse>
    </div>
  );
};

PromptPreLoader.propTypes = {
  promptValue: PropTypes.string,
};

export default PromptPreLoader;
