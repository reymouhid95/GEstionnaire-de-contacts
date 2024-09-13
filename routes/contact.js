const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

router.use(auth);

// Liste tous les contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.render("contacts/index", { contacts });
});

// Affiche le formulaire de création
router.get("/new", (req, res) => {
  res.render("contacts/new");
});

// Crée un nouveau contact
router.post("/", async (req, res) => {
  const contact = new Contact({
    ...req.body,
    user: req.user._id,
  });
  await contact.save();
  res.redirect("/contacts");
});

// Affiche le formulaire d'édition
router.get("/:id/edit", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("contacts/edit", { contact });
});

// Met à jour un contact
router.put("/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/contacts");
});

// Supprime un contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});

module.exports = router;
