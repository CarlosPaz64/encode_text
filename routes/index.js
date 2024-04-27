const express = require('express');
const app = express();

// Configurar la ruta para renderizar la vista
app.get('/', (req, res) => {
    res.render('index'); // Renderizar la vista index.pug
});

// Middleware para verificar el número de veces que un usuario no logeado ha accedido a la ruta principal
app.use((req, res, next) => {
  if (!req.session.loggedUser) {
    // Si el usuario no está logeado, verificamos si ha excedido el límite de acceso
    req.session.accessCount = req.session.accessCount || 0;
    if (req.session.accessCount >= 3) {
      // Si ha excedido el límite, redirigir al usuario al login
      return res.redirect('/login');
    }
    // Incrementar el contador de acceso
    req.session.accessCount++;
  }
  next();
});

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
