import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome {user.username}!</h1>
        <h2 className="text-xl font-bold mb-4">Your Color Palettes</h2>
        {user.palettes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {user.palettes.map((palette, index) => (
              <div key={index} className="p-4 rounded-lg shadow-lg bg-gray-100">
                <h3 className="text-lg font-bold mb-2">{palette.title}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {palette.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="w-16 h-16 rounded-lg" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no saved palettes.</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;