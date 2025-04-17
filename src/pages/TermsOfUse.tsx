import { useTranslation } from 'react-i18next';

export const TermsOfUse = () => {
  const { t } = useTranslation();

  const sections = [
    'acceptance',
    'modifications',
    'usage',
    'intellectual_property',
    'liability',
    'law',
    'contact'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('terms.title')}</h1>

        {sections.map((key) => (
          <section key={key} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {t(`terms.sections.${key}.title`)}
            </h2>
            <p className="text-gray-300">
              {t(`terms.sections.${key}.content`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};
