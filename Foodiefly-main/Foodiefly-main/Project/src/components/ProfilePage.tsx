import React from 'react';

interface ProfilePageProps {
  user: any;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack }) => {
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">No user logged in</h2>
        <button onClick={onBack} className="text-orange-600 hover:underline">&larr; Back</button>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
      <button onClick={onBack} className="mb-4 text-orange-600 hover:underline">&larr; Back</button>
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <div className="text-lg mb-2"><strong>Email:</strong> {user.email}</div>
      {/* Add more user info here if available */}
    </div>
  );
};

export default ProfilePage; 