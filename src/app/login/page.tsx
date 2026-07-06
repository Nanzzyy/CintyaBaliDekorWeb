import { useState } from 'react';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement login logic here
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type='submit'>Login</button>
    </form>
  );
}