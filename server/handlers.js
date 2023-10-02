const { MongoClient } = require("mongodb");
require('dotenv').config({path:__dirname +'/.env'})
console.log(__dirname)
const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const { v4: uuidv4 } = require("uuid");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
    //get all items 
    const getItems = async (req, res) => {
        let client = new MongoClient(MONGO_URI);
        try {
            await client.connect();
    
            const db = client.db("eCommerce");
            const itemsCollection = db.collection('items');
    
            const items = await itemsCollection.find().toArray();
    
            res.status(200).json(items);
        } catch (err) {
            console.error("Error fetching items:", err);
            res.status(500).json({ message: "An error occurred while fetching items", error: err });
        } finally {
            client.close();
        }
    };

    //get a specific item 

    const getItemById = async (req, res) => {
        const { itemId } = req.params;
        let client= new MongoClient(MONGO_URI);
        try {

            const db = client.db("eCommerce");
    
            console.log("Fetching item:", itemId);
            const itemFound = await db.collection("items").findOne({ _id: Number(itemId)});
    
            if (!itemFound) {
                res.status(404).json({ message: "Item not found" });
                return;
            }

            const companyFound = await db.collection("companies").findOne({ _id: itemFound.companyId });
            itemFound.company = companyFound;

            res.status(200).json(itemFound);
            } catch (error) {
            console.error("Error fetching item:", error);
            res.status(500).json({ message: "Error fetching item", error: error.message });
            } finally {
            client.close();
            }
    };

//get all companies
    const getCompanies = async (req, res) => {
        let client= new MongoClient(MONGO_URI);
        try {
            
            await client.connect();
    
            const db = client.db("eCommerce");
            const itemsFromCompany = db.collection('companies');
    
            const companies = await itemsFromCompany.find({}).toArray();
    
            res.status(200).json(companies);
        } catch (err) {
            console.error("Error fetching companies:", err);
            res.status(500).json({ message: "An error occurred while fetching items", error: err });
        } finally {
            client.close();
        }
    };
    
// to get a specific company

    const getCompanyById = async (req, res) => {
        const { company } = req.params;
        let client = new MongoClient(MONGO_URI);
        
        try {
            await client.connect();
    
            const db = client.db("eCommerce");

            const companyFound = await db.collection("companies").findOne({ _id: Number(company) });
            console.log("Found item:", companyFound);
    
            if (!companyFound) {
                res.status(404).json({ message: "Item not found" });
                return;
            }
    
            res.status(200).json(companyFound);
        } catch (error) {
            console.error("Error fetching item:", error);
            res.status(500).json({ message: "Error fetching item", error: error.message });
        } finally {
            client.close();
        }
    };

    // Get all orders

    const getOrders = async (req, res) => {
        let client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
    
            const db = client.db("eCommerce"); 
            const ordersCollection = db.collection('orders');
    
            const orders = await ordersCollection.find().toArray();
    
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        } finally {
            client.close();
        }
    };

    //to get a specific order
    const getOrderById = async (req, res) => {
        const { order } = req.params;
        let client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
    
            const db = client.db("eCommerce"); 
            const ordersCollection = db.collection('orders');
    
            const orderFound = await ordersCollection.findOne({ _id: (order) });
    
            if (!orderFound) {
                return res.status(404).json({ message: "Order not found" });
            }
    
            res.status(200).json(orderFound);
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).json({ message: "Error fetching order", error: error.message });
        } finally {
            client.close();
        }
    };
    
    // posting new order to the database 
    const createOrder = async (req, res) => {
        try {
            const { items, total, firstName, lastName, email, addressLine, province, country, postalCode, city , cardNumber, cardName, expirationDate, CVV } = req.body;
        
            if (!items || !firstName || !lastName || !email || !addressLine || !province || !country || !postalCode || !city || !total || !cardNumber || !cardName   || !expirationDate || !CVV   ) {
                return res.status(400).json({ message: "Missing information" });
            }
        
            const client = new MongoClient(MONGO_URI, options);
            await client.connect();
            console.log("connected");
        
            const db = client.db("eCommerce");
            const ordersCollection = db.collection("orders");
        
            const updatedItems = items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            itemId: item._id,
            imageSrc: item.imageSrc,
            }));
        
            
        const newOrder = {
            _id: uuidv4(),
            orderDate: new Date(),
            items: updatedItems,
            firstName,
            lastName,
            email,
            addressLine,
            province,
            country,
            postalCode,
            city,
            total,
            cardNumber,
            cardName,
            expirationDate,
            CVV,
        };
        
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const { _id, quantity } = item;
    
                    // Need to find item 
                    const itemsCollection = db.collection("items");
                    const itemDetails = await itemsCollection.findOne({ _id });
    
                    //no item found
    
                    if (itemDetails.numInStock < quantity) {
                        // out of stock 
                        client.close();
                        return res.status(400).json({ message: "Items out of stock" });
                    }
    
                    // Update the item stock in the "items" collection
                    const updatedStock = itemDetails.numInStock - quantity;
                    await itemsCollection.updateOne({ _id }, { $set: { numInStock: updatedStock } });

                }

            await ordersCollection.insertOne(newOrder);
        
            res.status(201).json({ message: "Order created successfully", orderData: newOrder });
            client.close();
            console.log("disconnected");
            } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: "Error creating order", error: error.message });
            }
        };

    //  To modify things in admin end
    const updateOrder = async (req, res) => {
        const { order } = req.params;
        const updateData = req.body;
    
        // need to verify if the update data is not empty
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Data is missing" });
        }
    
        const client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
    
            const db = client.db("eCommerce");
            const ordersCollection = db.collection("orders");

    
            const updatedOrder = await ordersCollection.findOneAndUpdate(
                { _id: order },
                { $set: updateData },
                // returnOriginal: false , updated order is returned instead of the previous order.
                // As of 2021 - Mongodb ^4.2.0 Update -- use { returnDocument: 'after' }
                { returnDocument: 'after' }
            );
    
            if (updatedOrder.value) {
                res.status(200).json({ message: "Order updated successfully", updatedOrder: updatedOrder.value });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error("Error updating order:", error);
            res.status(500).json({ message: "Error updating order", error: error.message });
        } finally {
            client.close();
        }
    };
    
    // Delete an order by ID 
    const deleteOrder = async (req, res) => {
        const { order } = req.params;
        const client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
    
            const db = client.db("eCommerce");
            const ordersCollection = db.collection('orders');
    
            const deletedOrder = await ordersCollection.deleteOne({ _id: order });
    
            if (deletedOrder.deletedCount === 1) {
                res.status(200).json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Error deleting order", error: error.message });
        } finally {
            client.close();
        }
    };

    // to add item to the cart
    const addToCart = async (req, res) => {
        let client = new MongoClient(MONGO_URI);

        try {
            await client.connect();
    
            const _id  = req.body._id; 
            const db = client.db("eCommerce");
            const cart = db.collection("cart");

            // checking to see if item has already been added to cart. If yes, 
            // we will just update the quantity to add the new quantity.
            // If not, we will add the item to the cart array. 

            const check1 = await cart.findOne({ _id })

            if (check1) {

                const newData = { $set : { ...check1, quantity: check1.quantity + req.body.quantity }}
                const result = await cart.updateOne({ _id } , newData)

                return res.status(200).json({
                    status: 200,
                    success: true,
                    data: result
                })

            } else {
    
            const result = await cart.insertOne(req.body);
    
            res.status(201).json({status: 201, data: result});
            } 
        } catch (err) {
            console.error("Error adding items:", err);
            res.status(500).json({ message: "An error occurred while adding items", error: err });
        } finally {
            client.close();
        }
    };


    //  get items from the cart
    const getCart = async (req, res) => {
        let client = new MongoClient(MONGO_URI);
        try {
            await client.connect();
    
            const db = client.db("eCommerce");
            const cart = db.collection("cart");
    
            const items = await cart.find().toArray();
    
            res.status(200).json({status: 200, items: items});
        } catch (err) {
            console.error("Error fetching items:", err);
            res.status(500).json({ message: "An error occurred while fetching items", error: err });
        } finally {
            client.close();
        }
    };
    

    // to modify quantity of cart items
    const updateCartItem = async (req, res) => {
        const { item } = req.params;
    
        // need to verify if the update data is not empty
        if (!req.body|| Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Data is missing" });
        }
    
        const client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
            const db = client.db("eCommerce");
            const cart = db.collection("cart");
            const updatedCart = await cart.findOneAndUpdate(
                { _id: +item },
                { $set: req.body },
                // returnOriginal: false , updated order is returned instead of the previous order.
                // As of 2021 - Mongodb ^4.2.0 Update -- use { returnDocument: 'after' }
                { returnDocument: 'after' }
            );
    
            if (updatedCart.value) {
                res.status(200).json({ status: 200, message: "Cart updated succesfully", updatedCart: updatedCart.value });
            } else {
                res.status(404).json({ status: 404, message: "Item not found" });
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ status: 500, message: "Error updating cart", error: error.message });
        } finally {
            client.close();
        }
    };

    // to delete items from the cart
    const removeCartItem = async (req, res) => {
        const {item} = req.params
        const client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
    
            const db = client.db("eCommerce");
            const cart = db.collection('cart');
    
            const deletedItem = await cart.deleteOne({ _id: +item });
    
            if (deletedItem.deletedCount === 1) {
                res.status(200).json({ status: 200, data: deletedItem, message: "Item removed from cart successfully" });
            } else {
                res.status(404).json({ message: "Item not found" });
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            res.status(500).json({ status: 500, message: "Error deleting item", error: error.message });
        } finally {
            client.close();
        }
    };

    // delete all items from the cart
    const clearCart = async (req, res) => {

        const client = new MongoClient(MONGO_URI);
    
        try {
            await client.connect();
            const db = client.db("eCommerce");
            const ordersCollection = db.collection('cart');
            const deleteItems = await ordersCollection.deleteMany();
            res.status(200).json({ status: 200, message: "Order deleted successfully" }); 
        } catch (error) {
            console.error("Error clearing cart:", error);
            res.status(500).json({ status: 500, message: "Error clearing cart", error: error.message });
        } finally {
            client.close();
        }
    };

    module.exports = {
        getItems,
        getItemById,
        getCompanies,
        getCompanyById,
        getOrders,
        getOrderById,
        createOrder,
        deleteOrder,
        updateOrder,
        addToCart,
        getCart,
        updateCartItem,
        removeCartItem,
        clearCart
    };



