import axios from 'axios';


const updateSeen = async (notifId: string) => {

  await axios({
    method: 'PUT',
    url: 'http://localhost:5000/api/notification/seen',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { notifId }
  });

}

const updateUnseen = async (notifId: string) => {

  await axios({
    method: 'PUT',
    url: 'http://localhost:5000/api/notification/unseen',
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
