import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        // Decode the token to get the username
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        const response = await fetch(`http://localhost:5000/api/user/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <h2>Palettes</h2>
      <ul>
        {user.palettes.map((palette, index) => (
          <li key={index}>
            <h3>{palette.title}</h3>
            <ul>
              {palette.colors.map((color, colorIndex) => (
                <li key={colorIndex} style={{ backgroundColor: color }}>
                  {color}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;