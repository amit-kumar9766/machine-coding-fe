import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: 0, firstName: '', lastName: '' });
  const [selectedUser, setSelectedUser] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFirstChange = (e) => {
    setUser((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const handleSecondChange = (e) => {
    setUser((prev) => ({ ...prev, lastName: e.target.value }));
  };

  const handleCreate = () => {
    setUsers([...users, { id: new Date(), ...user }]);
    setUser({ id: 0, firstName: null, lastName: null });
  };
  console.log(user);

  const handleDelete = () => {
    const selectedFromUsers = users.filter((a) => a.id !== selectedUser?.id);
    setUsers(selectedFromUsers);
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);

    setUser({
      id: selectedUser.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
    });
  };

  const handleUpdate = () => {
    const usersleft = users.filter((u) => u?.id !== user?.id);
    setUsers([...usersleft, { ...user }]);
  };

  const newUsers = [...users].filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ width: '100%', display: 'flex' }}>
        <div
          style={{
            width: '200px',
            border: '1px solid black',
            height: '200px',
            marginTop: '5px',
          }}
        >
          {newUsers.map((u) => {
            return (
              <div id={u?.firstName} onClick={() => handleUserSelect(u)}>
                {u?.firstName} {u?.lastName}
              </div>
            );
          })}
        </div>

        <div>
          <div>
            <label htmlFor="html">FirstName</label>
            <br />
            <input
              onChange={handleFirstChange}
              id="firstName"
              value={user?.firstName || ''}
            />
          </div>
          <div>
            <label htmlFor="html">LastName</label>
            <br />
            <input
              onChange={handleSecondChange}
              id="lastName"
              value={user?.lastName || ''}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleCreate}
          disabled={!user?.firstName || !user?.lastName}
        >
          Create
        </button>
        <button disabled={!selectedUser} onClick={() => handleUpdate()}>
          Update
        </button>
        <button disabled={!selectedUser} onClick={() => handleDelete()}>
          Delete
        </button>
        <button
          disabled={!selectedUser}
          onClick={() => {
            setSelectedUser();
            setUser({ id: 0, firstName: '', lastName: '' });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
