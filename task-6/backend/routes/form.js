import express from "express";

import FormData from "../models/FormData.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE FORM DATA
// POST /api/form
// PROTECTED
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required.",
      });
    }

    const formData = await FormData.create({
      user: req.user.id,
      title,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Form data saved successfully.",
      data: formData,
    });

  } catch (error) {
    console.error("Create Form Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save form data.",
    });
  }
});


// ==========================================
// GET USER FORM DATA
// GET /api/form
// PROTECTED
// ==========================================

router.get("/", authMiddleware, async (req, res) => {
  try {

    const data = await FormData.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {
    console.error("Get Form Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch form data.",
    });
  }
});


// ==========================================
// DELETE FORM DATA
// DELETE /api/form/:id
// PROTECTED + AUTHORIZATION
// ==========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const formData = await FormData.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!formData) {
      return res.status(404).json({
        success: false,
        message: "Data not found or unauthorized.",
      });
    }

    await formData.deleteOne();

    res.status(200).json({
      success: true,
      message: "Form data deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Form Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete form data.",
    });
  }
});


export default router;