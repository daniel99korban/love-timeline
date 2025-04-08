import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="bg-gray-950 text-gray-300 py-4 bottom-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">{t("footer.copyright")}</p>
          <div className="mt-2 sm:mt-0 flex space-x-4">
            <Link to="/privacy-policy">
              <a className="text-sm hover:underline">
                {t("footer.privacy_policy")}
              </a>
            </Link>
            <Link to="/terms-of-use">
              <a className="text-sm hover:underline">
                {t("footer.terms_of_use")}
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
