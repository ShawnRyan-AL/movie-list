import { TMDB_API_KEY } from "./tmdb-api-constants";

let sessionId

export default async function FetchUtil({ fetchURL, method, body, requestParams = {}, testParam = true }) {
  try {
    if (!sessionId && sessionStorage.getItem('session_id')) {
      sessionId = sessionStorage.getItem('session_id')
    }

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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(fullURL, { method, body, headers: myHeaders });
    return await res.json();

  } catch (error) {
    console.error(error);
  }
}