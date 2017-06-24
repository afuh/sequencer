import axios from 'axios'

const call = () => axios({
  method: 'get',
  url: 'https://raw.githubusercontent.com/afuh/sequencer/master/assets/Large%20Long%20Echo%20Hall.wav',
  responseType: 'arraybuffer'
  })
  .then(res => res)
  .catch(err => console.log(err))

export default call
