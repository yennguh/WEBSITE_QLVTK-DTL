import express from "express";
import taskRouter from "./routes/tasksRouters.js";

const app = express();

app.use("/api/tasks",taskRouter);

app.listen(3000, () => {
  console.log('Server bắt đầu chạy trên cổng 3000');
});

