import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import { Server } from "socket.io";
import http from "http";
import { socketHandler } from "./utils/socket.js";

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración de handlebars
app.engine('hbs', handlebars.engine({
  extname: "hbs",
  defaultLayout: "main"
}));
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

// Rutas
app.use('/', viewsRoutes);

// Crear servidor HTTP y WebSocket
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Manejar la conexión de socket
socketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
