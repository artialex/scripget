import fetch from 'isomorphic-fetch'

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://jsonplaceholder.typicode.com'
  : 'http://localhost:3000'
const endpoint = (args) => API_URL + args[0]

export function fetchUsers(cb) {
  return fetch(endpoint`/users`)
    .then(_ => _.json())
    .then(_ => _.map(user => ({ name: user.name, value: user.id })))
    .then(cb)
    .catch(err => console.error('Error fetching users'))
}
