import axios from './http'
export const test = async () => {
  const { data } = await axios.get('/home')
  console.log(data);
}