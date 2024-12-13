// NODE MODULES...
import { redirect } from 'react-router-dom';

// CUSTOM MODULES...
import { account } from '../../lib/appwrite';

const resetPasswordAction = async ({ request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);

  try {
    await account.updateRecovery(
      url.searchParams.get('userId'),
      url.searchParams.get('secret'),
      formData.get('password'),
    );

    return redirect('/login');
  } catch (error) {
    console.log(`Error updating password: ${error.message}`);
    return {
      message: error.message,
    };
  }
};

export default resetPasswordAction;
