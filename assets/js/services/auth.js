import { post } from './fetchUtil';

const service = {
  login(email, password) {
    return post('/api/auth/login', { email, password })
      .then(response => response.json())
  },
  register(firstName, lastName, email, phone, password) {
    const payload = { firstName, lastName, email, phone, password };

    return post('/api/auth/register', payload)
      .then(response => response.json())
  },
  sync(name, email, id) {
    return (loginResponse) => {
      if (loginResponse.success) {
        return loginResponse;
      }

      const [firstName, lastName] = name.split(' ');

      return this
        .register(firstName, lastName, email, null, id);
    };
  }
}

export default service;
