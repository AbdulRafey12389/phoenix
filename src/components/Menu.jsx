// NODE MODULES...
import PropTypes from 'prop-types';

function Menu({ classes = '', children }) {
  return <div className={`menu ${classes}`}>{children}</div>;
}

Menu.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.any,
};

export default Menu;
