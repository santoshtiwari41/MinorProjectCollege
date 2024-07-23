import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import BatchUtils from "../common/BatchUtils";
import { useNavigate} from "react-router-dom";

function StudentLIst() {
  const navigate=useNavigate()
  const handleBatchClick = (batchId: number) => {
   
    navigate(`/students/${batchId}`);
  };
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Students" />
      <div className="flex flex-col gap-10">
      <BatchUtils onSelectBatch={handleBatchClick} />
      
      </div>
    </DefaultLayout>
    
  )
}

export default StudentLIst