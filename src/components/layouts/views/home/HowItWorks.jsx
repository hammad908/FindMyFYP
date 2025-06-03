const steps = [
  {
    id: 1,
    title: "Select Your Interest",
    description: "Select supervisors whose expertise and interests align with your project.",
  },
  {
    id: 2,
    title: "Browse Supervisors",
    description: "Browse our hand-picked selection of expert supervisors across diverse disciplines.",
    
  },
  {
    id: 3,
    title: "Engage & Partner",
    description: "Effortlessly connect and collaborate on your final year project.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
        How It Works
      </h2>

      <div className="relative border-l-4 border-gradient-to-b from-red-600 to-purple-700 pl-6 space-y-12">
        {steps.map(({ id, title, description }) => (
          <div key={id} className="relative">
            {/* Dot indicator */}
            <div className="absolute -left-4 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-purple-700 border-4 border-white shadow-md"></div>

            <div className="bg-gradient-to-br from-red-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-red-700 mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
