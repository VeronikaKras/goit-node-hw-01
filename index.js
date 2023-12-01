const fs = require('fs/promises');
const path = require('path');
const argv = require('yargs').argv;


const contactsModule = require('./contacts');

const { listContacts, getContactById, removeContact, addContact } = contactsModule;

(async () => {
  try {
    const allContacts = await listContacts();
    console.table('All Contacts:', allContacts);

    const contactById = await getContactById('any-id');
    console.log('Contact by ID:', contactById);

    const newContact = await addContact('Bill Bon', 'bon@example.com', '12344321');
    console.log('New Contact:', newContact);

    const removedContact = await removeContact('any-id');
    console.log('Removed Contact:', removedContact);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();




function invokeAction({ action, id, name, email, phone }) {
  const { listContacts, getContactById, removeContact, addContact } = contactsModule;

  switch (action) {
    case 'list':
      listContacts().then((contacts) => console.log('All Contacts:', contacts));
      break;

    case 'get':
      getContactById(id).then((contact) => console.log('Contact by ID:', contact));
      break;

    case 'add':
      addContact(name, email, phone).then((newContact) => console.log('New Contact:', newContact));
      break;

    case 'remove':
      removeContact(id).then((removedContact) => console.log('Removed Contact:', removedContact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
