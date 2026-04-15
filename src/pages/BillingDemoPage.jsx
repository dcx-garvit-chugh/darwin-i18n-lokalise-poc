import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MOCK_CARDS = [
  { last4: '4242', expiry: '09/27', isDefault: true },
  { last4: '1881', expiry: '03/26', isDefault: false },
];

const MOCK_INVOICES = [
  { id: 'INV-2026-041', date: '2026-04-01', amount: '$2,400.00', status: 'paid' },
  { id: 'INV-2026-031', date: '2026-03-01', amount: '$2,400.00', status: 'paid' },
  { id: 'INV-2026-021', date: '2026-02-01', amount: '$2,400.00', status: 'overdue' },
];

const MOCK_USAGE = [
  { key: 'billing.labelApiCalls', value: '1,248,310' },
  { key: 'billing.labelActiveUsers', value: '87' },
  { key: 'billing.labelStorageUsed', value: '14.2 GB' },
  { key: 'billing.labelEmailsSent', value: '34,509' },
];

export default function BillingDemoPage() {
  const { t } = useTranslation('poc');
  const [toast, setToast] = useState(null);

  const showToast = (key) => {
    setToast(t(key));
    setTimeout(() => setToast(null), 3000);
  };

  const statusClass = (s) =>
    s === 'paid' ? 'status-badge--ok' : s === 'overdue' ? 'status-badge--danger' : 'status-badge--warn';

  const hasOverdue = MOCK_INVOICES.some((inv) => inv.status === 'overdue');

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('pageBillingTitle')}</h1>
        <p className="page-demo__lede">{t('pageBillingLede')}</p>
      </header>

      {toast && <div className="toast" role="status">{toast}</div>}

      {hasOverdue && (
        <div className="alert alert--danger">{t('billing.alertOverdue')}</div>
      )}

      <div className="billing-grid">
        <section className="card">
          <h2 className="card__title">{t('billing.sectionCurrentPlan')}</h2>
          <dl className="plan-details">
            <div className="plan-row">
              <dt>{t('billing.labelPlanName')}</dt>
              <dd>{t('billing.valuePlanEnterprise')}</dd>
            </div>
            <div className="plan-row">
              <dt>{t('billing.labelPlanStatus')}</dt>
              <dd><span className="status-badge status-badge--ok">{t('billing.valueActive')}</span></dd>
            </div>
            <div className="plan-row">
              <dt>{t('billing.labelBillingCycle')}</dt>
              <dd>{t('billing.valueAnnual')}</dd>
            </div>
            <div className="plan-row">
              <dt>{t('billing.labelNextRenewal')}</dt>
              <dd>2027-04-01</dd>
            </div>
            <div className="plan-row">
              <dt>{t('billing.labelMonthlySpend')}</dt>
              <dd>$2,400.00</dd>
            </div>
          </dl>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn--ghost">{t('billing.btnChangePlan')}</button>
            <button type="button" className="btn btn--danger">{t('billing.btnCancelSubscription')}</button>
          </div>
        </section>

        <section className="card">
          <h2 className="card__title">{t('billing.sectionPaymentMethods')}</h2>
          <ul className="card-list">
            {MOCK_CARDS.map((c) => (
              <li key={c.last4} className="card-list__item">
                <div>
                  <strong>{t('billing.labelCardEnding')} {c.last4}</strong>
                  <span className="card-list__meta">{t('billing.labelExpiry')}: {c.expiry}</span>
                  {c.isDefault && <span className="status-badge status-badge--ok">{t('billing.labelDefault')}</span>}
                </div>
                <div className="btn-row">
                  {!c.isDefault && (
                    <button type="button" className="btn btn--ghost btn--sm">{t('billing.btnSetDefault')}</button>
                  )}
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast('billing.toastCardRemoved')}>
                    {t('billing.btnRemoveCard')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--primary" style={{ marginTop: '0.75rem' }} onClick={() => showToast('billing.toastCardAdded')}>
            {t('billing.btnAddCard')}
          </button>
        </section>

        <section className="card">
          <h2 className="card__title">{t('billing.sectionInvoices')}</h2>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>{t('billing.labelInvoiceNumber')}</th>
                <th>{t('billing.labelInvoiceDate')}</th>
                <th>{t('billing.labelInvoiceAmount')}</th>
                <th>{t('billing.labelInvoiceStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.amount}</td>
                  <td><span className={`status-badge ${statusClass(inv.status)}`}>{t(`billing.value${inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}`)}</span></td>
                  <td><button type="button" className="btn btn--ghost btn--sm">{t('billing.btnDownloadInvoice')}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn btn--ghost" style={{ marginTop: '0.75rem' }}>{t('billing.btnViewAll')}</button>
        </section>

        <section className="card">
          <h2 className="card__title">{t('billing.sectionUsage')}</h2>
          <p className="card__hint">{t('billing.hintUsageReset')}</p>
          <div className="demo-grid" style={{ marginTop: '0.75rem' }}>
            {MOCK_USAGE.map(({ key, value }) => (
              <div key={key} className="card usage-tile">
                <p className="demo-tile__label">{t(key)}</p>
                <p className="demo-tile__value">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
