// NODE MODULES...
import { createContext, useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS...
import Snackbar from '../components/Snackbar';

const initialCtxValue = {
  snackbar: {
    open: false,
    message: '',
    type: 'info',
  },
  showSnackbar: (message, type = 'info', timeOut = 5000) => {},
  hideSnackbar: () => {},
};

export const SnackbarContext = createContext(initialCtxValue);

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
  });

  const timeoutRef = useRef();

  // SHOW SNACKBAR...
  const showSnackbar = useCallback(({ message, type = '', timeOut = 5000 }) => {
    // CLEAR ANY EXISTING TIMEOUT TO PREVENT OVERLAP...
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    //SET THE NEW SNACKBAR MESSAGE AND TYPE...
    setSnackbar({ open: true, message, type });

    // AUTO HIDE SNACKBAR AFTER TIME OUT...
    timeoutRef.current = setTimeout(() => {
      setSnackbar((prev) => {
        return { ...prev, open: false };
      });
    }, timeOut);
  }, []);

  //HIDE SNACKBAR MANUALLY (IF NEEDED)...
  const hideSnackbar = useCallback(() => {
    //CLEAR ANY EXISTING TIMEOUT TO PREVENT OVERLAP...
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSnackbar({ open: false, message: '', type: 'info' });
  }, []);

  // MEMOIZE THE CONTEXT VALUE TO PREVENT UNNECESSARY RE-RENDERS..
  const contextValue = useMemo(() => {
    return { showSnackbar, hideSnackbar };
  }, [showSnackbar, hideSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar snackbar={snackbar} />
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.any,
};

export default SnackbarProvider;
