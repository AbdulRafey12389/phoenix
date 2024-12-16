// NODE MODULES...
import { AnimatePresence } from 'framer-motion';

// CUSTOM MODULES...
import logout from '../utils/logout';

// CUSTOM HOOKS...
import { useToggle } from '../hooks/useToggle';

// COMPONENTS...
import {
  Link,
  useNavigate,
  useNavigation,
  useLoaderData,
} from 'react-router-dom';
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';

// ASSETS...
import { logoLight, logoDark } from '../assets/asset';

function TopAppBar() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const { user } = useLoaderData();

  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
        />

        <Link
          to='/'
          className='min-w-max max-w-max h-[24px] lg:hidden'
        >
          <img
            src={logoLight}
            width={133}
            height={24}
            alt='phoenix logo'
            className='dark:hidden'
          />

          <img
            src={logoDark}
            width={133}
            height={24}
            alt='phoenix logo'
            className='hidden dark:block'
          />
        </Link>
      </div>

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

      <AnimatePresence>{isNormalLoad && <LinearProgress />}</AnimatePresence>
    </header>
  );
}

export default TopAppBar;
