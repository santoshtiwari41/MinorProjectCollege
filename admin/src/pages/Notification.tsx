import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import NotificationSegmentedControl from "../components/notification/NotificationSegmentedControl";
import DefaultLayout from "../layout/DefaultLayout";

function Notification() {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Notification"/>
       <NotificationSegmentedControl />
    </DefaultLayout>
    
  )
}

export default Notification