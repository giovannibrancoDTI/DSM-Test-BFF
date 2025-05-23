import express from "express";
import router from "./routes";
import cors from "cors";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
