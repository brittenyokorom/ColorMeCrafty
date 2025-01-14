import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'x-access-token': token
          }
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to your profile, {user.username}!</p>
    </div>
  );
}

export default Profile;