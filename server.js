
import {serverHttp} from './src/app.js';
import {PORT} from './src/config/constants.js';
import './src/services/websocket.js';


serverHttp.listen(PORT, () => {
  console.log(`Server UP! Listening on port ${PORT}`);
});
