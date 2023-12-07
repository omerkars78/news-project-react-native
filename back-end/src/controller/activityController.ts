import { Request, Response } from 'express';
import { Activity } from '../models/Activity';

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { topic, content, validityDate, userId, type, image ,title} = req.body;
    const newActivity = await Activity.create({
      topic,
      title,
      content,
      validityDate,
      userId,
      type,
      image
    });

    res.status(201).json({ message: "Activity has been added succsessfully", activity: newActivity });
  } catch (error) {
    res.status(500).json({ error: "Any error occourred" });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: "No activy found" });
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Any delete error" });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { topic, content, validityDate, type, image ,title} = req.body;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: "No activity found" });
    }
    activity.title = title;
    activity.topic = topic;
    activity.content = content;
    activity.validityDate = validityDate;
    activity.type = type;
    activity.image = image;
    await activity.save();

    res.status(200).json({ message: "Activity updated succsessfully", activity });
  } catch (error) {
    res.status(500).json({ error: "Update error" });
  }
};
export const getAllActivities = async (req: Request, res: Response) => {
    try {
      const activities = await Activity.findAll();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: "Error fetching activities" });
    }
  };

  export const getActivityById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const activity = await Activity.findByPk(id);
  
      if (!activity) {
        return res.status(404).json({ message: "No activity found" });
      }
  
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: "Error fetching activity by id" });
    }
  };

  