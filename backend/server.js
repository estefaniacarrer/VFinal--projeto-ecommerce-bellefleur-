import express from 'express';
import cors from 'cors';
import path from 'path';
import produtoRoutes from './src/routes/produtoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(express.json())
app.use(express.static('public'))

app.use("/", express.static(path.resolve("../frontend")))

app.use(cors())

app.use('/produto', produtoRoutes)
app.use('/user', userRoutes)

//app.listen(5000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});

export default app;