const express = require('express');
const app = new express();

const port = 8000;

app.get('/', (request, response)=>{
  response.send('<h1>Hello NodeJS</h1>');
})
app.listen(port, () => {
  console.log('Server is running on port 8000');
})