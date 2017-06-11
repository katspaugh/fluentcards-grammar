const apiUrl = 'https://e33zq7nat7.execute-api.eu-west-1.amazonaws.com/dev';

let userData = null;

export default class User {
  static get() {
    return userData;
  }

  static save(data) {
    userData = data;
    return localStorage.setItem('user', JSON.stringify(data));
  }

  static restore() {
    const saved = JSON.parse(localStorage.getItem('user'));
    if (saved) userData = saved;
    return saved;
  }

  static requestToken(code, csrf) {
    return fetch(new Request(`${ apiUrl }/auth`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ code, csrf })
    }))
      .then(resp => resp.json());
  }

  static requestAppId() {
    return fetch(new Request(`${ apiUrl }/credentials`, { mode: 'cors' }))
      .then(resp => resp.json());
  }

  static updateScore(scores) {
    return fetch(new Request(`${ apiUrl }/scores`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data)
    }))
      .then(resp => resp.json());
  }
}
