import { useTranslation } from 'react-i18next';

export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const sections = t('privacy_policy.sections', { returnObjects: true }) as {
    heading: string;
    content: string;
  }[];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('privacy_policy.title')}</h1>

        <p className="mb-6 text-lg text-gray-300">{t('privacy_policy.intro')}</p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
              <p className="text-gray-300">{section.content}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-400">{t('privacy_policy.update')}</p>
      </div>
    </div>
  );
};