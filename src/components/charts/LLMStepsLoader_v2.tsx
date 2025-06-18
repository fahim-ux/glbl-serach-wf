import React, { useEffect, useState, useRef } from 'react';
import {
  FaCheckCircle,
  FaBrain,
  FaSearch,
  FaDatabase,
  FaCogs,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: 'Reasoning',
    description: 'LLM is understanding your query and breaking it down.',
    icon: <FaBrain size={24} />,
  },
  {
    id: 2,
    title: 'Building Query',
    description: 'Forming an ElasticSearch query from your intent.',
    icon: <FaSearch size={24} />,
  },
  {
    id: 3,
    title: 'Fetching Data',
    description: 'Querying the database for relevant results.',
    icon: <FaDatabase size={24} />,
  },
  {
    id: 4,
    title: 'Transforming',
    description: 'Formatting and transforming the raw data.',
    icon: <FaCogs size={24} />,
  },
  {
    id: 5,
    title: 'Sending Response',
    description: 'Sending the final output to frontend.',
    icon: <FaPaperPlane size={24} />,
  },
];

const BOX_WIDTH = 320; // px width of each step box + margin

const LLMStepSlider: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate transform to slide so current step is centered
  // Centering formula: translateX = -(currentStep * BOX_WIDTH) + container center offset
  // But we want the active step to be roughly center aligned in container
  // So we offset by half container width minus half box width

  const getTranslateX = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const centerOffset = containerWidth / 2 - BOX_WIDTH / 2;
    return -currentStep * BOX_WIDTH + centerOffset;
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow-lg text-white overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-8">🧬 LLM Step-by-Step Process</h2>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: 180 }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${getTranslateX()}px)` }}
        >
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step.id}
                className={`flex-shrink-0 w-[300px] mx-4 p-5 rounded-lg shadow-lg border
                  ${
                    isActive
                      ? 'border-blue-500 bg-zinc-800 scale-105'
                      : isDone
                      ? 'border-green-500 bg-zinc-700 opacity-70'
                      : 'border-zinc-700 bg-zinc-800 opacity-60'
                  }
                  transform-gpu
                  transition-all duration-500 ease-in-out
                `}
              >
                <div className="flex items-center mb-3 gap-3">
                  <div className="relative">
                    {isDone ? (
                      <FaCheckCircle className="text-green-400 w-8 h-8" />
                    ) : isActive ? (
                      <FaSpinner className="animate-spin text-blue-400 w-8 h-8" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xl font-semibold">
                    {step.icon}
                    <span>{step.title}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LLMStepSlider;
