// NODE MODULES...
import {
  useNavigate,
  useNavigation,
  useLoaderData,
  useParams,
  useSubmit,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// CUSTOM MODULES...
import logout from '../utils/logout';
import deleteConversation from '../utils/deleteConversation';

// CUSTOM HOOKS...
import { useToggle } from '../hooks/useToggle';

// COMPONENTS...
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import Logo from './Logo';

function TopAppBar({ toggleSidebar }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const { conversations, user } = useLoaderData();

  const param = useParams();

  const submit = useSubmit();

  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />
        <Logo classes='lg:hidden' />
      </div>

      {param.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-2 lg:hidden'
          onClick={() => {
            const { title } = conversations.documents.find(
              ({ $id }) => param.conversationId === $id,
            );

            deleteConversation({ id: param.conversationId, title, submit });
          }}
        />
      )}

      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>

        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>

      <AnimatePresence>
        {isNormalLoad && (
          <LinearProgress classes='absolute top-full left-0 right-0 z-10' />
        )}
      </AnimatePresence>
    </header>
  );
}

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default TopAppBar;
