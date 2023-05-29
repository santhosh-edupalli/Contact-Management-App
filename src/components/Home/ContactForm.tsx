import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { Contact, Status } from '../../types';

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<Status>('' as Status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact :Contact = {
      id: uuid(),
      firstName,
      lastName,
      status,
    };
    dispatch(addContact(newContact));
    navigate('/');
  };

  return (
    <div className='flex justify-center mt-20'>
      <div>
      <p className="text-xl font-bold mb-4">Create New Contact</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-300 rounded w-full py-2 px-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-300 rounded w-full py-2 px-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <div>
            <label htmlFor="active" className="mr-8">
              <input
                type="radio"
                id="active"
                value="active"
                checked={status === 'active'}
                onChange={(e) => setStatus(e.target.value as Status)}
              />
              &nbsp;Active
            </label>
            <label htmlFor="inactive">
              <input
                type="radio"
                id="inactive"
                value="inactive"
                checked={status === 'inactive'}
                onChange={(e) => setStatus(e.target.value as Status)}
              />
              &nbsp;Inactive
            </label>
          </div>
        </div>
        <div className="mb-4 flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ContactForm;
