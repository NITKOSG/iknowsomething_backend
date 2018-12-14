const XSSProtection = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.send();
    return;
  }
  // adding response headers
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Frame-Options', 'deny');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
};

export default XSSProtection;
