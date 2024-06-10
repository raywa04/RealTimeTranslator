import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../components/Login';
import io from 'socket.io-client';

const Home = () => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const translateText = () => {
    if (socket) {
      socket.emit('translate', { text: input });
      socket.on('translated', (data) => {
        setTranslatedText(data.translation);
      });
    }
  };

  if (!user) return <Login />;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Real-Time Translation</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-4"
        rows="4"
        placeholder="Enter text to translate..."
      />
      <button
        onClick={translateText}
        className="bg-green-500 text-white p-2 rounded"
      >
        Translate
      </button>
      {translatedText && (
        <div className="mt-4">
          <h2 className="text-xl">Translated Text:</h2>
          <p className="border p-2">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
