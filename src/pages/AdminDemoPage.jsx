import { useTranslation } from 'react-i18next';

export default function AdminDemoPage() {
  const { t } = useTranslation(['poc', 'admin']);

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('poc:pageAdminTitle')}</h1>
        <p className="page-demo__lede">{t('poc:pageAdminLede')}</p>
      </header>
      <article className="card card--form-demo">
        <h2 className="card__title">{t('admin:addSubscriptionPreference')}</h2>
        <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
          <label className="demo-form__row">
            <span>{t('admin:clientId')}</span>
            <input className="demo-form__input" type="text" readOnly value="000" />
          </label>
          <label className="demo-form__row">
            <span>{t('admin:status')}</span>
            <input className="demo-form__input" type="text" readOnly value={t('admin:setting')} />
          </label>
          <label className="demo-form__row">
            <span>{t('admin:selectDate')}</span>
            <input className="demo-form__input" type="text" readOnly placeholder="—" />
          </label>
          <p className="card__hint">{t('admin:details')}</p>
          <div className="btn-row">
            <button type="submit" className="btn btn--primary">
              {t('poc:actions.save')}
            </button>
            <button type="button" className="btn btn--ghost">
              {t('poc:actions.cancel')}
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}
