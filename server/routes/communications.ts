import express from 'express';
import { db } from '../database/connection.js';

export function setupCommunicationRoutes(app: express.Application) {
  // Get all communications with optional filters
  app.get('/api/communications', async (req, res) => {
    try {
      console.log('Fetching communications with filters:', req.query);
      
      let query = db.selectFrom('communication_logs')
        .leftJoin('communication_tags', 'communication_logs.id', 'communication_tags.communication_id')
        .leftJoin('tags', 'communication_tags.tag_id', 'tags.id')
        .select([
          'communication_logs.id',
          'communication_logs.type',
          'communication_logs.from_address',
          'communication_logs.to_address',
          'communication_logs.subject',
          'communication_logs.content',
          'communication_logs.timestamp',
          'communication_logs.status',
          'communication_logs.priority',
          'communication_logs.duration',
          'communication_logs.file_path',
          'communication_logs.metadata'
        ])
        .groupBy('communication_logs.id')
        .orderBy('communication_logs.timestamp', 'desc');

      // Apply filters
      if (req.query.type) {
        query = query.where('communication_logs.type', '=', req.query.type as string);
      }
      if (req.query.status) {
        query = query.where('communication_logs.status', '=', req.query.status as string);
      }
      if (req.query.priority) {
        query = query.where('communication_logs.priority', '=', req.query.priority as string);
      }

      const communications = await query.execute();
      
      // Get tags for each communication
      const communicationsWithTags = await Promise.all(
        communications.map(async (comm) => {
          const tags = await db.selectFrom('communication_tags')
            .innerJoin('tags', 'communication_tags.tag_id', 'tags.id')
            .select(['tags.id', 'tags.name', 'tags.color'])
            .where('communication_tags.communication_id', '=', comm.id)
            .execute();
          
          return { ...comm, tags };
        })
      );

      console.log(`Retrieved ${communicationsWithTags.length} communications`);
      res.json(communicationsWithTags);
      return;
    } catch (error) {
      console.error('Error fetching communications:', error);
      res.status(500).json({ error: 'Failed to fetch communications' });
      return;
    }
  });

  // Create new communication log
  app.post('/api/communications', async (req, res) => {
    try {
      console.log('Creating new communication:', req.body);
      
      const { type, from_address, to_address, subject, content, priority, duration, metadata, tags } = req.body;
      
      const result = await db.insertInto('communication_logs')
        .values({
          type,
          from_address,
          to_address,
          subject,
          content,
          priority: priority || 'normal',
          duration,
          metadata: metadata ? JSON.stringify(metadata) : null
        })
        .returning('id')
        .executeTakeFirst();

      const communicationId = result?.id;
      
      // Add tags if provided
      if (tags && tags.length > 0 && communicationId) {
        for (const tagId of tags) {
          await db.insertInto('communication_tags')
            .values({
              communication_id: communicationId,
              tag_id: tagId
            })
            .execute();
        }
      }

      console.log(`Created communication with ID: ${communicationId}`);
      res.json({ id: communicationId, success: true });
      return;
    } catch (error) {
      console.error('Error creating communication:', error);
      res.status(500).json({ error: 'Failed to create communication' });
      return;
    }
  });

  // Update communication status
  app.patch('/api/communications/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status, priority, tags } = req.body;
      
      console.log(`Updating communication ${id}:`, req.body);

      const updateData: any = {};
      if (status) updateData.status = status;
      if (priority) updateData.priority = priority;

      if (Object.keys(updateData).length > 0) {
        await db.updateTable('communication_logs')
          .set(updateData)
          .where('id', '=', Number(id))
          .execute();
      }

      // Update tags if provided
      if (tags !== undefined) {
        // Remove existing tags
        await db.deleteFrom('communication_tags')
          .where('communication_id', '=', Number(id))
          .execute();
        
        // Add new tags
        if (tags.length > 0) {
          for (const tagId of tags) {
            await db.insertInto('communication_tags')
              .values({
                communication_id: Number(id),
                tag_id: tagId
              })
              .execute();
          }
        }
      }

      console.log(`Updated communication ${id}`);
      res.json({ success: true });
      return;
    } catch (error) {
      console.error('Error updating communication:', error);
      res.status(500).json({ error: 'Failed to update communication' });
      return;
    }
  });

  // Delete communication
  app.delete('/api/communications/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Deleting communication ${id}`);
      
      await db.deleteFrom('communication_logs')
        .where('id', '=', Number(id))
        .execute();

      console.log(`Deleted communication ${id}`);
      res.json({ success: true });
      return;
    } catch (error) {
      console.error('Error deleting communication:', error);
      res.status(500).json({ error: 'Failed to delete communication' });
      return;
    }
  });
}
