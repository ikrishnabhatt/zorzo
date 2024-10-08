const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Open SQLite database
let db = new sqlite3.Database('./cart.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the cart database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT,
    name TEXT,
    price REAL,
    quantity INTEGER
)`);

// Route to add items to the cart
router.post('/api/cart/add', (req, res) => {
    const { productId, name, price, quantity } = req.body;

    db.run(`INSERT INTO cart_items (product_id, name, price, quantity) VALUES (?, ?, ?, ?)`,
        [productId, name, price, quantity],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.json({ success: true, message: "Item added to cart" });
        }
    );
});

// Route to fetch all cart items
router.get('/api/cart', (req, res) => {
    db.all(`SELECT * FROM cart_items`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, items: rows });
    });
});

module.exports = router;