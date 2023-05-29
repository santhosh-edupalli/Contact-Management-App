import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import ContactCard from './ContactCard';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);

  return (
    <div>
      {contacts.length === 0 ? (
        <>
        <div className="text-center mt-40">
          <p className="font-sans">No contacts found. Please add a contact from the Create New Contact button.</p>
        </div>
        <div className="text-center mt-4">
          <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Contact
          </Link>
        </div>
        </>
      ) : (
        <>
        <div className="w-6/6 text-center mt-4">
          <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Contact
          </Link>
        </div>
        <div className='flex flex-row'>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default ContactList;
