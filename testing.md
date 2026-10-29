Tested locally using Postman with the server running at:
http://localhost:3000/api/resources

1. Retrieve All Inventory Items
    Verify that API can retreive complete inventory list array.
    GET /api/resources - 200 OK
    Result: 
    {
        "data": []
    }

2. Create a New Inventory Item
    Verify that API can create a new inventory item, assign it a unique ID, and add it to inventory list array.
    POST /api/resources - 201 Created
    Request Body:
    {
    "name": "Bluetooth Headphones",
    "quantity": 7,
    "category": "Electronics"
    }

3. Retreive an Existing Inventory Item
    Verify individual inventory item can be retreived from the array using its ID.
    GET /api/resources - 200 OK
    Result:
    {
        "data": {
            "id": "1",
            "name": "Bluetooth Headphones",
            "quantity": 7,
            "category": "Electronics"
        }
    }

4. Retreive Nonexistent Inventory Item
    Verify API handles request for inventory items that don't exist.
    GET /api/resources/999 - 404 Not Found
    Result: 
    {
    "error": "Inventory item not found!"
    }

5. Update Existing Inventory Item
    Verify existing inventory item's info can be updated.
    PUT /api/resources/1 - 200 OK
    Request Body:
    {
        "quantity": 25
    }

6. Update Nonexistent Inventory Item
    Verify API does not attempt to make an update to an inventory item that does not exist.
    PUT /api/resources/999 - 404 Not Found
    Request Body:
    {
        "quantity": 25
    }

7. Delete Existing Inventory Item
    Verify existing inventory item can be removed from inventory list array.
    DELETE /api/resources/1 - 200 OK
    Result:
    {
    "message": "Inventory item deleted successfully.",
    "data": {
        "id": "1",
        "name": "Bluetooth Headphones",
        "quantity": 25,
        "category": "Electronics"
        }
    }

8. Delete Already Deleted Inventory Item
    Verify API handles attempts to delete an item that no longer or doesn't exist.
    DELETE /api/resources/999 - 404 Not Found
    Result:
    {
    "error": "Inventory item not found!"
    }

9. Create Inventory Item with Blank Name
    Test input validation to ensure that an inventory item cannot be created without a valid name.
    POST /api/resources - 400 Bad Request
    Request Body:
    {
    "name": "   ",
    "quantity": 15,
    "category": "Electronics"
    }

10. Create Inventory Item with Negative Quantity
    Test input validation to ensure that quantities cannot be negative
    POST /api/resources - 400 Bad Request
    {
    "name": "Keyboard",
    "quantity": -5,
    "category": "Electronics"
    }