// neural-worker.js
let amygdalaCharge = 0.0;
let vagalBrakeEffort = 0.0;
let currentHeartRateBpm = 74;

// Motoru belirli bir milisaniyede bir tetikleyen döngü
setInterval(() => {
    // ... coreCerebralNeuralGovernor İÇİNDEKİ TÜM MATEMATİKSEL HESAPLAMALAR ...
    // (Sadece 'document.getElementById' gibi DOM işlemlerini buradan kaldırın)

    // Hesaplanan güncel verileri ana sayfaya fırlat
    postMessage({
        heartAcVoltage: currentHeartRateBpm > 100 ? 110.0 : 0.0,
        currentHeartRateBpm: currentHeartRateBpm,
        vagalBrakeEffort: vagalBrakeEffort,
        amygdalaCharge: amygdalaCharge
    });
}, 30); // 30ms = Yaklaşık 33 FPS nöral örnekleme hızı