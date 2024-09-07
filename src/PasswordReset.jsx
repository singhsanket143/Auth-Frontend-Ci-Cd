import { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    try {
      await Parse.User.requestPasswordReset(email);
      setMessage('Password reset email sent!');
      setError('');
    } catch (e) {
      setError(e.message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-radial from-primary via-secondary to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700">Reset Password</h2>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button 
          onClick={handlePasswordReset} 
          className="w-full p-3 mt-4 text-white bg-primary rounded-md hover:bg-secondary transition-all duration-300"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
