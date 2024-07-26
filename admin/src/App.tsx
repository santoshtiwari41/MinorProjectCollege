import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';

import StudentL from './pages/Students';
import Teacher from './pages/Teacher';
import Batch from './pages/Batch';
import Students from './components/students/StudentList';
import Notification from './pages/Notification';
import { useGetBatch } from './services/queries';
import { setBatches } from './redux/batchSlice';
import DepartmentNotification from './components/notification/DepartmentNotification';
import BatchNotification from './components/notification/BatchNotification';
import Home from './pages/Home';
import Event from './components/calendar/Event';

function App() {
  const dispatch = useDispatch();
  const { data: batchData, isLoading } = useGetBatch();
  
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();


  useEffect(() => {
    if (batchData) {
      
      dispatch(setBatches(batchData.data));
    }
  }, [batchData]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

if(isLoading){
  return <Loader />;
}
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Hamro College" />
              <Home />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
        <Route
          path="/calendar/event"
          element={
            <>
              <PageTitle title="Calendar | Event " />
             <Event />
            </>
          }
        />
        <Route
          path="/students/:batchId"
          element={
            <>
              <PageTitle title="Students | Batch" />
              <Students />
            </>
          }
        />
        <Route
          path="/teachers/:batchId"
          element={
            <>
              <PageTitle title="Teacher |Batch" />
              <Students />
            </>
          }
        />
      
      <Route
          path="/students"
          element={
            <>
              <PageTitle title="Students" />
              <StudentL />
            </>
          }
        />
         <Route
          path="/teachers"
          element={
            <>
              <PageTitle title="Teacher" />
             <Teacher />
            </>
          }
        />
        <Route
          path="/batchs"
          element={
            <>
              <PageTitle title="Batch" />
            <Batch />
            </>
          }
        />
         <Route
          path="/notification"
          element={
            <>
              <PageTitle title="Notification" />
            <Notification />
            </>
          }
        />
        <Route
          path="/notification/department/:departId"
          element={
            <>
              <PageTitle title="Notification | Department" />
            <DepartmentNotification />
            </>
          }
        />
         <Route
          path="/notification/batch/:batchId"
          element={
            <>
              <PageTitle title="Notification | Batch" />
            <BatchNotification />
            </>
          }
        />
        
      </Routes>
    </>
  );
}

export default App;
