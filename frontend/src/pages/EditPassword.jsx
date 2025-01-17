import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPassword = () => {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5555/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setService(res.data.service);
        setUsername(res.data.username);
        setPassword(res.data.password); 
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred while fetching the password. Please check the console.');
        console.error(error);
      });
  }, [id]);

  const handleEditPassword = () => {
    const data = {
      service,
      username,
      password, 
    };
    setLoading(true);
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:5555/passwords/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLoading(false);
        navigate('/user');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred while updating the password. Please check the console.');
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/user'/>
      <h1 className='text-3xl my-4'>Edit Password</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Service</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditPassword}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPassword;
