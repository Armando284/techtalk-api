import express from 'express';
// import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000

app.use(logger('dev'));
app.use(express.json()); // middleware for post methods body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(join(__dirname, 'public')));

app.use('/', (req, res) => {
  res.send("Hello, World!")
});

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})
