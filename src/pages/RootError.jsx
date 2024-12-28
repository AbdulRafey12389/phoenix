// NODE MODULES...
import { useRouteError, Link, useNavigation } from 'react-router-dom';
import { LinearProgress } from '../components/Progress';

const RootError = () => {
  const error = useRouteError();
  const navigate = useNavigation();
  return (
    <>
      <div className='h-dvh grid grid-cols-1 justify-items-center content-center '>
        <p className='text-displayMedium font-semibold '>{error.status}</p>

        <p className='text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2 mb-4 '>
          We could&apos;t find the page you&apos;re looking for.
        </p>

        <Link
          className='btn filled primary'
          to='/'
        >
          Back to home
          <div className='state-layer'></div>
        </Link>
      </div>

      {navigate.state === 'loading' && (
        <LinearProgress classes='fixed top-0 left-0 right-0 ' />
      )}
    </>
  );
};

export default RootError;
