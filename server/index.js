'use strict';

const express = require('express');
const morgan = require('morgan');

const {getItems, getItemById, getOrders, getOrderById, getCompanies, getCompanyById, createOrder, updateOrder, deleteOrder, addToCart, getCart, updateCartItem, removeCartItem, clearCart} = require('./handlers')

const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))
  .get('/items', getItems)
  // .get('/items/:item', getItemById)
  .get('/items/:itemId', getItemById)
  .get('/companies', getCompanies)
  .get('/companies/:company', getCompanyById)
  .get('/orders', getOrders)
  .get('/orders/:order', getOrderById)
  .post('/createOrder', createOrder)
  .delete('/deleteOrder/:order', deleteOrder)
  .patch('/updateOrder/:order', updateOrder)
  .post('/addToCart', addToCart)
  .get('/cart', getCart)
  .patch('/updateCartItem/:item', updateCartItem)
  .delete('/removeCartItem/:item', removeCartItem)
  .delete('/clearCart', clearCart)


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  //revised
  