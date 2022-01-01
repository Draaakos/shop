const post = (url, data = {}) => fetch(url, {
  method: 'POST',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

const get = (url) => fetch(url, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});

const put = (url, data = {}) => fetch(url, {
  method: 'PUT',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export { post, get, put };
