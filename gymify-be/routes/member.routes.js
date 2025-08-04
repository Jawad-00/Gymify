const express = require('express');
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getMemberById,
  getMemberByNameAndPhone,
  updateMember,
  deleteMember,
  getOverdueMembers,
  updateFeeDate 
} = require('../controllers/member.controller');

const protect = require('../middleware/auth');

// All routes are protected
router.post('/', protect, createMember);
router.get('/', protect, getAllMembers);
router.get('/search', protect, getMemberByNameAndPhone); // 🔍 by name & phone
router.get('/overdue', protect, getOverdueMembers); // 🔁 Get overdue fee members
router.get('/:id', protect, getMemberById);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);
router.put('/:id/fee', protect, updateFeeDate);


module.exports = router;
