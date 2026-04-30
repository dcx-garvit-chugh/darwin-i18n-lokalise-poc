import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N_NAMESPACES } from '../i18n.js';
import { REPO_URL } from '../constants.js';
import { useLocaleMenu } from '../hooks/useLocaleMenu.js';
import '../App.css';

const navClass = ({ isActive }) =>
  `top-nav__link${isActive ? ' top-nav__link--active' : ''}`;

export default function AppShell() {
  const { t, i18n } = useTranslation('poc');
  const langs = useLocaleMenu();
  const namespaceCount = I18N_NAMESPACES.length;

  const active = (code) => i18n.language?.startsWith(code);

  return (
    <div className="shell">
      <div className="aurora" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <header className="top-nav">
        <nav className="top-nav__links" aria-label="Demo areas">
          <NavLink to="/" end className={navClass}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/dashboard" className={navClass}>
            {t('nav.dashboard')}
          </NavLink>
          <NavLink to="/marketing" className={navClass}>
            {t('nav.marketing')}
          </NavLink>
          <NavLink to="/customer-care" className={navClass}>
            {t('nav.customerCare')}
          </NavLink>
          <NavLink to="/reporting" className={navClass}>
            {t('nav.reporting')}
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            {t('nav.admin')}
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            {t('nav.settings')}
          </NavLink>
          <NavLink to="/billing" className={navClass}>
            {t('nav.billing')}
          </NavLink>
          <NavLink to="/integrations" className={navClass}>
            {t('nav.integrations')}
          </NavLink>
          <NavLink to="/audience" className={navClass}>
            {t('nav.audience')}
          </NavLink>
        </nav>
        <div className="top-nav__meta">
          <span className="top-nav__ns" title="i18next namespaces">
            {namespaceCount} ns
          </span>
          <a
            className="top-nav__repo"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t('repoNavHint')}
          </a>
          <div className="lang-pills lang-pills--compact" role="group" aria-label={t('langLabel')}>
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

      <main className="page-outlet">
        <Outlet />
      </main>

      <footer className="foot">
        <p>{t('footerLine')}</p>
      </footer>
    </div>
  );
}
