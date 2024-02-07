import axios from 'axios';


const createFollow = async (followingId: string) => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/follow/create',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { followingId }
  });

}

const deleteFollow = async (followingId: string) => {

  await axios({
    method: 'DELETE',
    url: 'http://localhost:5000/api/follow/delete',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { followingId }
  });

}


export { createFollow, deleteFollow }
