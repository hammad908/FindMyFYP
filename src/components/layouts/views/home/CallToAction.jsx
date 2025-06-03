import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative bg-white overflow-hidden py-16 px-8 my-16 max-w-6xl mx-auto rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-red-500 to-purple-700 rounded-full blur-3xl opacity-30 z-0"></div>

      {/* Left Visual (SVG or Gradient Circle) */}
      <div className="z-10 flex-1 flex justify-center">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-purple-700 shadow-lg flex items-center justify-center text-white text-4xl font-extrabold">
          🎓
        </div>
      </div>

      {/* Right Text */}
      <div className="z-10 flex-1 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Start Your Supervisor Search Today!
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
          Join thousands of students who've already found their ideal FYP supervisor
        </p>
        <Link
          to="/signup"
          className="inline-block bg-gradient-to-r from-red-600 to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:opacity-90 transition"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;