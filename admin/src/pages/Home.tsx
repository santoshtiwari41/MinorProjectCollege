import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import carousel1 from '../images/carousel1.jpeg';
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import carousel4 from '../images/carousel4.jpeg';

function Home() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Admin</h1>
            <p className="text-gray-600">Here’s an overview of what’s happening today.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Students", count: 500, image: carousel1 },
              { title: "Teachers", count: 50, image: carousel3 },
              { title: "Classes", count: 20, image: carousel2 },
              { title: "Courses", count: 35, image: carousel4 }
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                <img src={card.image} alt={card.title} className="w-full h-32 object-cover" />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
                  <p className="text-lg text-gray-600 font-bold">{card.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 font-bold">
                  <th className="py-3 px-4">Activity</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                  <td className="py-3 px-4">New student enrollment</td>
                  <td className="py-3 px-4">2024-07-25</td>
                  <td className="py-3 px-4">Completed</td>
                </tr>
                <tr className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                  <td className="py-3 px-4">Teacher evaluation</td>
                  <td className="py-3 px-4">2024-07-24</td>
                  <td className="py-3 px-4">Pending</td>
                </tr>
                <tr className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                  <td className="py-3 px-4">Class schedule update</td>
                  <td className="py-3 px-4">2024-07-23</td>
                  <td className="py-3 px-4">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* New Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              <ul>
                <li className="mb-2">
                  <span className="font-bold">Open House:</span> 2024-08-05
                </li>
                <li className="mb-2">
                  <span className="font-bold">Parent-Teacher Conferences:</span> 2024-08-15
                </li>
                <li className="mb-2">
                  <span className="font-bold">Winter Term Starts:</span> 2024-09-01
                </li>
              </ul>
            </div>

            {/* Announcements */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Announcements</h2>
              <ul>
                <li className="mb-2">
                  <span className="text-blue-500 font-bold">Notice:</span> New library hours starting 2024-08-01
                </li>
                <li className="mb-2">
                  <span className="text-green-500 font-bold">Update:</span> Cafeteria menu updated for August
                </li>
                <li className="mb-2">
                  <span className="text-red-500 font-bold">Alert:</span> Safety drill scheduled for 2024-07-30
                </li>
              </ul>
            </div>
          </div>

         
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
