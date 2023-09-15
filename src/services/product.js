import axios from 'axios'
const baseUrl = `http://localhost:4002/api/v1/`

const getAll = () => {
  const request = axios.get(`${baseUrl}/product`)
  return request.then(response => response.data)
}

const scrape_url = newObject => {
  return axios.post(`${baseUrl}/scrape`, newObject)
}

const exportedObject = {
  getAll,
  scrape_url
}

export default exportedObject