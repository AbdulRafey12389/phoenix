//CUSTOM MODULES...
import { account } from '../../lib/appwrite';
import generateID from '../../utils/generateID';

// HANDLES USER REGISTRATION...
const registerAction = async ({ request }) => {
  // RETRIEVE THE FORMDATA FROM THE INCOMING REQUEST...
  const formData = await request.formData();

  try {
    // CREATES A NEW USERS ACCOUNT USING THE PROVIDED EMAIL, PASSWORD AND NAME...
    account.create(
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

  return null;
};

export default registerAction;
