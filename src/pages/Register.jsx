import React from 'react';
import { Link, Form } from 'react-router-dom';

//COMPONENTS...
import PageTitle from '../components/PageTitle';

// CUSTOM MODULS...
import { logoLight, logoDark } from '../assets/asset';

function Register() {
  return (
    <>
      <PageTitle title='Create an account' />

      <div className=''>
        <div className=''>
          <Link>
            <img
              src={logoLight}
              width={133}
              height={24}
              className=''
              alt='phonic logo'
            />
            <img
              src={logoDark}
              width={133}
              height={24}
              className=''
              alt='phonic logo'
            />
          </Link>

          <div className=''>
            <h2>Create an account</h2>
            <p>
              Register today and gain access to powerfull tools that will
              supercharge your ideas.
            </p>

            <Form
              method='POST'
              className=''
            ></Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
