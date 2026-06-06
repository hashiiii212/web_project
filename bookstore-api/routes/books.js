const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Get all books (with search & pagination)
router.get('/', async (req, res, next) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:id - Get single book by ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
});

// POST /api/books - Add a new book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, genre, price, publishedDate, inStock } = req.body;

    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, and price'
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a non-negative number'
      });
    }

    const book = await Book.create({ title, author, genre, price, publishedDate, inStock });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/books/:id - Update a book by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { title, author, genre, price, publishedDate, inStock } = req.body;

    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a non-negative number'
      });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, price, publishedDate, inStock },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/books/:id - Delete a book by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;