import React, { useState } from 'react';
import { useRegisterStudents } from '../../services/mutation';

interface AddStudentsProps {
  isOpen: boolean;
  onClose: () => void;
  batchId: string;
}

const RegisterStudents: React.FC<AddStudentsProps> = ({ isOpen, onClose,batchId }) => {
  
  const registerStudents  = useRegisterStudents();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
 
  const handleRegister = () => {
    registerStudents.mutate(
      {
        name:fullName,
        email,
        phone,
        batchId: batchId as string
      }
    ),
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" mt-13 fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-6">Register Students</h2>
       
<form className="space-y-6" onSubmit={handleRegister} >
<div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={fullName}
                  autoComplete='fullname'
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  autoComplete='phone'
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default RegisterStudents;
