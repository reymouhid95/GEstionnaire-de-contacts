const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Définir un statut par défaut si non spécifié
  const status = err.status || 500;
  const message = err.message || "Une erreur s'est produite";

  res.status(status).render("error", {
    error: {
      status: status,
      message: message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    },
  });
  next();
};

module.exports = errorHandler;
