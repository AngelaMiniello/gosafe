import Image from 'next/image';

export default function PartnerLogos() {
  const logos = [
    { name: 'Axon', src: '/axon-airlines.svg', size: "h-16 sm:h-20 md:h-24"  },
    { name: 'Jetski', src: 'jet-ski.svg', size: "h-10 sm:h-10 md:h-12" },
    { name: 'Expedia', src: 'expedia.svg', size: "h-7 sm:h-9 md:h-10" },
    { name: 'Kia', src: 'kia-motors-1.svg', size: "h-8 sm:h-9 md:h-10" },
    { name: 'Reebok', src: 'reebok-5.svg', size: "h-10 sm:h-12 md:h-14" },
  ];

 return (
  <section className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-4 items-center justify-items-center">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="
  group relative flex items-center justify-center w-full max-w-[140px] sm:max-w-[160px] min-h-[80px] sm:min-h-[90px] md:min-h-[100px] p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-300
"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className={`${logo.size} w-auto object-contain transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100`}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
};