import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ChartSlide {
  id: string;
  chart: React.ReactNode;
  description: string;
}

interface ChartCarouselProps {
  slides: ChartSlide[];
}

const ChartCarousel: React.FC<ChartCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Carousel Slide */}
      <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-md p-6 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          {/* Left Button */}
          <button
            className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition"
            onClick={goToPrev}
          >
            <FiChevronLeft className="text-xl" />
          </button>

          {/* Chart Area */}
          <div className="flex-1 px-6 text-white">
            <div className="w-full h-80 flex justify-center items-center">
              {slides[currentIndex].chart}
            </div>
            <div className="mt-4 text-center text-zinc-300 text-sm">
              {slides[currentIndex].description}
            </div>
          </div>

          {/* Right Button */}
          <button
            className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition"
            onClick={goToNext}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? 'bg-blue-500' : 'bg-zinc-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartCarousel;
