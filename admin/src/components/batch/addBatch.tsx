import React, { useState } from 'react';
import { useCreateBatch } from '../../services/mutation';
import DefaultLayout from '../../layout/DefaultLayout';

interface AddBatchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBatchPopup: React.FC<AddBatchPopupProps> = ({ isOpen, onClose }) => {
  const createBatch  = useCreateBatch();
  const [batchName, setBatchName] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  
  const [departmentId, setDepartmentId] = useState<string>('');

  const handleSave = () => {
    createBatch.mutate(
      {
      name:batchName,
      startYear: parseInt(startYear, 10),
      endYear: parseInt(startYear, 10)+4,
      departmentId: parseInt(departmentId, 10),
      }
      
    ),
    setBatchName('');
    setDepartmentId('')
    setStartYear('')
    onClose();
  };

  if (!isOpen) return null;

  return (
    <DefaultLayout>
       <div className="fixed mt-13 inset-0 overflow-y-auto flex items-center justify-center z-100 dark:bg-boxdark">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
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
        <h2 className="text-2xl font-semibold mb-6">Add Batch</h2>
        <form onSubmit={handleSave} className="space-y-6">
          
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Batch Name
              </label>
              <div className="mt-2">
                <input
                  id="batchName"
                  name="batchName"
                  type="text"
                  value={batchName}
                  required
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>
          
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Start Year
              </label>
              <div className="mt-2">
                <input
                  id="startYear"
                  name="startYear"
                  type="text"
                  value={startYear}
                  
                  required
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Department ID
              </label>
              <div className="mt-2">
                <input
                  id="departmentId"
                  name="departmentId"
                  type="number"
                  value={departmentId}
                 
                  required
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
              </div>
            </div>
          <div className="flex justify-end">
            <button
              type="submit"
              
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
              Add 
            </button>
            
          </div>
        </form>
      </div>
    </div>
    </DefaultLayout>
   
  );
};

export default AddBatchPopup;
