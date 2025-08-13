import React from "react";

const HeroSection: React.FC = () => (
  <section
    className="w-full relative py-20 md:py-32 flex items-center justify-center text-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay for dark effect */}
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    <div className="relative z-10 container mx-auto px-4">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg text-white">
        Delicious Food, Delivered Fast
      </h2>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md text-white">
        Order from your favorite local restaurants and get it delivered right to
        your door.
      </p>
      
    </div >
  </section >
);

export default HeroSection;
