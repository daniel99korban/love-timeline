import { useTranslation } from 'react-i18next';

export const Footer = () => {

    const { t } = useTranslation();

    return (
        <>
            <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-4 bottom-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm">
                        {t('footer.copyright')}
                    </p>
                    <div className="mt-2 sm:mt-0 flex space-x-4">
                        <a href="#" className="text-sm hover:underline">
                        {t('footer.privacy_policy')}
                        </a>
                        <a href="#" className="text-sm hover:underline">
                        {t('footer.terms_of_use')}
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}