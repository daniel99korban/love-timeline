import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const sections = t("privacy_policy.sections", { returnObjects: true }) as {
    heading: string;
    content: string;
  }[];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("privacy_policy.title")}</h1>

        <p className="mb-4">{t("privacy_policy.intro")}</p>

        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mt-6 mb-2">
              {section.heading}
            </h2>
            <p className="mb-4">{section.content}</p>
          </div>
        ))}

        <p className="mt-8 text-sm text-gray-400">
          {t("privacy_policy.update")}
        </p>
      </div>
    </div>
  );
};