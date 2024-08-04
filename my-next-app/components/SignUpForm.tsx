'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email({ message: "Invalid email address. Only @gmail.com, @hotmail.com, and @lightit.io are allowed." })
    .refine((val) => /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|lightit\.io)$/.test(val), {
      message: "Only @gmail.com, @hotmail.com, and @lightit.io are allowed.",
    }),
  username: z.string().regex(/^[a-z]+$/, { message: "Invalid username. Only lowercase letters are allowed." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, { message: "Password must include uppercase, lowercase, and special characters." }),
  passwordConfirm: z.string().min(1, { message: "Please confirm your password." })
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(data.username);
    }, 2000);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="input-wrapper mt-1 relative rounded-md shadow-sm flex items-center bg-white border-b border-gray-300">
              <Image src="/icons/mail.svg" alt="email" width={20} height={20} className="mr-2" />
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.email ? 'text-red-900 placeholder-red-300' : ''}`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{(errors.email as any).message}</p>}
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
                {...register('username')}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.username ? 'text-red-900 placeholder-red-300' : ''}`}
                placeholder="Enter your User name"
              />
            </div>
            {errors.username && <p className="mt-2 text-sm text-red-600">{(errors.username as any).message}</p>}
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
                {...register('password')}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.password ? 'text-red-900 placeholder-red-300' : ''}`}
                placeholder="Enter your password"
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
            {errors.password && <p className="mt-2 text-sm text-red-600">{(errors.password as any).message}</p>}
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
                {...register('passwordConfirm')}
                className={`block w-full border-0 py-1.5 placeholder-gray-300 focus:ring-0 sm:text-sm ${errors.passwordConfirm ? 'text-red-900 placeholder-red-300' : ''}`}
                placeholder="Confirm your password"
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
            {errors.passwordConfirm && <p className="mt-2 text-sm text-red-600">{(errors.passwordConfirm as any).message}</p>}
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