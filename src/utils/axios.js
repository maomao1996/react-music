import axios from 'axios'

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
})

request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response
    }
  },
  error => Promise.reject(error)
)

export default request
