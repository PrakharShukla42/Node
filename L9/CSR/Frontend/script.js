let url = 'http://localhost:5000/todos'
fetch(url, { mode: "cors" })
  .then((response) => response.json())
  .then((data) => console.log(data))
