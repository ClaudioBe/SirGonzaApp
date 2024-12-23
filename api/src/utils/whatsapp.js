const { Client } = require('whatsapp-web.js');
// Create a new client instance
const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
});
let qrCode="";

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', qr => {
    qrCode=qr;
});

// Start your client
client.initialize();

module.exports={client,qrCode};