import {useState} from "react";
import axios from "axios";
import './App.css';
const baseUrl = process.env.REACT_APP_BASE_URL;


function MailChimp() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`${baseUrl}/api/subscribe`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error || 'Something went wrong');
        }
    };

  return (
      <div style={{margin: '0 auto', maxWidth: '400px', textAlign: 'center'}}>
        <h1>Subscribe to our newsletter</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{padding: '10px', width: '100%', marginBottom: '10px'}}
              required
          />
          <button type="submit" style={{padding: '10px', width: '100%'}}>
            Subscribe
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
  )
}

function App() {
  return (
      <MailChimp/>
  );
}

export default App;
