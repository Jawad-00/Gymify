const express = require('express');
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getMemberById,
  getMemberByNameAndPhone,
  updateMember,
  deleteMember
} = require('../controllers/member.controller');

const protect = require('../middleware/auth');

// All routes are protected
router.post('/', protect, createMember);
router.get('/', protect, getAllMembers);
router.get('/search', protect, getMemberByNameAndPhone); // 🔍 by name & phone
router.get('/:id', protect, getMemberById);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);

module.exports = router;
