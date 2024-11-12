import asyncHandler from 'express-async-handler';
import Customer from '../models/Customer.js';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Public
export const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, totalSpending, lastVisit, visitCount } = req.body;

  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    res.status(400);
    throw new Error('Customer already exists');
  }

  const customer = await Customer.create({
    name,
    email,
    totalSpending,
    lastVisit,
    visitCount
  });

  res.status(201).json(customer);
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Public
export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedCustomer);
});

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Public
export const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  await customer.deleteOne();
  res.json({ message: 'Customer removed' });
});