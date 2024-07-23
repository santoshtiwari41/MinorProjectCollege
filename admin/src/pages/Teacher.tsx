import { useNavigate } from "react-router-dom";
import BatchUtils from "../common/BatchUtils";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "../layout/DefaultLayout";

function Teacher() {
  const navigate=useNavigate()
  const handleBatchClick = (batchId: number) => {
   
    navigate(`/teachers/${batchId}`);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Teacher" />
      <div className="flex flex-col gap-10">
      <BatchUtils onSelectBatch={handleBatchClick} />
      
      </div>
      
    </DefaultLayout>
   
  )
}

export default Teacher