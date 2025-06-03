const feedbacks = [
  {
    id: 1,
    name: "Maham",
    feedback: "I recommended and will recommend this website to everyone in thier Final Year ! ",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: 2,
    name: "Haseeb",
    feedback: "It was super easy and smooth to browse through the supervisor I wanted.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const StudentFeedback = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-purple-700 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">What Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {feedbacks.map(({ id, name, feedback, image }) => (
          <div
            key={id}
            className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-4 border-red-500 mb-4"
            />
            <p className="italic text-lg mb-4">"{feedback}"</p>
            <p className="font-bold text-red-600">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentFeedback;
