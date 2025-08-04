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
  updateFeeDate,
  getDashboardStats,
  getMonthlyEarnings  
} = require('../controllers/member.controller');

const protect = require('../middleware/auth');

router.post('/', protect, createMember);
router.get('/', protect, getAllMembers);
router.get('/search', protect, getMemberByNameAndPhone); 
router.get('/overdue', protect, getOverdueMembers); 
router.get('/stats', protect, getDashboardStats);
router.get('/monthly-earnings', protect, getMonthlyEarnings);
router.get('/:id', protect, getMemberById);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);
router.put('/:id/fee', protect, updateFeeDate);


module.exports = router;
