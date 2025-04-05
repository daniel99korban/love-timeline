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
    <section className="bg-gray-950 py-16 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center text-white">{title}</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {questions.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg shadow-md p-4 transition-colors"
            >
              <button
                onClick={() => toggleQuestion(idx)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.q}
                </span>
                <span className="ml-2 text-white">
                  {isOpen ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`mt-2 text-gray-300 overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pt-1">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
