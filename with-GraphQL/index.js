// require('isomorphic-fetch');

const request = () => {
  return fetch('http://dev.clinic.api.healthydeer.com/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: 'query{   doctors {     edges {       node {         id         realName       }     }   } }'
      })
    }
  )
    .then(response => response.json())
    .catch(err => console.log('err', err))
}

const result = request()
