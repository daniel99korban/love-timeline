import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaqSection } from '../components/FaqSection';

export const Home = () => {
  const { t } = useTranslation();

  // Obtenha os dados e force o tipo esperado
  const stepsItems = Array.isArray(t('home.steps.items', { returnObjects: true }))
    ? (t('home.steps.items', { returnObjects: true }) as string[])
    : [];
  const pricingFeatures = Array.isArray(t('home.pricing.features', { returnObjects: true }))
    ? (t('home.pricing.features', { returnObjects: true }) as string[])
    : [];
  const faqQuestions = Array.isArray(t('home.faq.questions', { returnObjects: true }))
    ? (t('home.faq.questions', { returnObjects: true }) as { q: string; a: string }[])
    : [];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t('home.hero.title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          {t('home.hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/form"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
          >
            {t('home.submit')}
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition"
          >
            {t('nav.about')}
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-950 py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12 drop-shadow-md">
          {t('home.steps.title')}
        </h2>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stepsItems.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-700/30 transition transform duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-5 mx-auto shadow-md">
                {idx + 1}
              </div>
              <p className="text-base text-gray-200 font-medium leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 text-center bg-gray-950">
        <h2 className="text-3xl font-semibold mb-10">{t('home.pricing.title')}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8 text-gray-300">
          {/* Monthly */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full sm:w-1/3">
            <h3 className="text-xl font-bold mb-2">{t('home.pricing.monthly')}</h3>
            <p className="text-2xl font-semibold text-white mb-4">{t('home.pricing.price_month')}</p>
            <ul className="text-left space-y-2">
              {pricingFeatures.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
          </div>
          {/* Yearly */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full sm:w-1/3">
            <h3 className="text-xl font-bold mb-2">{t('home.pricing.yearly')}</h3>
            <p className="text-2xl font-semibold text-white mb-4">{t('home.pricing.price_year')}</p>
            <ul className="text-left space-y-2">
              {pricingFeatures.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        title={t('home.faq.title')}
        questions={faqQuestions}
      />
    </div>
  );
};