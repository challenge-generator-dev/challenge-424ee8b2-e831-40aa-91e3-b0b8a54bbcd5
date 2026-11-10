import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = (): void => {
  const server = app.listen(PORT, () => {
    console.log(`[SERVER] Servidor iniciado en el puerto ${PORT}`);
    console.log(`[SERVER] Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[SERVER] URL: http://localhost:${PORT}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`[ERROR] El puerto ${PORT} ya está en uso`);
      process.exit(1);
    } else {
      console.error(`[ERROR] Error al iniciar el servidor:`, error);
      process.exit(1);
    }
  });

  process.on('SIGTERM', () => {
    console.log('[SERVER] Señal SIGTERM recibida, cerrando servidor...');
    server.close(() => {
      console.log('[SERVER] Servidor cerrado correctamente');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('[SERVER] Señal SIGINT recibida, cerrando servidor...');
    server.close(() => {
      console.log('[SERVER] Servidor cerrado correctamente');
      process.exit(0);
    });
  });
};

startServer();