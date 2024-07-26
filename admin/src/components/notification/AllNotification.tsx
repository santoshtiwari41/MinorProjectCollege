import {useState } from 'react';
import { useNotificationAll } from '../../services/mutation';


function AllNotification() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const allDepartment = useNotificationAll();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (file) {
      try{
        allDepartment.mutate({
          type: 'COLLEGE',
          title,
          body: description,
          scheduledTime: scheduleDate,
          file
        });
        setTitle('');
        setDescription('');
        setScheduleDate('');
        setFile(null);
      }
      catch(error){
        console.error(error);
      }
    
    }
   else{
     console.error('Please select a file');
   }
   
  };

  const handleFileChange = (e) => {
    const reader=new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    
  };

  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <form
        onSubmit={handleSave}
        className=" dark:bg-boxdark p-8 pt-0 mt-0  w-full max-w-2xl relative"
      >
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
              type="datetime-local"
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
            Send 
          </button>
        </div>
      </form>
    </div>
  );
}

export default AllNotification;