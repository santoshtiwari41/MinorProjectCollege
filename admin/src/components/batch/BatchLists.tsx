import React, {useState } from 'react';
import AddBatchPopup from './addBatch';
import {useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const departmentMap: { [key: number]: string } = {
  1: 'Computer',
  2: 'IT',
  3: 'Software',
  4: 'Civil',
};
const BatchComponent: React.FC = () => {
  const batches = useSelector((state: RootState) => state.Batch);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const handleBatch=(batchId:number)=>{
  console.log('batch', batchId)
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium text-black dark:text-white">Batches</h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Batch
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Start Year
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Department
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batchItem, index) => (
              <tr
                key={index}
                className="batch-row cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4"
                onClick={() => handleBatch(batchItem.id)}
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{batchItem.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{batchItem.startYear}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{departmentMap[batchItem.departmentId]}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.5625C4.3125 0.5625 0.5625 4.3125 0.5625 9C0.5625 13.6875 4.3125 17.4375 9 17.4375C13.6875 17.4375 17.4375 13.6875 17.4375 9C17.4375 4.3125 13.6875 0.5625 9 0.5625ZM12.0156 12.4219L10.5938 12.2344L9.75 11.5312V8.25L12.5625 5.4375C12.6562 5.34375 12.75 5.34375 12.8438 5.4375C12.9375 5.53125 12.9375 5.625 12.8438 5.71875L10.2188 8.34375V11.3438L11.25 12.0469L11.8594 12.1406C11.9531 12.1406 12.0469 12.2344 12.0156 12.4219ZM9 16.3125C5.0625 16.3125 1.6875 12.9375 1.6875 9C1.6875 7.3125 2.25 5.8125 3.1875 4.59375C3.28125 4.59375 3.375 4.6875 3.28125 4.78125L3.09375 5.0625C3 5.15625 3 5.34375 3.09375 5.4375L4.125 6.46875C4.3125 6.65625 4.59375 6.5625 4.6875 6.375C5.53125 5.0625 7.17188 4.3125 8.90625 4.59375C10.4062 4.875 11.625 6.09375 11.9062 7.59375C12.1875 9.1875 11.4375 10.875 10.125 11.7188C9.9375 11.8125 9.84375 12.0938 10.0312 12.2812L11.1562 13.4062C11.3438 13.5938 11.7188 13.5938 11.9062 13.4062C12.375 13.875 11.8125 14.625 11.0625 14.625C10.6875 14.625 10.3125 14.4375 9.9375 14.25C9.84375 14.1562 9.75 14.0625 9.75 13.875V12.4219L9.375 11.8125C9.1875 11.7188 8.8125 11.8125 8.625 12L6.9375 13.125C6.75 13.3125 6.9375 13.6875 7.125 13.875C7.3125 14.0625 7.875 14.0625 8.25 13.875C9.46875 13.3125 10.875 13.0312 12.1875 13.4062C13.5 13.6875 14.4375 14.7188 14.9062 15.9375C15.375 17.1562 15.0938 18.375 13.875 18.8438C12.6562 19.3125 11.4375 18.875 10.9688 17.6562C10.5938 16.6875 10.875 15.4688 11.4375 14.5312C11.625 14.1562 11.1562 14.0625 10.9688 14.5312C10.5938 15.4688 9.75 16.3125 8.8125 16.5938C7.875 16.9688 6.9375 16.5938 6.375 15.6562C5.8125 14.7188 6.1875 13.6875 7.125 13.125C7.5 12.9375 7.875 13.125 7.6875 13.5C7.5 13.875 6.9375 14.625 6.1875 14.625C5.4375 14.625 5.0625 13.875 5.53125 13.4062C5.90625 12.9375 6.5625 12"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddBatchPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default BatchComponent;
