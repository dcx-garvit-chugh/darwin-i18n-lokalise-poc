import { useTranslation } from 'react-i18next';

const KEYS = [
  'purchasesSummaryDashboard',
  'fileStatusOverview',
  'audienceMetrics',
  'transaction',
  'subscription',
  'revenue',
  'retention',
  'customerService',
];

export default function ReportingDemoPage() {
  const { t } = useTranslation(['poc', 'reporting']);

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('poc:pageReportingTitle')}</h1>
        <p className="page-demo__lede">{t('poc:pageReportingLede')}</p>
      </header>
      <div className="demo-grid demo-grid--reporting">
        {KEYS.map((k) => (
          <article key={k} className="card demo-tile">
            <h2 className="card__title demo-tile__label">{t(`reporting:${k}`)}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
