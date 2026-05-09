import express from 'express';
import cors from 'cors';
import {
  seedAchievements,
  seedEvidences,
  organizations,
  curators,
  mentors,
} from './data.js';

const app = express();
app.use(cors());
app.use(express.json());

let achievements = [...seedAchievements];
const signupRequests = [];

app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth — toy login: accepts any email/password, returns a fixed user
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }
  res.json({
    id: '1',
    name: 'Liliana Torres',
    email,
    role: 'Senior Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  });
});

app.post('/auth/signup', (req, res) => {
  const { name, email, password, role, interest } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, password required' });
  }
  signupRequests.push({ name, email, role, interest, requestedAt: new Date().toISOString() });
  res.status(201).json({ ok: true });
});

// Achievements
app.get('/achievements', (_req, res) => {
  res.json(achievements);
});

app.post('/achievements', (req, res) => {
  const body = req.body ?? {};
  const created = {
    id: Date.now().toString(),
    title: body.title ?? '',
    description: body.description ?? '',
    type: body.type ?? 'other',
    date: body.date ?? new Date().toISOString().split('T')[0],
    status: body.status ?? 'raw',
    curatedBy: body.curatedBy,
    evidences: body.evidences ?? [],
    notes: body.notes,
    featured: body.featured ?? false,
  };
  achievements = [created, ...achievements];
  res.status(201).json(created);
});

app.patch('/achievements/:id', (req, res) => {
  const idx = achievements.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  achievements[idx] = { ...achievements[idx], ...req.body };
  res.json(achievements[idx]);
});

// Evidences
app.get('/evidences', (_req, res) => res.json(seedEvidences));

// Network
app.get('/network/organizations', (_req, res) => res.json(organizations));
app.get('/network/curators', (_req, res) => res.json(curators));
app.get('/network/mentors', (_req, res) => res.json(mentors));

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`alixy-backend listening on http://localhost:${PORT}`);
});
