import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = 'https://diplomna-backend.onrender.com';


const updateSeen = async (notifId: string) => {

  await axios({
    method: 'PUT',
    url: `${ BACKEND_URL }/api/notification/seen`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { notifId }
  });

}

const updateUnseen = async (notifId: string) => {

  await axios({
    method: 'PUT',
    url: `${ BACKEND_URL }/api/notification/unseen`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { notifId }
  });

}


export {
  updateSeen,
  updateUnseen
}
