import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
import BACKEND_URL from './../constants/backendUrl.constant';


const createFollow = async (followingId: string) => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/follow/create`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { followingId }
  });

}

const deleteFollow = async (followingId: string) => {

  await axios({
    method: 'DELETE',
    url: `${ BACKEND_URL }/api/follow/delete`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { followingId }
  });

}


export { createFollow, deleteFollow }
