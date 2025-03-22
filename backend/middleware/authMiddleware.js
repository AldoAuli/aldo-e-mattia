module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Token ricevuto: ", token);  // Debug
    if (!token) return res.status(401).json({ error: 'Accesso negato' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token non valido' });
    }
};
