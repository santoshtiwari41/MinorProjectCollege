import React, { useState } from 'react';
import { useCreateBatch } from '../../services/mutation';
import DefaultLayout from '../../layout/DefaultLayout';

interface AddBatchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBatchPopup: React.FC<AddBatchPopupProps> = ({ isOpen, onClose }) => {
  const createBatch = useCreateBatch();
  const [batchName, setBatchName] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [holiday, setHoliday] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    createBatch.mutate({
      name: batchName,
      startYear: parseInt(startYear, 10),
      endYear: parseInt(startYear, 10) + 4,
      departmentId: parseInt(departmentId, 10),
    });
    setBatchName('');
    setDepartmentId('');
    setStartYear('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <DefaultLayout>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
              <label htmlFor="batchName" className="block text-sm font-medium leading-6 text-gray-900">
                Title
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
              <label htmlFor="startYear" className="block text-sm font-medium leading-6 text-gray-900">
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
              <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                End Date
              </label>
              <div className="mt-2">
                <input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={endDate}
                  required
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="holiday" className="block text-sm font-medium leading-6 text-gray-900">
                Holiday
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="holiday"
                  name="holiday"
                  type="checkbox"
                  checked={holiday}
                  onChange={(e) => setHoliday(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
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
