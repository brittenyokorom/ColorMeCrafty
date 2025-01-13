import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);

    // Redirect to the profile page
    navigate('/profile');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginClick}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
}

export default Login;