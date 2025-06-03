import React from 'react';
import { Link } from 'react-router-dom';

const SupervisorCard = () => {
  const supervisors = [
    {
      image: 'https://i.ibb.co/DfG6G1CY/Screenshot-2025-02-04-234858.png',
      name: 'M. Azeem',
      specialization: 'Machine Learning & Computer Vision',
      department: 'Computer Science',
      university: 'FAST NUCES, Lahore'
    },
    {
      image: 'https://i.ibb.co/fd84SPMF/Screenshot-2025-01-31-001149.png',
      name: 'Mishal Munir',
      specialization: 'Data Security & Cryptography',
      department: 'Information Security',
      university: 'GIKI, Topi'
    },
    {
      image: 'https://i.ibb.co/jvpmbyFH/Screenshot-2025-02-03-175645.png',
      name: 'Usman Javed',
      specialization: 'Embedded Systems & IoT',
      department: 'Electrical Engineering',
      university: 'NUST, Islamabad'
    },
    {
      image: 'https://i.ibb.co/TDq67Nkx/Screenshot-2025-02-17-010735.png',
      name: 'Rabia Ranjha',
      specialization: 'Human-Computer Interaction',
      department: 'Software Engineering',
      university: 'COMSATS, Lahore'
    }
  ];

  return (
    <div className="bg-white py-8 px-4">
      <h1 className="text-3xl font-extrabold text-red-500 mb-6 text-center">
        Supervisor Card
      </h1>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 px-2">
          {supervisors.map((supervisor, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-300 rounded-xl shadow-md overflow-hidden w-72 flex-shrink-0 hover:shadow-[0_0_20px_#f43f5e] transition-transform hover:scale-105 text-gray-900"
            >
              <img
                src={supervisor.image}
                alt={supervisor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{supervisor.name}</h2>
                <p className="text-sm text-gray-700 mt-1 font-medium">
                  {supervisor.specialization}
                </p>
                <div className="text-sm text-gray-600 mt-2 font-semibold">
                  🏛 {supervisor.department}
                </div>
                <div className="text-sm text-gray-600 mt-1 font-medium">
                  📍 {supervisor.university}
                </div>
                <Link
                  to="/supervisors" 
                  className="inline-block mt-3 bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Request Supervision
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupervisorCard;