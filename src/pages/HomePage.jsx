import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from '../i18n.js';
import { REPO_URL } from '../constants.js';
import { useLocaleMenu } from '../hooks/useLocaleMenu.js';

export default function HomePage() {
  const { t } = useTranslation(['poc', 'marketingStudio']);
  const langs = useLocaleMenu();
  const localeCount = langs.length;
  const namespaceCount = I18N_NAMESPACES.length;

  return (
    <>
      <header className="hero">
        <span className="badge">{t('poc:badge')}</span>
        <p className="product-name">{t('poc:app.name')}</p>
        <p className="kicker">{t('poc:heroKicker')}</p>
        <h1 className="title">{t('poc:heroTitle')}</h1>
        <p className="lede">{t('poc:heroLede')}</p>
      </header>

      <div className="bento">
        <article className="card card--span-2 card--pipeline">
          <h2 className="card__title">{t('poc:cardPipelineTitle')}</h2>
          <p className="card__steps">{t('poc:cardPipelineSteps')}</p>
          <p className="card__caption">{t('poc:cardPipelineCaption')}</p>
          <div className="flow-dots" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </article>

        <article className="card card--stats">
          <h2 className="card__title">{t('poc:cardStatsTitle')}</h2>
          <dl className="stats">
            <div className="stat">
              <dt>{t('poc:statLocales')}</dt>
              <dd>{localeCount}</dd>
            </div>
            <div className="stat">
              <dt>{t('poc:statNamespaces')}</dt>
              <dd>{namespaceCount}</dd>
            </div>
            <div className="stat">
              <dt>{t('poc:statKeys')}</dt>
              <dd>{t('poc:demoKeysInViewSample')}</dd>
            </div>
          </dl>
        </article>

        <article className="card card--span-2 card--filters">
          <div className="card__head">
            <h2 className="card__title">{t('poc:cardFiltersTitle')}</h2>
            <span className="mini-badge">{t('poc:demoMarketingBadge')}</span>
          </div>
          <p className="card__hint">{t('poc:cardFiltersHint')}</p>
          <ul className="filter-chips">
            <li>{t('marketingStudio:filterByItemId')}</li>
            <li>{t('marketingStudio:filterByName')}</li>
            <li>{t('marketingStudio:filterByBrand')}</li>
          </ul>
        </article>

        <article className="card card--error">
          <h2 className="card__title">{t('poc:cardErrorTitle')}</h2>
          <p className="card__hint">{t('poc:cardErrorHint')}</p>
          <div className="error-plaque" role="status">
            <span className="error-plaque__icon" aria-hidden="true">⚠</span>
            <span className="error-plaque__text">
              {t('marketingStudio:itemNotAttachedInAnyBundle')}
            </span>
          </div>
        </article>

        <article className="card card--actions card--span-2">
          <div className="actions-inner">
            <div>
              <h2 className="card__title">{t('poc:nav.home')}</h2>
              <p className="card__hint actions-tagline">
                {t('marketingStudio:configureMarketingCampaignsRenewalJourneysEtc')}
              </p>
            </div>
            <div className="btn-row">
              <a
                className="btn btn--primary"
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
              >
                {t('poc:ctaPrimary')}
              </a>
              <button type="button" className="btn btn--ghost">
                {t('poc:ctaSecondary')}
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
