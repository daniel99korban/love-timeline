import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  title: string;
  questions: FaqItem[];
}

export const FaqSection = ({ title, questions }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-900 py-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center text-white drop-shadow-md">
        {title}
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {questions.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleQuestion(idx)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-xl font-semibold text-white">
                  {faq.q}
                </span>
                <span className="ml-4 text-white transition-transform duration-300 transform">
                  {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`px-6 pb-6 text-gray-300 transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="mt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
