import { useEffect, useState } from 'react'
import Card from './components/Card'
import axios from 'axios'

const App = () => {

  const [user, setUser] = useState([]);
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  function userFetch() {
    axios.get('https://fullstack-trial.onrender.com/api/users')
   .then(res => {
    setUser(res.data.userFetched);
   })
   .catch(()=>{
    alert("Something went wrong on data fetching of users...")
   })
  }

  useEffect(()=>{
    userFetch();
  }, []);

  function handleSubmit(e){

    e.preventDefault();

    axios.post('https://fullstack-trial.onrender.com/api/users', {
    name: name,
    age: age
  }) 
  .then(()=>{
    userFetch();

     setName('');
     setAge('');
  })
  .catch(()=>{
    alert("Something went wrong on post side...")
   })
  
}

function delFun(id) {
  axios.delete('https://fullstack-trial.onrender.com/api/users/'+id)
  .then(()=>{
    userFetch();
  })
  .catch(()=>{
    alert("Something went wrong on delete function...")
   })
}

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter your name' required />
        <input type="text" value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder='Enter your age' required />
        <input type="submit" value="Submit" />
      </form>

      <div className='cont'>
        {user.map((val)=>{
          return  <div className='card' key={val._id}>
          <h1>{val.name}</h1>
          <h2>{val.age}</h2>
          <button className='delete' onClick={()=>{delFun(val._id)}}>Delete</button>
      </div>
      })}
     </div>
    </div>
  )
}

export default App