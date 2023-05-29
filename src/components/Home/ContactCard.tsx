import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Contact } from '../../types';
import { deleteContact } from '../../redux/actions';
import { FiEdit, FiTrash, FiInfo } from 'react-icons/fi';

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact));
    setShowConfirmation(false);
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <div className="contact-card bg-white rounded-lg shadow-lg p-4 my-4 flex flex-col justify-between content-center w-2/6 m-1">
      <div>
        <h3 className="text-xl uppercase">{`${contact.firstName} ${contact.lastName}`}</h3>
        <p className={`text-lg uppercase ${contact.status === 'active' ? 'text-green-500' : 'text-red-500'}`}> {contact.status}</p>
      </div>
      <div className="flex mt-10 mb-10 justify-around">
        <FiEdit
          size={20}
          className="text-blue-500 hover:text-blue-700 cursor-pointer mr-2"
          onClick={() => {navigate(`/edit/${contact.id}`)}}
        />
        <FiTrash
          size={20}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          onClick={toggleConfirmation}
        />
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
