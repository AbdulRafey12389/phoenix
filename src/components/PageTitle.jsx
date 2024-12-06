// NODE MODULS...
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

PageTitle.propsTypes = {
    title: PropTypes.string,
    
}

export default PageTitle;
