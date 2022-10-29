import Cookies from 'js-cookie'
import qs from 'qs'

const BASEAPI = '';

const apiFetchPost = async (endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if (json.notallowed) {
       window.location.href = '/signin'; 
       return;
    }
    return json;
}
const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    if (json.notallowed) {
       window.location.href = '/signin'; 
       return;
    }
    return json;
}
const shopAPI = {
    login: async(email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {
                email,
                password
            }
        );
        return json;
    },
    register: async(name, stateLoc, email, password) => {
        const json = await apiFetchPost(
            '/user/signup',
            {
              name,
              state: stateLoc,
              email,
              password 
            }
        );
        return json;
    },
    getState: async() => {
      const json = await apiFetchGet(
        '/states'
        );
        return json.states;
    },
    getCategories: async() => {
        const json = await apiFetchGet(
        '/categories'
        );
        return json.categories;
    },
    getAds: async(options) => {
        const json = await apiFetchGet(
            'ad/list',  
             options
        );
        return json;
    }
};
export default () => shopAPI;