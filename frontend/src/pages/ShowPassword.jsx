import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowPassword = () => {
  const [password, setPassword] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/passwords/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      })
      .then((res) => {
        setPassword(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton destination='/user'/>
      <h1 className="text-3xl my-4">Show Password</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Service</span>
            <span>{password.service}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Username</span>
            <span>{password.username}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Password</span>
            <span>{password.password}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(password.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(password.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPassword;
