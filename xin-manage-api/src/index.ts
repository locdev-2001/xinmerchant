import '@config/env.config' // Must be the first import
import app from './Server';
import logger from '@services/vendors/logger.service';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info(`Express server started on url: http://localhost:${port}/v1`);
});
