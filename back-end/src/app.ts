import express from 'express';
import { sequelize } from './models';
import authRoutes from './routes/authRoutes'; // authRoutes'u import edin
import activityRoutes from './routes/activityRoutes'; // activityRoutes'u import edin

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Veritabanı bağlantısı başarılı ve tablolar senkronize edildi.");
}).catch((error) => {
  console.error("Veritabanı senkronizasyon hatası:", error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
