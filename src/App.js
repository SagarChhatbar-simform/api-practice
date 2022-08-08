import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './Component/Form';


export const api = axios.create({
  baseURL: `http://localhost:3000/users`
})



function App() {
  const [users, setusers] = useState([]);
  const getUsers = () => { api.get('/').then(res => setusers(res.data)).catch(err => { console.log(err) }) }

  const user_data = (data) => {
    console.log(data)
    getUsers()
  }



  useEffect(() => {
    getUsers()

  }, [])

  const deleteUser = async (id) => {
    await api.delete(`/${id}`)
    getUsers()
  }

  const updateUser = async (id, val) => {
    await api.patch(`/${id}`, { first_name: val })
    getUsers()
  }



  return (
    <div className="App">
      {users?.map(user =>
        <div key={user.id} style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 onClick={() => updateUser(user.id, `${user.first_name}Clicked`)}>
            {user.first_name}
          </h2>
          <button onClick={() => deleteUser(user.id)}>X</button>
        </div>
      )}
      <Form func={user_data} />

    </div>
  );
}

export default App;
