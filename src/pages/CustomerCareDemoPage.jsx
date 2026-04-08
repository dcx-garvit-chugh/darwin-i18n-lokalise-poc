import { useTranslation } from 'react-i18next';

const ACTION_KEYS = [
  'search',
  'subscriptions',
  'addCustomer',
  'cancelSubscription',
  'customerInfo',
  'purchaseHistory',
  'agentActions',
];

export default function CustomerCareDemoPage() {
  const { t } = useTranslation(['poc', 'customerCare']);

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('poc:pageCustomerCareTitle')}</h1>
        <p className="page-demo__lede">{t('poc:pageCustomerCareLede')}</p>
      </header>
      <div className="demo-split">
        <article className="card">
          <h2 className="card__title">{t('customerCare:enterYourSearchQuery')}</h2>
          <p className="card__hint">{t('customerCare:searchResultsFor')} “demo”</p>
          <div className="demo-fake-input" aria-hidden="true">
            {t('customerCare:cantFindACustomer')}
          </div>
        </article>
        <article className="card">
          <h2 className="card__title">{t('customerCare:agentActions')}</h2>
          <ul className="filter-chips">
            {ACTION_KEYS.map((k) => (
              <li key={k}>{t(`customerCare:${k}`)}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
