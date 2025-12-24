const request = require('supertest');
const app = require('./app');

describe('Express API Tests', () => {
  
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.name).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('POST /api/users', () => {
    it('should create new user', async () => {
      const newUser = { name: 'Test User', email: 'test@example.com' };
      const res = await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
      expect(res.body.id).toBeDefined();
    });

    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test User' });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Name and email are required');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update existing user', async () => {
      const updateData = { name: 'Updated Name' };
      const res = await request(app)
        .put('/api/users/1')
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(updateData.name);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .put('/api/users/999')
        .send({ name: 'Test' });
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete existing user', async () => {
      const res = await request(app).delete('/api/users/2');
      expect(res.status).toBe(204);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).delete('/api/users/999');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });
});