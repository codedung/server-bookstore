import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import api from "./routes/api.routes";

const app: Express = express();
const { PORT } = process.env;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

app.listen(PORT, () => console.log(`PORT ${PORT} 접속`));
