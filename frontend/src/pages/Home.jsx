import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPasswords = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5555/passwords', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPasswords(response.data);
      } catch (error) {
        console.error('Error fetching passwords:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPasswords();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div className='p-4'>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Logout
      </button>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Saved Passwords</h1>
        <Link to='/user/passwords/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Service</th>
              <th className='border border-slate-600 rounded-md'>Username</th>
              <th className='border border-slate-600 rounded-md'>Password</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
    
          <tbody>
            {passwords.map((password, index) => (
              <tr key={password._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {password.service}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {password.username}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {password.password}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/user/passwords/details/${password._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/user/passwords/edit/${password._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/user/passwords/delete/${password._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  );
};

export default Home;
