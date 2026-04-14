import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SettingsDemoPage() {
  const { t } = useTranslation('poc');
  const [toast, setToast] = useState(null);

  const showToast = (key) => {
    setToast(t(key));
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('pageSettingsTitle')}</h1>
        <p className="page-demo__lede">{t('pageSettingsLede')}</p>
      </header>

      {toast && <div className="toast" role="status">{toast}</div>}

      <form className="settings-form" onSubmit={(e) => { e.preventDefault(); showToast('settings.toastSaved'); }}>

        <section className="card settings-section">
          <h2 className="card__title">{t('settings.sectionAccount')}</h2>
          <label className="demo-form__row">
            <span>{t('settings.labelDisplayName')}</span>
            <input className="demo-form__input" type="text" placeholder={t('settings.placeholderDisplayName')} />
          </label>
          <label className="demo-form__row">
            <span>{t('settings.labelEmail')}</span>
            <input className="demo-form__input" type="email" placeholder={t('settings.placeholderEmail')} />
          </label>
          <label className="demo-form__row">
            <span>{t('settings.labelTimezone')}</span>
            <select className="demo-form__input">
              <option>America/Toronto</option>
              <option>Europe/Berlin</option>
              <option>Asia/Kolkata</option>
            </select>
          </label>
          <label className="demo-form__row">
            <span>{t('settings.labelLanguagePreference')}</span>
            <select className="demo-form__input">
              <option>English</option>
              <option>Deutsch</option>
            </select>
          </label>
        </section>

        <section className="card settings-section">
          <h2 className="card__title">{t('settings.sectionNotifications')}</h2>
          <p className="card__hint">{t('settings.hintNotifications')}</p>
          <div className="settings-toggles">
            <label className="toggle-row">
              <input type="checkbox" defaultChecked /> {t('settings.labelEmailNotifications')}
            </label>
            <label className="toggle-row">
              <input type="checkbox" /> {t('settings.labelSlackAlerts')}
            </label>
            <label className="toggle-row">
              <input type="checkbox" defaultChecked /> {t('settings.labelWeeklyDigest')}
            </label>
            <label className="toggle-row">
              <input type="checkbox" /> {t('settings.labelCriticalAlertsOnly')}
            </label>
          </div>
        </section>

        <section className="card settings-section">
          <h2 className="card__title">{t('settings.sectionDisplay')}</h2>
          <div className="settings-toggles">
            <label className="toggle-row">
              <input type="checkbox" defaultChecked /> {t('settings.labelDarkMode')}
            </label>
            <label className="toggle-row">
              <input type="checkbox" /> {t('settings.labelCompactView')}
            </label>
            <label className="toggle-row">
              <input type="checkbox" /> {t('settings.labelShowKeyHints')}
            </label>
          </div>
          <label className="demo-form__row">
            <span>{t('settings.labelItemsPerPage')}</span>
            <select className="demo-form__input">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </label>
        </section>

        <section className="card settings-section settings-section--danger">
          <h2 className="card__title">{t('settings.sectionDanger')}</h2>
          <p className="card__hint">{t('settings.hintDeleteAccount')}</p>
          <button type="button" className="btn btn--danger" onClick={() => showToast('settings.toastReset')}>
            {t('settings.btnDeleteAccount')}
          </button>
        </section>

        <div className="btn-row settings-actions">
          <button type="submit" className="btn btn--primary">{t('settings.btnSaveChanges')}</button>
          <button type="button" className="btn btn--ghost" onClick={() => showToast('settings.toastReset')}>
            {t('settings.btnResetDefaults')}
          </button>
        </div>
      </form>
    </div>
  );
}
