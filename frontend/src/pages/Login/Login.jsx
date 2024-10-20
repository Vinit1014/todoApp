import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';
import { validateLogin } from '../../utils/helper';  // Import validation function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: null, password: null });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form input
    const { success, errors } = validateLogin({ email, password });
    
    if (!success) {
      // Set specific errors for each field
      const fieldErrors = { email: null, password: null };
      errors.forEach((err) => {
        if (err.includes('Email')) {
          fieldErrors.email = err;
        }
        if (err.includes('Password')) {
          fieldErrors.password = err;
        }
      });
      setError(fieldErrors);
      return;
    }

    // Proceed with login logic here
    console.log('Form is valid. Proceed with login.');
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              className={`input-box ${error.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error.password ? 'border-red-500' : ''}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-center mt-4">
              Not registered yet?{' '}
              <Link to="/signUp" className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
