import { Route, Routes } from 'react-router-dom';
import AppShell from './layout/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardDemoPage from './pages/DashboardDemoPage.jsx';
import MarketingDemoPage from './pages/MarketingDemoPage.jsx';
import CustomerCareDemoPage from './pages/CustomerCareDemoPage.jsx';
import ReportingDemoPage from './pages/ReportingDemoPage.jsx';
import AdminDemoPage from './pages/AdminDemoPage.jsx';
import SettingsDemoPage from './pages/SettingsDemoPage.jsx';
import BillingDemoPage from './pages/BillingDemoPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardDemoPage />} />
        <Route path="marketing" element={<MarketingDemoPage />} />
        <Route path="customer-care" element={<CustomerCareDemoPage />} />
        <Route path="reporting" element={<ReportingDemoPage />} />
        <Route path="admin" element={<AdminDemoPage />} />
        <Route path="settings" element={<SettingsDemoPage />} />
        <Route path="billing" element={<BillingDemoPage />} />
      </Route>
    </Routes>
  );
}
