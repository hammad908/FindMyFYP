import { Link } from 'react-router-dom';

const supervisors = [
  {
    id: 1,
    name: "Dr. Fatima",
    department: "Computer Science",
    expertise: "AI, Data Science, Machine Learning",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: 2,
    name: "Prof. Ahmad",
    department: "Psychology",
    expertise: "Clinical Psychology, Forensic psychology",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 3,
    name: "Dr. Ali",
    department: "Physics",
    expertise: "Applied, Astro, Quantum Physics",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const SupervisorHighlights = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
        Top Supervisors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {supervisors.map(({ id, name, department, expertise, image }) => (
          <div
            key={id}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl transition-transform hover:-translate-y-2"
          >
            <div className="relative h-48 bg-gradient-to-br from-red-600 to-purple-700">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
              />
            </div>

            <div className="pt-16 pb-6 px-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              <p className="text-sm text-purple-700 font-medium mt-1">{department}</p>
              <p className="text-gray-600 mt-2">{expertise}</p>
              <Link
                to="/supervisors" 
                className="inline-block mt-4 text-sm text-white bg-gradient-to-r from-red-600 to-purple-700 px-4 py-2 rounded-full shadow hover:opacity-90 transition"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupervisorHighlights;