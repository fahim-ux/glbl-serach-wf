import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaBrain,
  FaSearch,
  FaDatabase,
  FaCogs,
  FaPaperPlane,
  FaSpinner,
  FaCircle,
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: 'Reasoning',
    description: 'LLM is understanding your query and breaking it down.',
    icon: <FaBrain />,
  },
  {
    id: 2,
    title: 'Building Query',
    description: 'Forming an ElasticSearch query from your intent.',
    icon: <FaSearch />,
  },
  {
    id: 3,
    title: 'Fetching Data',
    description: 'Querying the database for relevant results.',
    icon: <FaDatabase />,
  },
  {
    id: 4,
    title: 'Transforming',
    description: 'Formatting and transforming the raw data.',
    icon: <FaCogs />,
  },
  {
    id: 5,
    title: 'Sending Response',
    description: 'Sending the final output to frontend.',
    icon: <FaPaperPlane />,
  },
];

const LLMStepsLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 rounded-xl bg-zinc-900 text-white shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6 text-white">
        🧬 LLM is Working on It...
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;
          const statusIcon = isDone ? (
            <FaCheckCircle className="text-green-500 w-5 h-5" />
          ) : isActive ? (
            <FaSpinner className="text-blue-400 w-5 h-5 animate-spin" />
          ) : (
            <FaCircle className="text-zinc-600 w-3 h-3" />
          );

          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 p-4 rounded-md border ${
                isActive
                  ? 'border-blue-500 bg-zinc-800 animate-pulse'
                  : isDone
                  ? 'border-green-500 bg-zinc-800'
                  : 'border-zinc-700 bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2 w-8">
                {statusIcon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  {step.icon}
                  <span>{step.title}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LLMStepsLoader;
