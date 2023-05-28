import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard/Dashboard';
import ContactForm from './components/Home/ContactForm';
import ContactList from './components/Home/ContactList';
import EditContact from './components/Home/EditContact';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className="flex h-screen">
            <div className="w-1/6 bg-gray-200 p-4">
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-blue-500 hover:text-blue-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-5/6 p-4">
              <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/create" element={<ContactForm />} />
                <Route path="/edit/:id" element={<EditContact />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
