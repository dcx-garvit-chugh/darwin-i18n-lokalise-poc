import { useTranslation } from 'react-i18next';

export default function DashboardDemoPage() {
  const { t } = useTranslation(['poc', 'dashboard']);

  const tiles = [
    ['totalActive', '1,204'],
    ['activeCustomers', '892'],
    ['marketingStudio', '—'],
    ['customerCare', '—'],
    ['reportingEvolved', '—'],
    ['renewalAnalysis', '—'],
  ];

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('poc:pageDashboardTitle')}</h1>
        <p className="page-demo__lede">{t('poc:pageDashboardLede')}</p>
      </header>
      <div className="demo-grid">
        {tiles.map(([key, val]) => (
          <article key={key} className="card demo-tile">
            <h2 className="card__title demo-tile__label">{t(`dashboard:${key}`)}</h2>
            <p className="demo-tile__value">{val}</p>
          </article>
        ))}
      </div>
      <p className="page-demo__note">
        {t('dashboard:home')} · {t('dashboard:selectDates')}
      </p>
    </div>
  );
}
