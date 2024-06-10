import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signIn}
        className="bg-blue-500 text-white p-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
