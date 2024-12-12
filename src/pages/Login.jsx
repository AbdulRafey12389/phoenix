// NODE MODULES...
import React, { useEffect } from 'react';
import { Link, Form, useNavigation, useActionData } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// CUSTOM HOOKS...
import { useSnackbar } from '../hooks/useSnackbar';

//COMPONENTS...
import PageTitle from '../components/PageTitle';
import { CircularProgress, LinearProgress } from '../components/Progress';

// CUSTOM MODULS...
import { logoLight, logoDark, banner } from '../assets/asset';
import TextField from '../components/TextField';
import { Button } from '../components/Button';

function Login() {
  //  GET ERROR DATA FROM FORM SUBMITTION USING USEACTIONDATA (LIKELY FROM ROUTER-DOM)...
  const error = useActionData();

  console.log(error);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // SHOW SNACKBAR WITH THE PROVIDED ERROR MESSAGE...
    if (error?.message) {
      showSnackbar({
        message: error.message,
        type: 'error',
      });
    }
  }, [error, showSnackbar]);

  const navigation = useNavigation();

  return (
    <>
      <PageTitle title='Login' />

      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4 '>
          <Link
            to='/'
            className='max-w-max mb-auto mx-auto lg:max-0'
          >
            <img
              src={logoLight}
              width={133}
              height={24}
              className='dark:hidden'
              alt='phonic logo'
            />
            <img
              src={logoDark}
              width={133}
              height={24}
              className='hidden dark:block'
              alt='phonic logo'
            />
          </Link>

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center '>
              Welcome Back to Phoenix
            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2 '>
              Enter your phoenix account details.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4 '
            >
              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                required={true}
                autoFocus={true}
              />

              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your password'
                required={true}
              />

              <div className='text-right'>
                <Link
                  to='/reset-link'
                  className='link text-labelLarge inline-block'
                >
                  Forget password?
                </Link>
              </div>

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Sign in'
                )}
              </Button>
            </Form>

            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Don&apos;t have an account?{' '}
              <Link
                to='/register'
                className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2025 Abdulrafey. All right reserved.
          </p>
        </div>

        <div className='hidden img-box lg:block lg:relative lg:rounded-large lg:overflow-hidden '>
          <img
            src={banner}
            alt=''
            className='img-cover'
          />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]'>
            Chat with Phoenix to supercharge your ideas.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {navigation.state === 'loading' && (
          <LinearProgress classes='absolute top-0 left-0 right-0' />
        )}
      </AnimatePresence>
    </>
  );
}

export default Login;
