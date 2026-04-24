import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CONNECTED = [
  { id: 'stripe', name: 'Stripe', categoryKey: 'categoryPayment', descKey: 'descriptionStripe', status: 'Active', lastSync: '2026-04-14 09:42', connectedBy: 'Mark Chen' },
  { id: 'paypal', name: 'PayPal', categoryKey: 'categoryPayment', descKey: 'descriptionPayPal', status: 'Active', lastSync: '2026-04-14 09:41', connectedBy: 'Mark Chen' },
  { id: 'cybersource', name: 'CyberSource', categoryKey: 'categoryPayment', descKey: 'descriptionCyberSource', status: 'Pending', lastSync: '2026-04-13 18:02', connectedBy: 'Adam Liu' },
  { id: 'hubspot', name: 'HubSpot', categoryKey: 'categoryMarketing', descKey: 'descriptionHubSpot', status: 'Active', lastSync: '2026-04-14 08:10', connectedBy: 'Garvit Chugh' },
  { id: 'ga', name: 'Google Analytics', categoryKey: 'categoryAnalytics', descKey: 'descriptionGoogleAnalytics', status: 'Active', lastSync: '2026-04-14 07:55', connectedBy: 'Garvit Chugh' },
];

const AVAILABLE = [
  { id: 'braintree', name: 'Braintree', categoryKey: 'categoryPayment', descKey: 'descriptionBraintree' },
  { id: 'mailchimp', name: 'Mailchimp', categoryKey: 'categoryEmail', descKey: 'descriptionMailchimp' },
  { id: 'segment', name: 'Segment', categoryKey: 'categoryAnalytics', descKey: 'descriptionSegment' },
];

const ACTIVITY = [
  { id: 1, key: 'activityPaymentSynced', provider: 'Stripe', when: '2026-04-14 09:42', status: 'Active' },
  { id: 2, key: 'activityCampaignTriggered', provider: 'HubSpot', when: '2026-04-14 08:10', status: 'Active' },
  { id: 3, key: 'activityRenewalProcessed', provider: 'Stripe', when: '2026-04-14 07:01', status: 'Active' },
  { id: 4, key: 'activityIssueDelivered', provider: 'CyberSource', when: '2026-04-13 22:15', status: 'Pending' },
  { id: 5, key: 'activityRefundIssued', provider: 'PayPal', when: '2026-04-13 19:48', status: 'Active' },
  { id: 6, key: 'activityCohortExported', provider: 'HubSpot', when: '2026-04-13 14:02', status: 'Active' },
];

const HEALTH = [
  { key: 'healthLabelUptime', value: '99.98%' },
  { key: 'healthLabelAvgLatency', value: '218 ms' },
  { key: 'healthLabelFailedSyncs', value: '2' },
  { key: 'healthLabelQueueDepth', value: '14' },
];

export default function IntegrationsDemoPage() {
  const { t } = useTranslation('poc');
  const [toast, setToast] = useState(null);

  const showToast = (key) => {
    setToast(t(`integrations.${key}`));
    setTimeout(() => setToast(null), 3000);
  };

  const statusKey = (s) => `status${s}`;
  const statusClass = (s) =>
    s === 'Active' ? 'status-badge--ok' : s === 'Pending' ? 'status-badge--warn' : 'status-badge--danger';

  const hasPending = CONNECTED.some((c) => c.status === 'Pending');

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('pageIntegrationsTitle')}</h1>
        <p className="page-demo__lede">{t('pageIntegrationsLede')}</p>
      </header>

      {toast && <div className="toast" role="status">{toast}</div>}

      {hasPending && (
        <div className="alert alert--danger">{t('integrations.alertPendingReview')}</div>
      )}

      <div className="billing-grid">
        <section className="card">
          <h2 className="card__title">{t('integrations.sectionConnected')}</h2>
          <ul className="card-list">
            {CONNECTED.map((c) => (
              <li key={c.id} className="card-list__item">
                <div>
                  <strong>{c.name}</strong>
                  <span className="card-list__meta">
                    {t('integrations.labelCategory')}: {t(`integrations.${c.categoryKey}`)}
                  </span>
                  <span className="card-list__meta">{t(`integrations.${c.descKey}`)}</span>
                  <span className="card-list__meta">
                    {t('integrations.labelLastSync')}: {c.lastSync} · {t('integrations.labelConnectedBy')}: {c.connectedBy}
                  </span>
                </div>
                <div className="btn-row">
                  <span className={`status-badge ${statusClass(c.status)}`}>
                    {t(`integrations.${statusKey(c.status)}`)}
                  </span>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast('toastSyncStarted')}>
                    {t('integrations.btnSyncNow')}
                  </button>
                  <button type="button" className="btn btn--ghost btn--sm">
                    {t('integrations.btnConfigure')}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      if (window.confirm(t('integrations.confirmDisconnect'))) {
                        showToast('toastDisconnected');
                      }
                    }}
                  >
                    {t('integrations.btnDisconnect')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="card__title">{t('integrations.sectionAvailable')}</h2>
          {AVAILABLE.length === 0 ? (
            <p className="card__hint">{t('integrations.emptyAvailable')}</p>
          ) : (
            <ul className="card-list">
              {AVAILABLE.map((a) => (
                <li key={a.id} className="card-list__item">
                  <div>
                    <strong>{a.name}</strong>
                    <span className="card-list__meta">
                      {t('integrations.labelCategory')}: {t(`integrations.${a.categoryKey}`)}
                    </span>
                    <span className="card-list__meta">{t(`integrations.${a.descKey}`)}</span>
                  </div>
                  <div className="btn-row">
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => showToast('toastConnected')}>
                      {t('integrations.btnConnect')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2 className="card__title">{t('integrations.sectionActivity')}</h2>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>{t('integrations.labelDescription')}</th>
                <th>{t('integrations.labelProvider')}</th>
                <th>{t('integrations.labelLastSync')}</th>
                <th>{t('integrations.labelStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row) => (
                <tr key={row.id}>
                  <td>{t(`integrations.${row.key}`)}</td>
                  <td>{row.provider}</td>
                  <td>{row.when}</td>
                  <td>
                    <span className={`status-badge ${statusClass(row.status)}`}>
                      {t(`integrations.${statusKey(row.status)}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn btn--ghost" style={{ marginTop: '0.75rem' }}>
            {t('integrations.btnViewAllActivity')}
          </button>
        </section>

        <section className="card">
          <h2 className="card__title">{t('integrations.sectionHealth')}</h2>
          <p className="card__hint">{t('integrations.healthHintMonitored')}</p>
          <div className="demo-grid" style={{ marginTop: '0.75rem' }}>
            {HEALTH.map(({ key, value }) => (
              <div key={key} className="card usage-tile">
                <p className="demo-tile__label">{t(`integrations.${key}`)}</p>
                <p className="demo-tile__value">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
