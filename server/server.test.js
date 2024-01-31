import request from "supertest";
import app from "./server.js";

describe('GET /api/products', () => {
    it('responds with JSON containing a list of products', async () => {
      const response = await request(app).get('/api/products');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toBeInstanceOf(Array);
    });
});

describe('POST /api/order', () => {
    it('responds with a success message after adding orders to the database', async () => {
      const response = await request(app)
        .post('/api/order')
        .send({ order: [{ id: 1, qty: 2 }, { id: 2, qty: 3 }] });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Order added into database.');
    });
});