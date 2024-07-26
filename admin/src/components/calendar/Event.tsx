import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { useCreateEvent } from '../../services/mutation';

function Event() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [holiday, setHoliday] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const createEvent = useCreateEvent();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
     
    createEvent.mutate({
      title: title,
      startTime: scheduleDate,
      endTime: endDate,
      description: description,
      holiday: holiday
    });
        
    setTitle('');
    setDescription('');
    setScheduleDate('');
    setEndDate('');
    setHoliday(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <DefaultLayout>
      <div className=" mt-1 ml-10fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 dark:border-strokedark dark:bg-boxdark">
      <form
          onSubmit={handleSave}
          className="dark:border-strokedark dark:bg-boxdark bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative"
        >
          <button
            onClick={handleCancel}
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

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Add Events
          </h2>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="scheduleDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Start Date
              </label>
              <input
                id="scheduleDate"
                name="scheduleDate"
                type="text"
                value={scheduleDate}
                required
                onChange={(e) => setScheduleDate(e.target.value)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="text"
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="holiday"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Holiday
              </label>
              <input
                id="holiday"
                name="holiday"
                type="checkbox"
                checked={holiday}
                onChange={(e) => setHoliday(e.target.checked)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Write notification ..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default Event;
