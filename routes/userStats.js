const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 🔹 Endpoint públic per obtenir estadístiques generals sense autenticació
router.get("/public", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        COUNT(*)::INTEGER AS total_trainings, 
        COALESCE(SUM(EXTRACT(EPOCH FROM duracion))::INTEGER, 0) AS total_seconds, 
        COALESCE(SUM(calorias_quemadas), 0) AS total_calories, 
        COALESCE(AVG(frecuencia_cardiaca_media), 0)::INTEGER AS avg_heart_rate
      FROM progreso_entrenamientos`
    );

    // 🔹 Convertir segons a hores i minuts
    const totalSeconds = result.rows[0].total_seconds || 0;
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalTimeFormatted = `${totalHours}h ${totalMinutes}m`;

    res.json({
      total_trainings: result.rows[0].total_trainings,
      total_time: totalTimeFormatted,
      total_calories: result.rows[0].total_calories,
      avg_heart_rate: result.rows[0].avg_heart_rate
    });

  } catch (error) {
    console.error("❌ Error obtenint estadístiques públiques:", error);
    res.status(500).json({ error: "❌ Error obtenint les estadístiques públiques." });
  }
});

module.exports = router;
