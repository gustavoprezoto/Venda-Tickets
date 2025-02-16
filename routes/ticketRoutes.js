const express = require("express");
const router = express.Router();
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");
const ticketController = require("../controllers/ticketController");

// Route to display the ticket creation form (Admins only)
router.get("/create", requireAuth, requireAdmin, (req, res) => {
    res.render("createTicket", { user: req.user });
});

// Route to handle ticket creation (Admins only)
router.post("/create", requireAuth, requireAdmin, ticketController.createTicket);

// Route to display all tickets for purchase
router.get("/buy", requireAuth, ticketController.listTickets);

// Route to handle ticket purchase
router.post("/buy/:ticketId", requireAuth, ticketController.buyTicket);

// Route to display the user's purchased tickets
router.get("/my-tickets", requireAuth, ticketController.listUserTickets);

// Route to display all tickets for deletion (Admins only)
router.get("/delete", requireAuth, requireAdmin, ticketController.listTicketsForDeletion);

// Route to handle ticket deletion (Admins only)
router.post("/delete/:ticketId", requireAuth, requireAdmin, ticketController.deleteTicket);

module.exports = router;
