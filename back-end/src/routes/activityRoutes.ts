// src/routes/activityRoutes.ts
import express from 'express';
import * as activityController from '../controller/activityController';
import { adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

// Sadece adminler tarafından erişilebilir
router.post('/activity', adminOnly, activityController.createActivity);
router.delete('/activity/:id', adminOnly, activityController.deleteActivity);
router.put('/activity/:id', adminOnly, activityController.updateActivity);
router.get('/activities/:id', adminOnly, activityController.getActivityById);

// Tüm kullanıcılar tarafından erişilebilir
router.get('/activities', activityController.getAllActivities);

export default router;
