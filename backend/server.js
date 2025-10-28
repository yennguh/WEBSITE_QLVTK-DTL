import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('Server bắt đầu chạy trên cổng 3000');
});