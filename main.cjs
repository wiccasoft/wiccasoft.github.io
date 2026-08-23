// main.cjs - Electron Ana Kontrol Merkezi
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let nodeProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    backgroundColor: '#0d0d0d', // Senin o fütüristik arka plan rengin
    titleBarStyle: 'hidden', // Apple/Windows varsayılan çirkin barlarını uçur
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 🚀 MASAÜSTÜ SİHRE BAĞLANIYOR: 
  // Geliştirme aşamasında Astro local server'ını, paketlendiğinde ise dist klasörünü okur
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:4321'); // Astro dev portu
  }
}

// 🗄️ BÜYÜK ENTEGRASYON: Arkadaki o canavar Node.js/Express sunucunu ateşliyoruz
function startNodeService() {
  nodeProcess = spawn('node', [path.join(__dirname, 'nodejs-project/main.js')]);

  nodeProcess.stdout.on('data', (data) => {
    console.log(`Node.js Sunucu Log: ${data}`);
  });
}

app.whenReady().then(() => {
  startNodeService(); // Önce arkadaki Express motorunu uyandırıyoruz
  createWindow();     // Sonra penceremizi şak diye açıyoruz

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Uygulama kapandığında arkadaki Node.js sürecinin boğazını sıkıp kapatıyoruz (RAM'de şişmesin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  if (nodeProcess) nodeProcess.kill();
});