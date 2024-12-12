// NODE MODULES...
import { createContext, useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

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
  // MEMOIZE THE CONTEXT VALUE TO PREVENT UNNECESSARY RE-RENDERS..
  const contextValue = useMemo(() => {
    return { showSnackbar, hideSnackbar };
  }, [showSnackbar, hideSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.any,
};

export default SnackbarProvider;
