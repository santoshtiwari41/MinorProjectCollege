import { useRef, useState } from 'react';
import SegmentedControl from '../segmentedControl/Segmented';
import AllNotification from './AllNotification';
import TeacherNotification from './TeacherNotification';
import BatchUtilsNotification from '../../common/BatchUtilsNotification';
import { useNavigate } from 'react-router-dom';

function NotificationSegmentedControl() {
  const navigate = useNavigate();
  const handleBatchClick = (batchId: number) => {
    navigate(`/students/${batchId}`);
  };

  const [selectedValue2, setSelectedValue2] = useState('All');
  const renderContent = () => {
    switch (selectedValue2) {
      case 'All':
        return <AllNotification />;
      case 'Computer':
        return (
          <BatchUtilsNotification onSelectBatch={handleBatchClick} dID={1} />
        );

      case 'IT':
        return (
          <BatchUtilsNotification onSelectBatch={handleBatchClick} dID={2} />
        );

      case 'Software':
        return (
          <BatchUtilsNotification onSelectBatch={handleBatchClick} dID={3} />
        );

      case 'Civil':
        return (
          <BatchUtilsNotification onSelectBatch={handleBatchClick} dID={4} />
        );
      case 'Teacher':
        return <TeacherNotification />;
      default:
        return null;
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <SegmentedControl
        name="group-2"
        callback={(val) => setSelectedValue2(val)}
        controlRef={useRef()}
        defaultIndex={0}
        segments={[
          {
            label: 'All',
            value: 'All',
            ref: useRef(),
          },
          {
            label: 'Computer',
            value: 'Computer',
            ref: useRef(),
          },
          {
            label: 'IT',
            value: 'IT',
            ref: useRef(),
          },
          {
            label: 'Software',
            value: 'Software',
            ref: useRef(),
          },
          {
            label: 'Civil',
            value: 'Civil',
            ref: useRef(),
          },
          {
            label: 'Teacher',
            value: 'Teacher',
            ref: useRef(),
          },
        ]}
      />

      <div className="content-container">{renderContent()}</div>
    </div>
  );
}

export default NotificationSegmentedControl;
