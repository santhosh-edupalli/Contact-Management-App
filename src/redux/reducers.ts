import { combineReducers } from 'redux';
import { ADD_CONTACT, EDIT_CONTACT } from './actions';
import { Contact, ContactAction } from '../types';

const contactsReducer = (state: Contact[] = [], action: ContactAction) => {
  switch (action.type) {
    case ADD_CONTACT:
        return [...state, action.payload];
    case EDIT_CONTACT:
        const updatedContactIndex = state.findIndex((contact) => contact.id === action.payload.id);
        if (updatedContactIndex !== -1) {
            const updatedState = [...state];
            updatedState[updatedContactIndex] = action.payload;
            return updatedState;
        }
        return state;
    case 'DELETE_CONTACT':
        return state.filter((contact) => contact.id !== action.payload.id);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
