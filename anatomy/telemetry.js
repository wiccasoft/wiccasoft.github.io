// ==========================================================================================
// 📊 METATRON ADVANCED QUANTUM TELEMETRY DASHBOARD - (c) 2026 wiccasoft
// ==========================================================================================
(function() {
    // 1. UI ve CSS Kurulumu (Ekranın sağ köşesine yapışan şık tıbbi kontrol paneli)
    const style = document.createElement('style');
    style.textContent = `
        #quantum-telemetry-dashboard {
            position: fixed; top: 10px; right: 10px; width: 320px;
            background: rgba(10, 16, 26, 0.85); border: 1px solid #1a365d;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.1); border-radius: 8px;
            font-family: 'Courier New', monospace; color: #00ffcc;
            padding: 15px; z-index: 9999; font-size: 11px; pointer-events: auto;
        }
        .telemetry-title { text-align: center; font-weight: bold; border-bottom: 1px dashed #1a365d; padding-bottom: 5px; margin-bottom: 10px; color: #ffffff; }
        .chamber-row { display: flex; justify-content: space-between; margin: 4px 0; padding: 2px 5px; border-radius: 3px; cursor: help; }
        .canvas-container { margin-top: 15px; border-top: 1px dashed #1a365d; padding-top: 10px; }
        canvas { background: #050a12; border: 1px solid #112244; display: block; margin-top: 5px; }
    `;
    document.head.appendChild(style);

    const dashboard = document.createElement('div');
    dashboard.id = 'quantum-telemetry-dashboard';
    dashboard.innerHTML = `
        <div class="telemetry-title">🪐 METATRON BIOPHYSICS METRICS</div>
        <div id="telemetry-chambers-list"></div>
        <div class="canvas-container">
            <div>📡 SINGLE-CELL ACTION POTENTIAL (Lead V5 Focused / mV)</div>
            <canvas id="mvOscilloscope" width="290" height="80"></canvas>
        </div>
        <div class="canvas-container">
            <div>🌀 DYNAMIC RESONANCE FREQUENCY TRACKER (Hz / Kırmızı Kanal)</div>
            <canvas id="hzOscilloscope" width="290" height="80"></canvas>
        </div>
    `;
    document.body.appendChild(dashboard);

    const oscCanvas = document.getElementById('mvOscilloscope');
    const oscCtx = oscCanvas.getContext('2d');
    const hzCanvas = document.getElementById('hzOscilloscope');
    const hzCtx = hzCanvas.getContext('2d');

    let historyMV = []; // Üst Kanal: Voltaj hafıza havuzu
    let historyHZ = []; // Alt Kanal: Dinamik frekans hafıza havuzu

    // 🪐 AKADEMİK İLETİM SİSTEMİ EŞLEŞTİRME MATRİSİ (Tıp Terimleri)
    const academicNames = {
        1: { short: "SAN", full: "SA Node (Doğal Kalp Pili)" },
        8: { short: "AMY", full: "Atrial Myocardium (Kulakçık Kası)" },
        4: { short: "AVN", full: "AV Node (Elektriksel Emniyet Rölesi)" },
        5: { short: "HIS", full: "His Bundle (İletim Demetleri)" },
        7: { short: "PUR", full: "Purkinje Fibers (Kılcal İletim Lifleri)" },
        2: { short: "VMY", full: "Ventricular Myocardium (Ana Pompa Motor Kası)" }
    };

    // 2. Canlı Güncelleme ve Çizim Döngüsü
    function updateTelemetryPanel() {
        requestAnimationFrame(updateTelemetryPanel);
        
        // metatron.js'ten gelen global veriyi oku
        const data = window.MetatronAcademicTelemetry;
        if (!data) return;

        const listContainer = document.getElementById('telemetry-chambers-list');
        let html = '';
        
        // 🚨 KESİN TAMİR: Döngü içerisinde kullanılacak olan sayaç ve toplam değişkenlerini sıfırlayarak en tepede tanımlıyoruz!
        let totalHZ = 0;
        let activeCount = 0;

        // 6 ana odayı kutsal girdap sıralamasına göre listele
        [1, 2, 4, 8, 7, 5].forEach((id) => {
            const ch = data[id];
            if (!ch) return;

            totalHZ += parseFloat(ch.frequencyHz);
            activeCount++;

            // Hücrenin anlık kasılma durumuna göre satır arka plan parlaması
            const rowColor = ch.phaseState.includes("SYSTOLE") ? "rgba(0,255,200,0.1)" : "rgba(255,0,100,0.05)";
            
            // Akademik tıp ismini çek, yoksa varsayılanı kullan
            const medical = academicNames[id] || { short: ch.name.substring(0,3), full: ch.name };

            html += `
                <div class="chamber-row" style="background: ${rowColor}" title="${medical.full}">
                    <span style="color: ${ch.color}; font-weight: bold;">${medical.short}</span>
                    <span>${ch.voltageMV} mV</span>
                    <span>${ch.frequencyHz} Hz</span>
                </div>
            `;
        });
        listContainer.innerHTML = html;

        if (activeCount > 0) {
            // ========================================================================
            // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Yeşil)
            // ========================================================================
            let leadV5Voltage = data[4] ? parseFloat(data[4].voltageMV) : -90; // Kalbin motoru olan AV Node (Sarı) odaklı hücresel dalga
            historyMV.push(leadV5Voltage); 
            if (historyMV.length > oscCanvas.width) historyMV.shift();

            oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
            
            // Yeşil kanal için hafif tıbbi arka plan ızgarası (Grid)
            oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.2)';
            oscCtx.lineWidth = 0.5;
            for(let g = 0; g < oscCanvas.width; g += 20) {
                oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
                oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
            }

            oscCtx.strokeStyle = '#00ffcc';
            oscCtx.lineWidth = 1.5;
            oscCtx.beginPath();
            for (let i = 0; i < historyMV.length; i++) {
                const y = oscCanvas.height - (((historyMV[i] + 90) / 210) * oscCanvas.height);
                if (i === 0) oscCtx.moveTo(i, y);
                else oscCtx.lineTo(i, y);
            }
            oscCtx.stroke();

      // ========================================================================
            // 🔴 ALT KANAL: GİRDAP REZONANS FREKANS OSİLOSKOPU (Tam Dinamik Kuantum)
            // ========================================================================
            let maxCurrentHZ = 174; // Solfeggio taban frekansı
            
            // 🎯 İŞTE ARANAN DİZİ: 6 ana odanın ID'lerini tek tek dönüp o anki en yüksek Hz'i buluyoruz
            [1, 2, 4, 8, 7, 5].forEach((id) => {
                const ch = data[id];
                if (ch) {
                    const hzVal = parseFloat(ch.frequencyHz);
                    if (hzVal > maxCurrentHZ) {
                        maxCurrentHZ = hzVal;
                    }
                }
            });

            historyHZ.push(maxCurrentHZ);
            if (historyHZ.length > hzCanvas.width) historyHZ.shift();

            hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
            
            // Kırmızı kanal için hafif tıbbi arka plan ızgarası (Grid)
            hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.2)';
            hzCtx.lineWidth = 0.5;
            for(let g = 0; g < hzCanvas.width; g += 20) {
                hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke();
                hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
            }

            hzCtx.strokeStyle = '#ff0066';
            hzCtx.lineWidth = 1.5;
            hzCtx.beginPath();

            // 174Hz ile 900Hz arasındaki fırlama menzili
            const minScaleHz = 150; 
            const maxScaleHz = 900;
            const hzScaleRange = maxScaleHz - minScaleHz;

            for (let i = 0; i < historyHZ.length; i++) {
                const normalizedY = (historyHZ[i] - minScaleHz) / hzScaleRange;
                const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);
                
                if (i === 0) hzCtx.moveTo(i, safeY);
                else hzCtx.lineTo(i, safeY);
            }
            hzCtx.stroke();
        }
    }

    // Telemetri motorunu ateşle
    updateTelemetryPanel();
})();
