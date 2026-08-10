/**
 * Server Entry Point
 * Day 4: Start the Express server
 */

import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     SpecX API - Day 4 & 5 Project     ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log('');
  console.log('📍 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/items`);
  console.log(`   GET  http://localhost:${PORT}/items/:id`);
  console.log('');
  console.log('⏹️  Press Ctrl+C to stop the server');
  console.log('');
});
