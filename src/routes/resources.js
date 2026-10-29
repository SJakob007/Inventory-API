// Manages inventory collection by storing items in JavaScript array
// Defines GET, POST, PUT, DELETE that allow user to interact with array
import express from "express";

// Creates separate router for the inventory API
const router = express.Router();

// Content in array is erased when server stops or restarts
let inventoryItems = [];
let nextId = 1;

// GET: Retrieve all inventory items
// URL: GET /api/resources
router.get("/", (req, res) =>
{
    res.status(200).json({ data: inventoryItems });
});

// GET: Retrieve one inventory item by ID 
// URL: api/resources/1 (/:id => 1)
router.get("/:id", (req, res) =>
{
    // req.params.id gets ID from URL and uses .find() to return first match
    // returns `undefined` if no match, responds with 404 Not Found
    const item = inventoryItems.find(item => item.id === req.params.id);

    if (!item)
    {
        return res.status(400).json({
            error: "Inventory item not found!"
        });
    }

    res.status(200).json({ data: item });
});

// POST: Create a new inventory item
router.post("/", (req, res) => 
{
    const { name, quantity, category } = req.body;

    // Validate new item information
    // 400 Error if invalid

    if (typeof name !== "string" || name.trim() === "")
    {
        return res.status(400).json({
            error: "Item name is required!"
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0)
    {
        return res.status(400).json({
            error: "Quantity must be a non-negative integer!"
        });
    }

    if (typeof category !== "string" || category.trim() === "")
    {
        return res.status(400).json({
            error: "Item category is required."
        });
    }

    // Creates new item with validated information
    const newItem = {
        id: String(nextId++),
        name: name.trim(),
        quantity: quantity,
        category: category.trim()
    };

    // Adds item to array
    inventoryItems.push(newItem);

    res.status(201).json({ data: newItem});
});

// PUT: Update an existing inventory item
router.put("/:id", (req, res) => 
{
    const item = inventoryItems.find(item => item.id === req.params.id);

    if (!item)
    {
        return res.status(404).json({
            error: "Inventory item not found!"
        });
    }

    const { name, quantity, category } = req.body;

    // Validate new information for item
    // 400 Error if invalid

    if (name !== undefined && 
        (typeof name !== "string" || name.trim() === ""))
    {
        return res.status(400).json({
            error: "Item name cannot be blank!"
        });
    }

    if (quantity !== undefined && 
        (!Number.isInteger(quantity) || quantity < 0))
    {
        return res.status(400).json({
            error: "Quantity must be a non-negative integer."
        });
    }
    
    if (category !== undefined && 
        (typeof category !== "string" || category.trim() === ""))
    {
        return res.status(400).json({
            error: "Item category cannot be blank!"
        });
    }

    //Changes valid inventory item fields

    if (name !== undefined)
    {
        item.name = name.trim();
    }

    if (quantity !== undefined)
    {
        item.quantity = quantity;
    }

    if (category !== undefined)
    {
        item.category = category.trim();
    }
    
    res.status(200).json({ data: item });
});

// DELETE: Remove an inventory item
router.delete("/:id", (req, res) =>
{
    // Finds array position of desired item
    const index = inventoryItems.findIndex(
        item => item.id === req.params.id
    );

    if (index === -1)
    {
        return res.status(404).json({
            error: "Inventory item not found!"
        });
    }

    // Removes exactly one item from array
    // [0] extracts removed item, allowing it to be displayed in response
    const deletedItem = inventoryItems.splice(index, 1)[0];

    res.status(200).json({
        message: "Inventory item deleted successfully.",
        data: deletedItem
    });
})

export default router;