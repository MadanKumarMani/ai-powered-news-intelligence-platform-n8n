import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM articles
      ORDER BY id DESC
      LIMIT 20
    `)

    return Response.json(result.rows)
  } catch (error) {
    return Response.json({ error: error.message })
  }
}