import express from 'express';
import { db } from '../database/connection.js';

export function setupTagRoutes(app: express.Application) {
  // Get all tags
  app.get('/api/tags', async (req, res) => {
    try {
      console.log('Fetching all tags');
      
      const tags = await db.selectFrom('tags')
        .selectAll()
        .orderBy('name', 'asc')
        .execute();

      console.log(`Retrieved ${tags.length} tags`);
      res.json(tags);
      return;
    } catch (error) {
      console.error('Error fetching tags:', error);
      res.status(500).json({ error: 'Failed to fetch tags' });
      return;
    }
  });

  // Create new tag
  app.post('/api/tags', async (req, res) => {
    try {
      const { name, color, description } = req.body;
      console.log('Creating new tag:', { name, color, description });
      
      const result = await db.insertInto('tags')
        .values({
          name,
          color: color || '#6B7280',
          description
        })
        .returning('id')
        .executeTakeFirst();

      console.log(`Created tag with ID: ${result?.id}`);
      res.json({ id: result?.id, success: true });
      return;
    } catch (error) {
      console.error('Error creating tag:', error);
      res.status(500).json({ error: 'Failed to create tag' });
      return;
    }
  });

  // Update tag
  app.patch('/api/tags/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, color, description } = req.body;
      
      console.log(`Updating tag ${id}:`, req.body);

      await db.updateTable('tags')
        .set({ name, color, description })
        .where('id', '=', Number(id))
        .execute();

      console.log(`Updated tag ${id}`);
      res.json({ success: true });
      return;
    } catch (error) {
      console.error('Error updating tag:', error);
      res.status(500).json({ error: 'Failed to update tag' });
      return;
    }
  });

  // Delete tag
  app.delete('/api/tags/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Deleting tag ${id}`);
      
      await db.deleteFrom('tags')
        .where('id', '=', Number(id))
        .execute();

      console.log(`Deleted tag ${id}`);
      res.json({ success: true });
      return;
    } catch (error) {
      console.error('Error deleting tag:', error);
      res.status(500).json({ error: 'Failed to delete tag' });
      return;
    }
  });
}
