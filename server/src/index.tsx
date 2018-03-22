import * as http from 'http';
import app from './App';

const port = process.env.PORT || 3000

const server = http.createServer(app);
app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Server is listening on ${port}`)
})