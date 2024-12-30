// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account } from '../../lib/appwrite';

// HANDLE THE LOGIN ACTION...
const loginAction = async ({ request }) => {
  // RETRIEVE THE FORM DATA FROM INCOMING REQUEST...
  const formData = await request.formData();

  try {
    // ATTEMPT TO CREATE A SESSTION USING EMAIL AND PASSWORD FROM FORM DATA...
    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password'),
    );

    // ON SUCESSFULLY LOGIN REDIRECT THE USER TO THE HOMEPAGE...
    return redirect('/home');
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export default loginAction;
