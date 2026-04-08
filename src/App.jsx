import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from './i18n.js';
import './App.css';

const REPO_URL = 'https://github.com/dcx-garvit-chugh/darwin-i18n-lokalise-poc';

function useLocaleMenu() {
  const { i18n } = useTranslation(I18N_NAMESPACES);

  return useMemo(() => {
    const raw = i18n.options.supportedLngs;
    const codes = Array.isArray(raw)
      ? raw.filter((c) => typeof c === 'string')
      : ['en'];

    const uiLang = (i18n.resolvedLanguage || 'en').split(/[-_]/)[0];
    let displayNames;
    try {
      displayNames = new Intl.DisplayNames([uiLang], { type: 'language' });
    } catch {
      displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    }

    return codes.map((code) => ({
      code,
      label: displayNames.of(code) || code,
    }));
  }, [i18n.options.supportedLngs, i18n.resolvedLanguage]);
}

export default function App() {
  const { t, i18n } = useTranslation(I18N_NAMESPACES);
  const langs = useLocaleMenu();
  const localeCount = langs.length;
  const namespaceCount = I18N_NAMESPACES.length;

  const active = (code) => i18n.language?.startsWith(code);

  return (
    <div className="shell">
      <div className="aurora" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <header className="hero">
        <span className="badge">{t('common:poc.badge')}</span>
        <p className="product-name">{t('common:app.name')}</p>
        <p className="kicker">{t('common:poc.heroKicker')}</p>
        <h1 className="title">{t('common:poc.heroTitle')}</h1>
        <p className="lede">{t('common:poc.heroLede')}</p>

        <div className="lang-row">
          <span className="lang-label">{t('common:poc.langLabel')}</span>
          <div className="lang-pills" role="group" aria-label={t('common:poc.langLabel')}>
            {langs.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                className={`lang-pill${active(code) ? ' lang-pill--active' : ''}`}
                onClick={() => i18n.changeLanguage(code)}
                aria-pressed={active(code)}
                title={code}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="bento">
        <article className="card card--span-2 card--pipeline">
          <h2 className="card__title">{t('common:poc.cardPipelineTitle')}</h2>
          <p className="card__steps">{t('common:poc.cardPipelineSteps')}</p>
          <p className="card__caption">{t('common:poc.cardPipelineCaption')}</p>
          <div className="flow-dots" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </article>

        <article className="card card--stats">
          <h2 className="card__title">{t('common:poc.cardStatsTitle')}</h2>
          <dl className="stats">
            <div className="stat">
              <dt>{t('common:poc.statLocales')}</dt>
              <dd>{localeCount}</dd>
            </div>
            <div className="stat">
              <dt>{t('common:poc.statNamespaces')}</dt>
              <dd>{namespaceCount}</dd>
            </div>
            <div className="stat">
              <dt>{t('common:poc.statKeys')}</dt>
              <dd>{t('marketingStudio:pocStatVal12')}</dd>
            </div>
          </dl>
        </article>

        <article className="card card--span-2 card--filters">
          <div className="card__head">
            <h2 className="card__title">{t('common:poc.cardFiltersTitle')}</h2>
            <span className="mini-badge">{t('marketingStudio:pocSampleBadge')}</span>
          </div>
          <p className="card__hint">{t('common:poc.cardFiltersHint')}</p>
          <ul className="filter-chips">
            <li>{t('marketingStudio:filterByItemId')}</li>
            <li>{t('marketingStudio:filterByName')}</li>
            <li>{t('marketingStudio:filterByBrand')}</li>
          </ul>
        </article>

        <article className="card card--error">
          <h2 className="card__title">{t('common:poc.cardErrorTitle')}</h2>
          <p className="card__hint">{t('common:poc.cardErrorHint')}</p>
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
              <h2 className="card__title">{t('common:nav.home')}</h2>
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
                {t('common:poc.ctaPrimary')}
              </a>
              <button type="button" className="btn btn--ghost">
                {t('common:poc.ctaSecondary')}
              </button>
            </div>
          </div>
        </article>
      </div>

      <footer className="foot">
        <p>{t('common:poc.footerLine')}</p>
      </footer>
    </div>
  );
}
