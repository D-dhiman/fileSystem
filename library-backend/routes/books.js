const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Search by keyword
router.get('/search', async (req, res) => {
    const keyword = req.query.keyword?.toLowerCase();
    if (!keyword) return res.status(400).json({ message: 'Keyword required' });

    const books = await Book.find({ keywords: keyword });
    res.json(books);
});

// Get book by ID
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

module.exports = router;
