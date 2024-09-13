require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const errorHandler = require("./middleware/error-handler");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// Connexion à la base de données
connectDB();

// Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

console.log("Chemin des vues:", app.get("views"));

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);
app.use("/contacts", contactRoutes);

// Page d'accueil
app.get("/", (req, res) => {
  console.log("Route racine accédée");
  res.redirect("/contacts");
});

// Middleware de gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}/`);
});
