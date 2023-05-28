import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, Contact, Status } from '../../types';
import { updateContact } from '../../redux/actions';


const EditContact: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = useSelector((state: RootState) =>
    state.contacts.find((contact: { id: string | undefined; }) => contact.id === id)
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<Status>('' as Status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      const updatedContact: Contact = {
        ...contact,
        firstName,
        lastName,
        status,
      };
      dispatch(updateContact(updatedContact));
      navigate('/');
    }
  };

  if (!contact) {
    return <div>Contact not found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
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
            <label htmlFor="active" className="mr-2">
              <input
                type="radio"
                id="active"
                value="active"
                checked={status === 'active'}
                onChange={(e) => setStatus(e.target.value as Status)}
              />
              Active
            </label>
            <label htmlFor="inactive">
              <input
                type="radio"
                id="inactive"
                value="inactive"
                checked={status === 'inactive'}
                onChange={(e) => setStatus(e.target.value as Status)}
              />
              Inactive
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditContact;
