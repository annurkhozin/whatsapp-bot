const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './wa-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

//const client = new Client({ puppeteer: { headless: false }, session: sessionCfg }); // kalo ingin membuka browser
const client = new Client({ puppeteer: { headless: true }, session: sessionCfg }); // kalo tidak ingin membuka browser

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == 'ping') {
        msg.reply('pong');
    }else if(msg.body != '') {
        msg.reply('Hallo kak, mohon tunggu sebentar 😊.\n\n\n *NB* : _pesan ini di buat otomatis oleh bot._')
    }
});

client.initialize();
