import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaqSection } from '../components/FaqSection';
import { PricingSection } from '../components/PricingCards';

export const Home = () => {
  const { t } = useTranslation();

  // Obtenha os dados para os passos e FAQ
  const stepsItems = Array.isArray(t('home.steps.items', { returnObjects: true }))
    ? (t('home.steps.items', { returnObjects: true }) as string[])
    : [];
  const faqQuestions = Array.isArray(t('home.faq.questions', { returnObjects: true }))
    ? (t('home.faq.questions', { returnObjects: true }) as { q: string; a: string }[])
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col">
      {/* Seção Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          {t('home.hero.title')}
        </h1>
        <p className="max-w-2xl text-xl sm:text-2xl text-gray-300 mb-10">
          {t('home.hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/form"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition-all shadow-md hover:shadow-xl"
          >
            {t('home.submit')}
          </Link>
        </div>
      </section>

      {/* Seção de Passos */}
      <section className="py-20 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 drop-shadow-md">
          {t('home.steps.title')}
        </h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stepsItems.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-indigo-700/30"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-md">
                {idx + 1}
              </div>
              <p className="text-lg text-gray-200 font-medium leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Preços */}
      <PricingSection />

      {/* Seção de FAQ */}
      <FaqSection
        title={t('home.faq.title')}
        questions={faqQuestions}
      />
    </div>
  );
};
