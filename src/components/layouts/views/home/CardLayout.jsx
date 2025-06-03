import React from 'react';

const CardLayout = ({ children }) => {
  return (
    <section className="w-full py-12 px-4 bg-white text-gray-900">
      <h1 className="text-4xl font-extrabold text-red-500 mb-10 text-center tracking-wide uppercase">
        Why Choose Us ?
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {children || (
          <>
            {/* CARD TEMPLATE */}
            {[
              {
                title: 'Expertise & Experience',
                desc: 'Our team comprises industry leaders and specialists.',
                image:
                  'https://www.clockwork.com/wp-content/uploads/2022/07/human-centered-experience-design-1024x1021-1.png'
              },
              {
                title: 'Quality & Reliability',
                desc: 'You can rely on us for consistent, high-performance results.',
                image:
                  'https://stevethedoc.wordpress.com/wp-content/uploads/2020/02/1942483.jpg'
              },
              {
                title: 'Customer Satisfaction',
                desc: 'Hundreds of satisfied clients trust us with their needs.',
                image:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRxJ2tlZKhVRPq7CtU4EZAszcrfvcI3iPBIQ&s'
              }
            ].map((card, i) => (
              <div
                key={i}
                className="relative bg-cover bg-center bg-no-repeat border border-gray-300 rounded-2xl w-72 h-80 shadow-md hover:shadow-[0_0_20px_#f43f5e] transition duration-300 flex items-center justify-center text-center"
                style={{
                  backgroundImage: `url('${card.image}')`
                }}
              >
                <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                <div className="relative z-10 px-4">
                  <h2 className="text-xl font-extrabold mb-2 text-white drop-shadow-[0_0_2px_black] hover:drop-shadow-[0_0_8px_#f43f5e] transition">
                    {card.title}
                  </h2>
                  <p className="text-sm text-white/90">{card.desc}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default CardLayout;
