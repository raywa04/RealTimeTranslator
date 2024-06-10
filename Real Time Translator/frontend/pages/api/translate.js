import { io } from 'socket.io-client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { text } = req.body;

  const socket = io('http://localhost:8080');

  socket.emit('translate', { text });

  socket.on('translated', (data) => {
    res.status(200).json({ translation: data.translation });
    socket.disconnect();
  });

  socket.on('error', (err) => {
    res.status(500).json({ error: err.message });
    socket.disconnect();
  });
}
