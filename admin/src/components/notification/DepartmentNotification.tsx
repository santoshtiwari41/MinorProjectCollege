import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationDepartment } from '../../services/mutation';

function DepartmentNotification() {
  const navigate = useNavigate();
  const { departId } = useParams<{ departId: string }>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const notificationDepartment=useNotificationDepartment();
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, description, scheduleDate, file);
    if(file){
      if (typeof departId === 'string') {
        notificationDepartment.mutate({
          type: "DEPARTMENT",
          departmentId: departId,
          title,
          body: description,
          scheduledTime: scheduleDate,
          file,
        });
        
      } else {
        console.warn('Invalid department ID');
      }
    }
    else{
      console.warn('please provide file')
    }
   
    setTitle('');
    setDescription('');
    setScheduleDate('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    const reader=new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <DefaultLayout>
      <div className="dark:border-strokedark dark:bg-boxdark mt-1 ml-10fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
        <form
          onSubmit={handleSave}
          className=" dark:border-strokedark dark:bg-boxdark bg-white  p-8 rounded-lg shadow-lg w-full max-w-2xl relative"
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
            Add Notification
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
                Schedule Date
              </label>
              <input
                id="scheduleDate"
                name="scheduleDate"
                type="date"
                value={scheduleDate}
                required
                onChange={(e) => setScheduleDate(e.target.value)}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Attach File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 file:mr-4 file:rounded file:border-none file:bg-gray-200 dark:file:bg-gray-700 file:py-2 file:px-4 file:text-sm file:text-gray-700 dark:file:text-gray-200"
            />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default DepartmentNotification;
