import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
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
            <div className="w-1/6 bg-gray-200 pt-10">
              <ul>
                <li className="p-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-blue-500 hover:text-blue-700 hover:text-xl ${isActive ? "text-xl text-blue-900 underline" : "text-lg"}`
                    }
                  >
                    <p className="font-sans">Home</p>
                  </NavLink>
                </li>
                <li className="p-4">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `text-blue-500 hover:text-blue-700 hover:text-xl ${isActive ? "text-xl text-blue-900 underline" : "text-lg"}`
                    }
                  >
                    <p className="font-sans">Dashboard</p>
                  </NavLink>
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
