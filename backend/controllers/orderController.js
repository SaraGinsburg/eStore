import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    userDetails,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  // make sure orderItems is not null or undefined, and also has values
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Items')
  } else {
    //instantiate a new order and pass in an object here.
    const order = new Order({
      orderItems,
      user: req.user._id, //we can get the user._id from the token
      shippingAddress,
      userDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
