// controllers/orderController.js
const OrderService = require('../services/orderService');
const { validationResult } = require('express-validator');

class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    // Get all orders with pagination
    getAllOrders = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;

            const result = await this.orderService.getAllOrders({ page, limit, status });
            
            res.status(200).json({
                success: true,
                data: result.orders,
                pagination: {
                    page: result.page,
                    limit: result.limit,
                    total: result.total,
                    pages: result.pages
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching orders',
                error: error.message
            });
        }
    };

    // Get order by ID
    getOrderById = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching order',
                error: error.message
            });
        }
    };

    // Create new order
    createOrder = async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const orderData = req.body;
            const order = await this.orderService.createOrder(orderData);
            
            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating order',
                error: error.message
            });
        }
    };

    // Update order
    updateOrder = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const updateData = req.body;

            const order = await this.orderService.updateOrder(id, updateData);
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating order',
                error: error.message
            });
        }
    };

    // Delete order
    deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.orderService.deleteOrder(id);
            
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Order deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting order',
                error: error.message
            });
        }
    };

    // Get orders by user
    getOrdersByUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await this.orderService.getOrdersByUser(userId, { page, limit });
            
            res.status(200).json({
                success: true,
                data: result.orders,
                pagination: {
                    page: result.page,
                    limit: result.limit,
                    total: result.total,
                    pages: result.pages
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching user orders',
                error: error.message
            });
        }
    };

    // Update order status
    updateOrderStatus = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const { status } = req.body;

            const order = await this.orderService.updateOrderStatus(id, status);
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Order status updated successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating order status',
                error: error.message
            });
        }
    };
}

module.exports = OrderController;