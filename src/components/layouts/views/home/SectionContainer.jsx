import React from 'react';

const SectionContainer = ({ title, children }) => {
  return (
    <section className="w-full py-8 px-4 bg-white text-gray-900">
      <h1 className="text-3xl font-extrabold text-red-500 mb-6 text-center uppercase tracking-wide">
        {title || 'Key Features'}
      </h1>

      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-6 justify-center">
          {children || (
            <>
              {/* Card 1 */}
              <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 w-72 text-gray-900 shadow-md hover:shadow-[0_0_12px_#f43f5e] transition duration-300">
                <h2 className="text-lg font-bold mb-1">Smooth Interface</h2>
                <p className="text-sm text-gray-700">
                  Our platform boasts a smooth interface, ensuring an effortless and intuitive user experience.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 w-72 text-gray-900 shadow-md hover:shadow-[0_0_12px_#f43f5e] transition duration-300">
                <h2 className="text-lg font-bold mb-1">Easy Comparisons</h2>
                <p className="text-sm text-gray-700">
                  Designed to highlight differences and similarities at a glance.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 w-72 text-gray-900 shadow-md hover:shadow-[0_0_12px_#f43f5e] transition duration-300">
                <h2 className="text-lg font-bold mb-1">Seamless Payments</h2>
                <p className="text-sm text-gray-700">
                  Thanks to our seamless payments system, designed for speed and security.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionContainer;
