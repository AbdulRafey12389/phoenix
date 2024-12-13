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

function ResetLink() {
  //  GET ERROR DATA FROM FORM SUBMITTION USING USEACTIONDATA (LIKELY FROM ROUTER-DOM)...
  const actionData = useActionData();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // SHOW SNACKBAR WITH THE PROVIDED ERROR MESSAGE...
    if (actionData) {
      showSnackbar({
        message: actionData?.message,
        type: actionData.ok ? 'info' : 'error',
        timeOut: 8000,
      });
    }
  }, [actionData, showSnackbar]);

  const navigation = useNavigation();

  return (
    <>
      <PageTitle title='Reset password' />

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
              Forgot your password?
            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2 '>
              Enter your email and we&apos;ll send a password reset link.
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
                helperText='The verification link sent to your email address will be valid for 1 hour.'
                required={true}
                autoFocus={true}
              />

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Get link'
                )}
              </Button>
            </Form>
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

export default ResetLink;
