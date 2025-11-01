import express from 'express';
import { body } from 'express-validator';
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Validation rules
const createTodoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
];

const updateTodoValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'done'])
    .withMessage('Status must be either pending or done'),
];

// All routes are protected
router.use(protect);

// Routes
router.post('/', createTodoValidation, createTodo);
router.get('/', getTodos);
router.get('/:id', getTodo);
router.put('/:id', updateTodoValidation, updateTodo);
router.delete('/:id', deleteTodo);

export default router;