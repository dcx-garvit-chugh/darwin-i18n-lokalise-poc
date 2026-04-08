import { useTranslation } from 'react-i18next';

const KEYS = [
  'marketingCampaigns',
  'productItems',
  'campaignConfigurator',
  'productBundles',
  'renewalGroups',
  'dataExport',
  'dataUpload',
  'emailManager',
  'reports',
  'finderDataManagement',
  'brand',
  'itemId',
  'itemName',
  'coupons',
  'campaignPerformance',
];

export default function MarketingDemoPage() {
  const { t } = useTranslation(['poc', 'marketingStudio']);

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('poc:pageMarketingTitle')}</h1>
        <p className="page-demo__lede">{t('poc:pageMarketingLede')}</p>
      </header>
      <article className="card">
        <h2 className="card__title">{t('poc:demoListCaption')}</h2>
        <ul className="demo-list">
          {KEYS.map((k) => (
            <li key={k}>
              <span className="demo-list__key">{k}</span>
              <span className="demo-list__val">{t(`marketingStudio:${k}`)}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
