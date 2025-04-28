const express = require('express');
const router = express.Router();
const HeadlineController = require('../controllers/HeadlineController');

router.get('/', HeadlineController.getHeadlines);
router.post('/', HeadlineController.createHeadline);
router.put('/:id', HeadlineController.updateHeadline);
router.delete('/:id', HeadlineController.deleteHeadline);
router.patch('/:id/hide', HeadlineController.toggleHideHeadline);
router.put('/:id/status', HeadlineController.updateHeadlineStatus);


module.exports = router;
