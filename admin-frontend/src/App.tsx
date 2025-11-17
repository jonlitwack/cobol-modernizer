import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Customers } from './pages/Customers';
import { Accounts } from './pages/Accounts';
import { Cards } from './pages/Cards';
import { Transactions } from './pages/Transactions';
import { DisclosureGroups } from './pages/DisclosureGroups';
import { TransactionTypes } from './pages/TransactionTypes';
import { TransactionCategories } from './pages/TransactionCategories';
import { Reports } from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="customers" element={<Customers />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="disclosure-groups" element={<DisclosureGroups />} />
          <Route path="transaction-types" element={<TransactionTypes />} />
          <Route path="transaction-categories" element={<TransactionCategories />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
