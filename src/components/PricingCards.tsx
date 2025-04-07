import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

type Currency = 'BRL' | 'USD' | 'EUR';

const currencySymbols: Record<Currency, string> = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
};

const defaultPrices: Record<Currency, { month: number; year: number }> = {
  BRL: { month: 11.99, year: 19.99 },
  USD: { month: 5.99, year: 9.99 },
  EUR: { month: 5.99, year: 9.99 },
};

const supportedCurrencies: Currency[] = ['BRL', 'USD', 'EUR'];

const fetchCurrency = async (): Promise<string> => {
  const response = await fetch("https://ipapi.co/json/");
  if (!response.ok) throw new Error("Erro na requisição");
  const data = await response.json();
  return data.currency;
};

export const PricingSection = () => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [userCanChoose, setUserCanChoose] = useState(false);

  // Usando React Query para buscar e cachear os dados de moeda
  const { data: apiCurrency, error } = useQuery({
    queryKey: ['currencyData'],
    queryFn: fetchCurrency,
    staleTime: 1000 * 60 * 60, // Cache por 1 hora
    retry: 2,
  });

  useEffect(() => {
    if (apiCurrency) {
      if (supportedCurrencies.includes(apiCurrency as Currency)) {
        setCurrency(apiCurrency as Currency);
        setUserCanChoose(false);
      } else {
        setCurrency('USD');
        setUserCanChoose(true);
      }
    } else if (error) {
      // Em caso de erro, permite a escolha manual
      setCurrency('USD');
      setUserCanChoose(true);
    }
  }, [apiCurrency, error]);

  const pricingFeatures = Array.isArray(t('home.pricing.features', { returnObjects: true }))
    ? (t('home.pricing.features', { returnObjects: true }) as string[])
    : [];

  const { month, year } = defaultPrices[currency];
  const symbol = currencySymbols[currency];

  return (
    <section className="py-20 px-6 bg-gray-950 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">{t('home.pricing.title')}</h2>
      <p className="text-gray-400 mb-10 text-lg">{t('home.pricing.subtitle')}</p>

      {userCanChoose && (
        <div className="mb-10">
          <label htmlFor="currency" className="mr-2 font-medium text-gray-300">
            {t('home.pricing.select_currency')}
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {supportedCurrencies.map((cur) => (
              <option key={cur} value={cur}>
                {currencySymbols[cur]} {cur}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plano Mensal */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-2">{t('home.pricing.monthly')}</h3>
          <p className="text-3xl font-semibold text-indigo-400 mb-6">
            {symbol} {month}
            <span className="text-base text-gray-400"> / {t('home.pricing.per_month')}</span>
          </p>
          <ul className="text-left space-y-3 text-gray-300">
            {pricingFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Plano Anual */}
        <div className="relative bg-indigo-950 p-8 rounded-2xl shadow-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
          <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            {t('home.pricing.best_value')}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">{t('home.pricing.yearly')}</h3>
          <p className="text-3xl font-semibold text-indigo-300 mb-6">
            {symbol} {year}
            <span className="text-base text-gray-400"> / {t('home.pricing.per_year')}</span>
          </p>
          <ul className="text-left space-y-3 text-gray-300">
            {pricingFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};