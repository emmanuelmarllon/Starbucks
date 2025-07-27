import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import produtosRoute from "./routes/produtos.js";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint clima
app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_KEY;

  if (!lat || !lon)
    return res.status(400).json({ error: "Latitude e longitude obrigatórias" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
    );

    const { temp } = response.data.main;
    const city = response.data.name;

    res.json({ temperatura: temp, cidade: city });
  } catch (error) {
    console.error("Erro ao buscar clima:", error.message);
    res.status(500).json({ error: "Erro ao buscar clima" });
  }
});

app.use("/produtos", produtosRoute);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
