// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account } from '../../lib/appwrite';

const appLoader = async () => {
  const data = {};

  try {
    // ATTEMPT TO RETRIVE  THE USER'S ACCOUNT INFORMATION...
    data.user = await account.get();
  } catch (error) {
    console.log(`Error to getting user account: ${error.message} `);
    return redirect('/login');
  }

  return data;
};

export default appLoader;
