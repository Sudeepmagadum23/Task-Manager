const router = require('express').Router();
const controller = require('../controllers/taskController');

router.route('/')
  .post(controller.createTask)
  .get(controller.getTasks);

router.route('/:id')
  .get(controller.getTaskById)
  .put(controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;
