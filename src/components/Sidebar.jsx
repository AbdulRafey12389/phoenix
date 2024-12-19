// NODE MODULES...
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// COMPONENTS...
import Logo from './Logo';
import { ExtendedFab, IconBtn } from './Button';

const Sidebar = () => {
  return (
    <>
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className=''>
            <Logo />
          </div>
          <ExtendedFab
            href='/'
            text='New chat'
            classes=''
          />

          <div className=''>
            <p className=''>Recent</p>

            <nav>
              <div className=''>
                <NavLink
                  to=''
                  className='nav-link'
                  title=''
                >
                  <span className='material-symbols-rounded icon-small'>
                    chat_bubble
                  </span>

                  <span className='truncate'>New conversation</span>

                  <div className='state-layer'></div>
                </NavLink>

                <IconBtn
                  icon='delete'
                  size='small'
                  classes=''
                  title='Delete'
                />
              </div>
            </nav>
          </div>

          <div className=''>&copy; 2025 AbdulRafey</div>
        </div>
      </div>

      <div className={`overlay`}></div>
    </>
  );
};

export default Sidebar;
