// NODE MODULES...
import { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';

const usePromptPreLoader = () => {
  const navigation = useNavigation();
  const [promptPreLoaderValue, setPromptPreLoaderValue] = useState('');

  useEffect(() => {
    if (navigation.formData) {
      // console.log('preloader: ', navigation.formData.get('user_prompt'));

      setPromptPreLoaderValue(navigation.formData.get('user_prompt'));
    } else {
      setPromptPreLoaderValue('');
    }
  }, [navigation]);

  return { promptPreLoaderValue };
};

export { usePromptPreLoader };
