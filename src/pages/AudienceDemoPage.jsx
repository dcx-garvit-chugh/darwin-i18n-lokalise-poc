import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OVERVIEW = [
  { key: 'labelTotalSubscribers', value: '184,329' },
  { key: 'labelActiveSubscribers', value: '162,041' },
  { key: 'labelLapsedSubscribers', value: '14,820' },
  { key: 'labelPendingRenewal', value: '7,468' },
  { key: 'labelLifetimeValue', value: '$248.50' },
  { key: 'labelChurnRate', value: '5.4%' },
  { key: 'labelRetentionRate', value: '94.6%' },
  { key: 'labelAverageRenewalCadence', value: '11.3 mo' },
];

const COHORTS = [
  { id: 'c1', nameKey: 'cohortNewThisQuarter', size: '12,408', lastIssue: '2026-04-01', status: 'Active', stageKey: 'journeyOnboarding' },
  { id: 'c2', nameKey: 'cohortGiftRecipients', size: '3,217', lastIssue: '2026-03-01', status: 'Active', stageKey: 'journeyEngaged' },
  { id: 'c3', nameKey: 'cohortHighChurnRisk', size: '8,952', lastIssue: '2026-02-01', status: 'Pending', stageKey: 'journeyAtRisk' },
  { id: 'c4', nameKey: 'cohortPremiumTier', size: '24,103', lastIssue: '2026-04-01', status: 'Active', stageKey: 'journeyEngaged' },
  { id: 'c5', nameKey: 'cohortLapsedReactivated', size: '1,884', lastIssue: '2026-04-01', status: 'Active', stageKey: 'journeyEngaged' },
];

const SEGMENTS = [
  { id: 's1', nameKey: 'cohortNewThisQuarter', rulesKey: 'segmentRulesEngaged' },
  { id: 's2', nameKey: 'cohortHighChurnRisk', rulesKey: 'segmentRulesAtRisk' },
  { id: 's3', nameKey: 'cohortGiftRecipients', rulesKey: 'segmentRulesGiftDonors' },
];

const ACTIVITY = [
  { id: 1, eventKey: 'eventNewSubscription', name: 'Sara Müller', when: '2026-04-30 14:08' },
  { id: 2, eventKey: 'eventRenewalProcessed', name: 'James O\'Connor', when: '2026-04-30 13:50' },
  { id: 3, eventKey: 'eventIssueOpened', name: 'Anika Patel', when: '2026-04-30 13:42' },
  { id: 4, eventKey: 'eventGiftRedeemed', name: 'Lukas Becker', when: '2026-04-30 13:14' },
  { id: 5, eventKey: 'eventChurnedSubscriber', name: 'Marie Dubois', when: '2026-04-30 12:01' },
];

const PUBLICATIONS = [
  { name: 'The Atlantic Quarterly', subscribers: '48,210' },
  { name: 'Modern Photographer', subscribers: '32,418' },
  { name: 'Berliner Kulturmagazin', subscribers: '21,809' },
  { name: 'Pacific Wine Review', subscribers: '14,022' },
];

export default function AudienceDemoPage() {
  const { t } = useTranslation('poc');
  const [toast, setToast] = useState(null);

  const showToast = (key) => {
    setToast(t(`audience.${key}`));
    setTimeout(() => setToast(null), 3000);
  };

  const statusKey = (s) => `status${s}`;
  const statusClass = (s) =>
    s === 'Active' ? 'status-badge--ok'
      : s === 'Pending' ? 'status-badge--warn'
      : 'status-badge--danger';

  const churnRateNum = 5.4;
  const showChurnAlert = churnRateNum > 5;

  return (
    <div className="page-demo">
      <header className="page-demo__head">
        <h1 className="page-demo__title">{t('pageAudienceTitle')}</h1>
        <p className="page-demo__lede">{t('pageAudienceLede')}</p>
      </header>

      {toast && <div className="toast" role="status">{toast}</div>}

      {showChurnAlert && (
        <div className="alert alert--danger">{t('audience.alertHighChurnRisk')}</div>
      )}

      <div className="billing-grid">
        <section className="card">
          <h2 className="card__title">{t('audience.sectionOverview')}</h2>
          <div className="demo-grid" style={{ marginTop: '0.75rem' }}>
            {OVERVIEW.map(({ key, value }) => (
              <div key={key} className="card usage-tile">
                <p className="demo-tile__label">{t(`audience.${key}`)}</p>
                <p className="demo-tile__value">{value}</p>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn--ghost">{t('audience.btnViewAllSubscribers')}</button>
            <button type="button" className="btn btn--primary" onClick={() => showToast('toastCohortExported')}>
              {t('audience.btnRunCohortBuilder')}
            </button>
          </div>
          <p className="card__hint" style={{ marginTop: '0.5rem' }}>{t('audience.hintCohortBuilder')}</p>
        </section>

        <section className="card">
          <h2 className="card__title">{t('audience.sectionCohorts')}</h2>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>{t('audience.labelCohortName')}</th>
                <th>{t('audience.labelCohortSize')}</th>
                <th>{t('audience.labelLastIssueDelivered')}</th>
                <th>{t('audience.labelJourneyStage')}</th>
                <th>{t('audience.labelStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {COHORTS.map((c) => (
                <tr key={c.id}>
                  <td>{t(`audience.${c.nameKey}`)}</td>
                  <td>{c.size}</td>
                  <td>{c.lastIssue}</td>
                  <td>{t(`audience.${c.stageKey}`)}</td>
                  <td>
                    <span className={`status-badge ${statusClass(c.status)}`}>
                      {t(`audience.${statusKey(c.status)}`)}
                    </span>
                  </td>
                  <td>
                    <div className="btn-row">
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast('toastCohortExported')}>
                        {t('audience.btnExportCohort')}
                      </button>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast('toastCampaignQueued')}>
                        {t('audience.btnSendCampaign')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2 className="card__title">{t('audience.sectionSegments')}</h2>
          <ul className="card-list">
            {SEGMENTS.map((s) => (
              <li key={s.id} className="card-list__item">
                <div>
                  <strong>{t(`audience.${s.nameKey}`)}</strong>
                  <span className="card-list__meta">
                    {t('audience.labelSegmentRules')}: {t(`audience.${s.rulesKey}`)}
                  </span>
                </div>
                <div className="btn-row">
                  <button type="button" className="btn btn--ghost btn--sm">{t('audience.btnEditSegment')}</button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn--primary"
            style={{ marginTop: '0.75rem' }}
            onClick={() => showToast('toastSegmentCreated')}
          >
            {t('audience.btnCreateSegment')}
          </button>
        </section>

        <section className="card">
          <h2 className="card__title">{t('audience.sectionRecentActivity')}</h2>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>{t('audience.labelEvent')}</th>
                <th>{t('audience.labelSubscriberName')}</th>
                <th>{t('audience.labelTimestamp')}</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row) => (
                <tr key={row.id}>
                  <td>{t(`audience.${row.eventKey}`)}</td>
                  <td>{row.name}</td>
                  <td>{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2 className="card__title">{t('audience.sectionTopPublications')}</h2>
          <ul className="card-list">
            {PUBLICATIONS.map((p) => (
              <li key={p.name} className="card-list__item">
                <div>
                  <strong>{p.name}</strong>
                  <span className="card-list__meta">{t('audience.labelTotalSubscribers')}: {p.subscribers}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
