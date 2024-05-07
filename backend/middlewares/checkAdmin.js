const checkAdmin = (req, res, next) => {
  if (req.auth.claims.metadata.role !== "admin") {
    
    return next(createError(401, "Unauthorized")); 
  }
  next(); 
};

module.exports = checkAdmin;
