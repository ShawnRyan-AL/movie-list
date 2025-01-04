import { TMDB_API_KEY } from "./tmdb-api-constants";

let sessionId

export default async function FetchUtil({ fetchURL, method, body, requestParams = {}, testParam = true }) {
  try {
    if (!sessionId && sessionStorage.getItem('session_id')) {
      sessionId = sessionStorage.getItem('session_id')
      // console.log('fetchutil if statement')
    }
    // console.log('fetchutil session id: ' + sessionId);
    // console.log(fetchURL);
    // console.log(method);
    // console.log(body);
    let params = {
      ...requestParams,
    }

    if (testParam) {
      params = {
        ...requestParams,
        'api_key': TMDB_API_KEY,
        'session_id': sessionId,
      }
    }

    let stringifiedParams = ''

    if (Object.keys(params).length != 0) {
      stringifiedParams = `?${new URLSearchParams(params)}`
    }

    const fullURL = `${fetchURL}${stringifiedParams}`
    // console.log('fullurl: ' + fullURL);
    // console.log(new URLSearchParams({ 'session_id': sessionId }));
    // console.log(new URLSearchParams({ 'session_id': sessionId }).toString());

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(fullURL, { method, body, headers: myHeaders });
    return await res.json();

  } catch (error) {
    console.error(error);
  }
}