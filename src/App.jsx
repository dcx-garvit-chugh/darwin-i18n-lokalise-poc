import { useTranslation } from 'react-i18next';
import './App.css';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export default function App() {
  const { t, i18n } = useTranslation(['common', 'marketingStudio']);

  return (
    <div className="poc">
      <header className="poc-header">
        <h1>{t('common:app.name')}</h1>
        <p className="poc-sub">{t('marketingStudio:campaignConfigurator')}</p>
        <div className="poc-lang">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              className={i18n.language?.startsWith(code) ? 'active' : ''}
              onClick={() => i18n.changeLanguage(code)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="poc-main">
        <section>
          <h2>{t('marketingStudio:productItems')}</h2>
          <p>{t('marketingStudio:configureMarketingCampaignsRenewalJourneysEtc')}</p>
          <ul className="poc-list">
            <li>{t('marketingStudio:filterByItemId')}</li>
            <li>{t('marketingStudio:filterByName')}</li>
            <li>{t('marketingStudio:itemNotAttachedInAnyBundle')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('common:nav.home')}</h2>
          <p>
            <button type="button" className="poc-primary">
              {t('common:actions.save')}
            </button>{' '}
            <button type="button" className="poc-secondary">
              {t('common:actions.cancel')}
            </button>
          </p>
        </section>
      </main>
    </div>
  );
}
