// NODE MODULES...
import { useState, useCallback } from 'react';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return [isOpen, toggle];
};

export { useToggle };
