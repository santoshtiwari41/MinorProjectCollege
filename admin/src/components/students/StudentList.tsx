import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useGetAllStudents,  } from '../../services/queries';

import type { Students } from '../../types/students';
import RegisterStudents from './RegisterStudents';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getInitials = (name: string): string => {
  const names = name.split(' ');
  return names
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();
};

const Students: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  // const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  // const [editStudent, ] = useState<Students | null>(null);
  const { batchId } = useParams();

  const [students, setStudents] = useState<Students[]>([]);

  const { data } = useGetAllStudents(batchId);
  // const { deleteStudent } = useDeleteStudent(batchId);

  useEffect(() => {
    if (data) {
      setStudents(data.students);
      console.log(data.students);
    }
  }, [data]);

  const handleDelete = () => {
    // deleteStudent(studentId).then(() => {
    //   setStudents(students.filter((student) => student.id !== studentId));
    // }
  // );
  console.log('delete')
  };

  const handleEdit = () => {
    // setEditStudent(student);
    // setIsEditPopupOpen(true);
    console.log('edit')

  };

  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`students/${batchId}`}/>
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="flex justify-between items-center px-7.5 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
            style={{ cursor: 'pointer' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-left"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Students
          </h4>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>

        <div>
          {students.map((data, key) => {
            const color = generateRandomColor();
            return (
              <div
                className="flex items-center justify-between gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
                key={key}
              >
                <Link to="/" className="flex items-center gap-5">
                  <div className="relative h-14 w-14 rounded-full">
                    {data.avatar ? (
                      <img src={data.avatar} alt="User" />
                    ) : (
                      <div
                        className="flex items-center justify-center h-full w-full rounded-full"
                        style={{ backgroundColor: color }}
                      >
                        <span className="text-white text-lg font-semibold">
                          {getInitials(data.name)}
                        </span>
                      </div>
                    )}
                    <span
                      className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                    ></span>
                  </div>

                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {data.name}
                      </h5>
                      <p>
                        <span className="text-sm text-black dark:text-white">
                          {"@" + data.name.toLowerCase().replace(/\s/g, "") + data.crn}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex gap-10">
                  <div>
                  <button
                    onClick={() => handleEdit()}
                    className="text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4h7a2 2 0 0 1 2 2v7"></path>
                      <path d="M14 2L4 14 2 22l8-2 10-10-6-6z"></path>
                    </svg>
                  </button>
                  <h5 className="text-sm text-black dark:text-white">
                       Edit
                      </h5>
                  </div>
                 <div><button
                    onClick={() => handleDelete()}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-2 14H7L5 6"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>
                  </button>
                  <h5 className="text-sm text-black dark:text-white">
                       Delete
                      </h5>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
        <RegisterStudents isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} batchId={batchId} />
        {/* {editStudent && (
          <EditStudent
            isOpen={isEditPopupOpen}
            onClose={() => setIsEditPopupOpen(false)}
            student={editStudent}
            batchId={batchId}
          />
        )} */}
      </div>
    </DefaultLayout>
  );
};

export default Students;
