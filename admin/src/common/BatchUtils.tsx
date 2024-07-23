
import {useSelector } from 'react-redux';
import { RootState } from '../redux/store';
interface BatchUtilsProps {
  onSelectBatch: (batchId: number) => void;
}

const departmentMap: { [key: number]: string } = {
  1: 'Computer',
  2: 'IT',
  3: 'Software',
  4: 'Civil',
};

const BatchUtils: React.FC<BatchUtilsProps> = ({ onSelectBatch }) => {
  const batches = useSelector((state: RootState) => state.Batch);
  
 

  const handleBatchClick = (batchId: number) => {
    onSelectBatch(batchId);
  };

 
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Department
              </th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batchItem, index) => (
              <tr
                key={index}
                className="batch-row cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4"
                onClick={() => handleBatchClick(batchItem.id)}
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{batchItem.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {departmentMap[batchItem.departmentId]}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchUtils;
