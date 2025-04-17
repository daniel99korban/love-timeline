import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-6">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <a className="text-sm text-center sm:text-left" href="https://mdkstudio.com.br/">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </a>
        <div className="flex space-x-6">
          <Link
            to="/privacy-policy"
            className="text-sm hover:text-white transition-colors"
          >
            {t("footer.privacy_policy")}
          </Link>
          <Link
            to="/terms-of-use"
            className="text-sm hover:text-white transition-colors"
          >
            {t("footer.terms_of_use")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
