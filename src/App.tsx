import { useState } from 'react';
import initialContacts  from './contacts.json';

import './App.css';

interface Contact {
  id: string;
  name: string;
  pictureUrl: string;
  popularity: number;
  wonOscar: boolean;
  wonEmmy: boolean;
}

function App() {
  const [contactsState, setContacts] = useState<Contact[]>(initialContacts.slice(0, 5));

  const addRandomContact = () => {
    const notInState = initialContacts.filter(contact => 
      !contactsState.some(stateContact => stateContact.id === contact.id)
    );

    if (notInState.length > 0) {
      const randomContact = notInState[Math.floor(Math.random() * notInState.length)];
      setContacts([...contactsState, randomContact]);
    }
  };

  const sortByPopularity = () => {
    const sortByPop = [...contactsState].sort((a, b) => b.popularity - a.popularity); 
    setContacts(sortByPop);
  };

  const sortByName = () => {
    const nameSorted = [...contactsState].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(nameSorted);
  };

  const Delete = (id: string) => {
    const list = contactsState.filter(one => one.id !== id);
    setContacts(list);
  };

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact}>Add random</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactsState.map((contact) => (
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} style={{ height: '100px' }} alt={contact.name} /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? 'Yes' : 'No'}</td>
              <td>{contact.wonEmmy ? 'Yes' : 'No'}</td>
              <td><button onClick={() => Delete(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
