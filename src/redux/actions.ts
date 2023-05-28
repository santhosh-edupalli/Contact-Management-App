import { Contact } from "../types";

// Define action types
export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

// Define action creators
export const addContact = (contact: Contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact: Contact) =>({
    type: EDIT_CONTACT,
    payload: contact
})

export const deleteContact = (contact: Contact) => ({
    type: DELETE_CONTACT,
    payload: contact
})