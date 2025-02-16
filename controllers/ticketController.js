const Ticket = require("../models/Ticket");
const UserTicket = require("../models/UserTicket");

exports.createTicket = async (req, res) => {
    try {
        const { name, price, quantity_available } = req.body;

        await Ticket.create({ name, price, quantity_available });

        return res.render("dashboard", { user: req.user, message: "Ticket created successfully!" });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).render("dashboard", { user: req.user, error: "Internal server error" });
    }
};

exports.listTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();

        const formattedTickets = tickets.map(ticket => ({
            ...ticket.toJSON(),
            is_sold_out: ticket.quantity_available === 0
        }));

        formattedTickets.sort((a, b) => a.is_sold_out - b.is_sold_out);

        res.render("buyTickets", { user: req.user, tickets: formattedTickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).render("dashboard", { user: req.user, error: "Internal server error" });
    }
};


exports.buyTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const userId = req.user.id;

        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).render("buyTickets", { user: req.user, error: "Ticket not found!" });
        }

        if (ticket.quantity_available <= 0) {
            return res.status(400).render("buyTickets", { user: req.user, error: "This ticket is sold out!" });
        }

        ticket.quantity_available -= 1;
        await ticket.save();

        let userTicket = await UserTicket.findOne({
            where: { user_id: userId, ticket_id: ticket.id }
        });

        if (userTicket) {
            userTicket.quantity += 1;
            await userTicket.save();
        } else {
            await UserTicket.create({
                user_id: userId,
                ticket_id: ticket.id,
                quantity: 1
            });
        }

        return res.redirect("/tickets/buy");
    } catch (error) {
        console.error("Error buying ticket:", error);
        return res.status(500).render("buyTickets", { user: req.user, error: "Internal server error" });
    }
};

exports.listUserTickets = async (req, res) => {
    try {
        const userId = req.user.id;

        const userTickets = await UserTicket.findAll({
            where: { user_id: userId },
            include: [{ model: Ticket, attributes: ["name", "price"] }]
        });

        const formattedTickets = userTickets.map(ut => ({
            name: ut.Ticket.name,
            price: ut.Ticket.price,
            quantity: ut.quantity
        }));

        res.render("myTickets", { user: req.user, tickets: formattedTickets });
    } catch (error) {
        console.error("Error fetching user tickets:", error);
        return res.status(500).render("dashboard", { user: req.user, error: "Internal server error" });
    }
};

exports.listTicketsForDeletion = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();

        res.render("deleteTickets", { user: req.user, tickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).render("dashboard", { user: req.user, error: "Internal server error" });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).render("deleteTickets", { user: req.user, error: "Ticket not found!" });
        }

        await UserTicket.destroy({ where: { ticket_id: ticketId } });

        await Ticket.destroy({ where: { id: ticketId } });

        return res.redirect("/tickets/delete");
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return res.status(500).render("deleteTickets", { user: req.user, error: "Internal server error" });
    }
};


