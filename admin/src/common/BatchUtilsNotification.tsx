import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface BatchUtilsProps {
 
  onSelectBatch: (batchId: number) => void;
  dID: number;
}

const BatchUtilsNotification: React.FC<BatchUtilsProps> = ({
  
  onSelectBatch,
  dID,
}) => {
  
  const navigate=useNavigate()
  const batches = useSelector((state: RootState) => state.Batch).filter(
    (item) => item.departmentId === dID,
  );
  const handleBatchClick = (batchId: number) => {
    navigate(`/notification/batch/${batchId}`)
  };
 const handleAll=()=>{
  navigate(`/notification/department/${dID}`)
 }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium text-black dark:text-white">Batches</h2>
        <button
         onClick={handleAll}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send all
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <tbody>
            {batches.map((batchItem, index) => (
              <tr
                key={index}
                className="batch-row cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4"
                onClick={() => handleBatchClick(batchItem.id)}
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {batchItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {/* {departmentMap[batchItem.departmentId]} */}
                    Send
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

export default BatchUtilsNotification;
