import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Contact } from '../../types';
import { deleteContact } from '../../redux/actions';
import { FiInfo } from 'react-icons/fi';

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact));
    setShowConfirmation(false);
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const toggleStatus = () => {
    setShowStatus(!showStatus);
  };

  return (
    <div className="border border-gray-300 p-4 my-4 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{`${contact.firstName} ${contact.lastName}`}</h3>
        {showStatus && <p>Status: {contact.status}</p>}
      </div>
      <div>
        <Link to={`/edit/${contact.id}`} className="mr-2 text-blue-500 hover:text-blue-700">
          Edit
        </Link>
        <button onClick={toggleConfirmation} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
      <div onMouseEnter={toggleStatus} onMouseLeave={toggleStatus}>
        <FiInfo size={20} className="text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure you want to delete this contact?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={toggleConfirmation}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
