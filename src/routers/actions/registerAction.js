//NODE MODULES...
import { redirect } from 'react-router-dom';

//CUSTOM MODULES...
import { account } from '../../lib/appwrite';
import generateID from '../../utils/generateID';

// HANDLES USER REGISTRATION...
const registerAction = async ({ request }) => {
  // RETRIEVE THE FORMDATA FROM THE INCOMING REQUEST...
  const formData = await request.formData();

  try {
    // CREATES A NEW USERS ACCOUNT USING THE PROVIDED EMAIL, PASSWORD AND NAME...
    await account.create(
      generateID(),
      formData.get('email'),
      formData.get('password'),
      formData.get('name'),
    );
  } catch (err) {
    return {
      message: err.message,
    };
  }

  // AFTER SUCESSFULLY ACCOUNT CREATE, LOGIN THE USER AND REDIRECT TO HOMEPAGE...
  try {
    // CREATES A SESSION FOR THE NEW USER WITH THE PROVIDED - EMAIL AND PASSWORD...
    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password'),
    );
  } catch (error) {
    console.log(`Error to creating session: ${error.message}`);
    return redirect('/login');
  }

  return redirect('/');
};

export default registerAction;
