


fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2aa3c6dc8b4575cb4b74b946ab3f376f')
  .then(res => res.json())
  .then(data => console.log(data))


