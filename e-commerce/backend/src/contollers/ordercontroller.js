import { Order } from "../models/Order.js";
export const placeOrder = async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request refund
export const requestRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (order.isRefunded || order.isCancelled) {
      return res
        .status(400)
        .json({ message: "Order cannot be refunded or cancelled" });
    }

    order.refundStatus = "Pending";
    await order.save();
    res.status(200).json({ message: "Refund requested", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (order.isCancelled || order.isRefunded) {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.isCancelled = true;
    order.cancelledAt = Date.now();
    await order.save();
    res.status(200).json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject refund
export const handleRefund = async (req, res) => {
    try {
      const { status } = req.body; // "Approved" or "Rejected"
  
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (order.isRefunded || order.refundStatus === "Rejected") {
        return res.status(400).json({ message: "Refund cannot be processed" });
      }
  
      if (status === "Approved") {
        order.isRefunded = true;
        order.refundedAt = Date.now();
        order.refundStatus = "Approved";
      } else if (status === "Rejected") {
        order.refundStatus = "Rejected";
      } else {
        return res.status(400).json({ message: "Invalid refund status" });
      }
  
      await order.save();
      res.status(200).json({ message: `Refund ${status.toLowerCase()}`, order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  