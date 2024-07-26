import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import AddBatchPopup from '../components/calendar/AddCalendar';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse, getDay } from 'date-fns';

const AddCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="flex justify-between items-center py-4 px-6 bg-gray-100 rounded-t-md">
        <button onClick={prevMonth} className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-md">
          Prev
        </button>
        <span className="text-lg font-semibold">{format(currentMonth, dateFormat)}</span>
        <button onClick={nextMonth} className="px-4 py-2 ml-2 bg-gray-300 hover:bg-gray-400 rounded-md">
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'E';
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="w-full text-center py-2 font-medium text-gray-600" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 bg-gray-100 px-6">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`w-full h-24 flex items-center justify-center cursor-pointer rounded-md ${!isSameMonth(day, monthStart) ? 'text-gray-400' : isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-100'} ${getDay(day) === 6 ? 'text-red-500' : ''}`}
            key={day}
            onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="text-lg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2 px-6 py-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/calendar/event')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        <AddBatchPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </DefaultLayout>
  );
};

export default AddCalendar;
