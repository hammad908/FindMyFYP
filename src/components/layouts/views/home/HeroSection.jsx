import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden py-24 px-6 md:px-12">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600 to-purple-700 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Match with Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-700">Perfect</span><br />
            FYP Supervisor
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Partner with experienced supervisors who understand your project vision to ensure a successful final year.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-gradient-to-r from-red-600 to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Right Visual / Placeholder */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="w-72 h-72 bg-gradient-to-br from-purple-700 to-red-600 rounded-3xl shadow-2xl flex items-center justify-center text-white text-4xl font-bold">
            🎓
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;