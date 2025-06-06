// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account } from '../../lib/appwrite';

const loginLoader = async () => {
  try {
    // ATTEMPT TO RETRIEVE THE USER'S ACCOUNT INFORMATION...
    await account.get();
  } catch (error) {
    console.log('Error to getting user sesstion: ', error.message);
    return null;
  }

  return redirect('/');
};

export default loginLoader;
