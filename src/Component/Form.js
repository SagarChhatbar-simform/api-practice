import React, { useEffect, useState } from 'react'
import { api } from '../App'

function Form(props) {
  const [users, setusers] = useState([]);


  const getUsers = () => { api.get('/').then(res => setusers(res.data)).catch(err => { console.log(err) }) }

  useEffect(() => {
    getUsers()
  }, [])


  async function submithandler(e) {
    e.preventDefault()
    const fn = e.target.first_name.value;
    const ln = e.target.last_name.value;
    const mail = e.target.email.value;
    let i = Math.random();
    if(fn === ''){
      console.log('enter something')
    }
    else{
      await api.post('/', { id: i, first_name: fn, last_name: ln, email: mail }).catch(err => console.log(err))
      console.log(users)
      getUsers()
      props.func(users)
    }
   
  }



  return (
    <div>
      <form onSubmit={submithandler}>
        <input type='text' placeholder='first name' name='first_name' />
        <input type='text' placeholder='last name' name='last_name' />
        <input type='email' placeholder='email' name='email' />
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default Form