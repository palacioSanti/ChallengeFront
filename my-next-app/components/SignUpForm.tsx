'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|lightit\.io)$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-z]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors({
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    });

    let isValid = true;

    if (!validateEmail(email)) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        email: 'Invalid email address. Only @gmail.com, @hotmail.com, and @lightit.io are allowed.',
      }));
    }

    if (!validateUsername(username)) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        username: 'Invalid username. Only lowercase letters are allowed, without spaces and special characters.',
      }));
    }

    if (!validatePassword(password)) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long and include uppercase, lowercase, and special characters.',
      }));
    }

    if (password !== passwordConfirm) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: 'Passwords do not match.',
      }));
    }

    if (isValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(username);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="title text-center mb-8">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-sm">If you already have an account</p>
        <p className="text-sm">
          You can <a className="text-red-500 underline">Login here!</a>
        </p>
      </div>
      {!loading && !success && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="input-wrapper mt-1 relative rounded-md shadow-sm flex items-center bg-white border-b border-gray-300">
              <Image src="/icons/mail.svg" alt="email" width={20} height={20} className="mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.email ? 'text-red-900 placeholder-red-300' : ''
                  }`}
                placeholder="Enter your email address"
                required
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="input-wrapper mt-1 relative rounded-md shadow-sm flex items-center bg-white border-b border-gray-300">
              <Image src="/icons/user.svg" alt="user" width={20} height={20} className="mr-2" />
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.username ? 'text-red-900 placeholder-red-300' : ''
                  }`}
                placeholder="Enter your User name"
                required
              />
            </div>
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="input-wrapper mt-1 relative rounded-md shadow-sm flex items-center bg-white border-b border-gray-300">
              <Image src="/icons/lock.svg" alt="lock" width={20} height={20} className="mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.password ? 'text-red-900 placeholder-red-300' : ''
                  }`}
                placeholder="Enter your password"
                required
              />
              <Image
                src="/icons/eye.svg"
                alt="eye"
                width={20}
                height={20}
                className="eye-image cursor-pointer absolute right-2"
                onClick={() => {
                  const passwordInput = document.getElementById('password') as HTMLInputElement;
                  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                }}
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="input-wrapper mt-1 relative rounded-md shadow-sm flex items-center bg-white border-b border-gray-300">
              <Image src="/icons/lock.svg" alt="lock" width={20} height={20} className="mr-2" />
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.passwordConfirm ? 'text-red-900 placeholder-red-300' : ''
                  }`}
                placeholder="Confirm your password"
                required
              />
              <Image
                src="/icons/eye.svg"
                alt="eye"
                width={20}
                height={20}
                className="eye-image cursor-pointer absolute right-2"
                onClick={() => {
                  const passwordInput = document.getElementById('passwordConfirm') as HTMLInputElement;
                  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                }}
              />
            </div>
            {errors.passwordConfirm && <p className="mt-2 text-sm text-red-600">{errors.passwordConfirm}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {success && (
        <div className="text-center">
          <Image src="/icons/success.svg" alt="Success Image" width={50} height={50} className="mx-auto mb-4" />
          <h1 className="text-2xl font-medium">
            Great! <br /> you are signed in, <br /> {success}
          </h1>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;