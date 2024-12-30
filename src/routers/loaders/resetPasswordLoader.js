// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account } from '../../lib/appwrite';

const resetPasswordLoader = async ({ request }) => {
  const url = new URL(request.url);

  try {
    // ATTEMPT TO RETRIEVE THE USER'S ACCOUNT INFORMATION...
    await account.get();

    return redirect('/');
  } catch (error) {
    console.log('Error to getting user sesstion: ', error.message);
  }

  if (!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
    return redirect('/reset-link');
  }

  return null;
};

export default resetPasswordLoader;
