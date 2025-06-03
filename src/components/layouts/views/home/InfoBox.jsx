import React from 'react';

const InfoBox = () => {
  const infoData = [
    {
      title: 'Fast Response',
      description: 'We response within a few hours, guaranteed!',
      image: 'https://static.vecteezy.com/system/resources/previews/012/665/408/non_2x/delivery-and-courier-motorbike-logo-free-vector.jpg'
    },
    {
      title: 'Secure Payments',
      description: 'All transactions are encrypted and completely safe.',
      image: 'https://img.freepik.com/premium-vector/100-secure-payment-green-badge-isolated-transparent-background_105700-1800.jpg'
    },
    {
      title: '24/7 Support',
      description: 'Our support team is always here to help you.',
      image: 'https://content3.jdmagicbox.com/comp/ernakulam/l1/0484px484.x484.171214194032.b5l1/catalogue/travancore-support-services-pvt-ltd-vennala-ernakulam-electricians-xlv0w.jpg'
    },
    {
      title: 'Lifetime Support',
      description: 'Lifetime support for your project improvements.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQreHKaEbwkdcw4lqpFbw7qPb78ssEIHWhBrA&s'
    }
  ];

  return (
    <div className="bg-white py-7 px-4">
      <h1 className="text-[28px] font-extrabold text-red-600 mb-5 text-center">
        InfoBox
      </h1>
      <div className="overflow-x-auto">
        <div className="flex space-x-5 px-2">
          {infoData.map((info, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-100 border border-gray-300 rounded-xl shadow-md p-4 w-76 flex-shrink-0 hover:shadow-[0_0_12px_#f43f5e] transition-transform hover:scale-105 text-gray-900"
            >
              <img
                src={info.image}
                alt={info.title}
                className="w-15 h-15 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 className="text-[15px] font-bold">{info.title}</h3>
                <p className="text-[13px] text-gray-700 mt-1 font-medium">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;