// ==========================================================================================
// 📊 METATRON ADVANCED QUANTUM TELEMETRY DASHBOARD WITH LUNAR & CSF ENGINE - (c) 2026
// ==========================================================================================
(function() {
    // 1. UI ve Tıbbi Kontrol Paneli CSS Kurulumu
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
        .canvas-container { margin-top: 12px; border-top: 1px dashed #1a365d; padding-top: 8px; }
        canvas { background: #050a12; border: 1px solid #112244; display: block; margin-top: 5px; }
        .element-row { display: flex; justify-content: space-between; margin: 3px 0; font-weight: bold; }
    `;
    document.head.appendChild(style);

    const dashboard = document.createElement('div');
    dashboard.id = 'quantum-telemetry-dashboard';
    dashboard.innerHTML = `
        <div class="telemetry-title">🪐 METATRON QUANTUM LAB</div>
        
        <!-- 🌙 LUNAR & CSF MECHANISM INDICATOR -->
        <div style="background: rgba(255,255,255,0.03); padding: 5px; border-radius: 4px; border: 1px solid #112244; margin-bottom: 10px;">
            <div style="color:#fff; font-weight:bold; text-align:center; margin-bottom:3px;">🧠 LUNAR HYDRO-CSF SYNC</div>
            <div style="display:flex; justify-content:space-between;">
                <span>Ay Fazı: <span id="lunar-phase" style="color:#ffcc00">DOLUNAY</span></span>
                <span>CSF Basınç: <span id="csf-pressure" style="color:#00ffff">YÜKSEK (Kranial)</span></span>
            </div>
        </div>

        <div id="telemetry-chambers-list"></div>
        
        <!-- 🌱 4 ELEMENT & METABOLIC BIO-ENERGY PANEL -->
        <div class="canvas-container">
            <div style="color:#fff; font-weight:bold; margin-bottom:5px;">🌱 METABOLIC & ELEMENTAL MATRIX</div>
            <div id="fire-idx" class="element-row" style="color:#ff3333">🔥 ATEŞ (Aksiyon Potansiyeli): %0</div>
            <div id="air-idx" class="element-row" style="color:#33ffff">💨 HAVA (Rezonans İletimi): %0</div>
            <div id="water-idx" class="element-row" style="color:#3399ff">💧 SU (Hemodinamik Akış): %0</div>
            <div id="earth-idx" class="element-row" style="color:#99ff33">🌱 TOPRAK (Hücresel Kararlılık): %0</div>
        </div>

        <div class="canvas-container">
            <div>📡 LEAD V5 FOCUS (Single-Cell Action Potential / mV)</div>
            <canvas id="mvOscilloscope" width="290" height="70"></canvas>
        </div>
        <div class="canvas-container">
            <div>🌀 GİRDAP REZONANS FREKANS OSİLOSKOPU (Hz)</div>
            <canvas id="hzOscilloscope" width="290" height="70"></canvas>
        </div>
    `;
    document.body.appendChild(dashboard);

    const oscCanvas = document.getElementById('mvOscilloscope');
    const oscCtx = oscCanvas.getContext('2d');
    const hzCanvas = document.getElementById('hzOscilloscope');
    const hzCtx = hzCanvas.getContext('2d');

    let historyMV = [];
    let historyHZ = [];

    const academicNames = {
        1: { short: "SAN", full: "SA Node (Doğal Kalp Pili)" },
        8: { short: "AMY", full: "Atrial Myocardium (Kulakçık Kası)" },
        4: { short: "AVN", full: "AV Node (Elektriksel Emniyet Rölesi)" },
        5: { short: "HIS", full: "His Bundle (İletim Demetleri)" },
        7: { short: "PUR", full: "Purkinje Fibers (Kılcal İletim Lifleri)" },
        2: { short: "VMY", full: "Ventricular Myocardium (Ana Pompa Motor Kası)" }
    };

    function updateTelemetryPanel() {
        requestAnimationFrame(updateTelemetryPanel);
        
        const data = window.MetatronAcademicTelemetry;
        if (!data) return;

        const listContainer = document.getElementById('telemetry-chambers-list');
        let html = '';
        
        // 🔒 TANIMLAMA KORUMASI: Tüm sayaç ve hesaplama değişkenleri döngünün en üstünde kilitlendi!
        let totalHZ = 0;
        let activeCount = 0;
        let maxCurrentHZ = 174;
        let maxMV = -90;
        let minMV = 120;
        let totalWave = 0;

        // 6 ana odayı girdap sırasıyla dön
        [1, 2, 4, 8, 7, 5].forEach((id) => {
            const ch = data[id];
            if (!ch) return;

            const hzVal = parseFloat(ch.frequencyHz);
            const mvVal = parseFloat(ch.voltageMV);
            const waveVal = parseFloat(ch.mechanicalWave);

            totalHZ += hzVal;
            totalWave += waveVal;
            activeCount++;

            if (hzVal > maxCurrentHZ) maxCurrentHZ = hzVal;
            if (mvVal > maxMV) maxMV = mvVal;
            if (mvVal < minMV) minMV = mvVal;

            const rowColor = ch.phaseState.includes("SYSTOLE") ? "rgba(0,255,200,0.1)" : "rgba(255,0,100,0.05)";
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

        // 🎯 TÜM HESAPLAMALAR VE ÇİZİMLER GÜVENLİ `activeCount > 0` BLOĞUNUN İÇİNDE!
        if (activeCount > 0) {
            
            // ========================================================================
            // 🧠 🌙 AKADEMİK KOZMİK SAAT & CSF İNTERAKSİYONU (DÜNYA DÖNGÜLERİ UYUMU)
            // ========================================================================
            const lunarPhaseEl = document.getElementById('lunar-phase');
            const csfPressureEl = document.getElementById('csf-pressure');

            if (lunarPhaseEl && csfPressureEl && data) {
                // KİLİT BAĞLANTI: data havuzundan Yeşil (id:8) ve Mavi (id:7) odaları çekiyoruz!
                const greenChamber = data[8]; // GRE - Atrial Myocardium
                const blueChamber  = data[7]; // BLU - Purkinje Fibers
                
                let greenMV = greenChamber ? parseFloat(greenChamber.voltageMV) : -90;
                let blueMV  = blueChamber ? parseFloat(blueChamber.voltageMV) : -90;

                // ORGAN-KOZMOS REZONANS MATRİSİ:
                if (blueMV > 20.0) {
                    // Mavi oda ateşlendiğinde: Enerji en uç kılcal liflere yayılır ve topraklanır.
                    lunarPhaseEl.innerHTML = "YENİ AY (Topraklama)";
                    lunarPhaseEl.style.color = "#ffffff";
                    csfPressureEl.innerHTML = "TOPRAKLANMIŞ (Sakral)";
                    csfPressureEl.style.color = "#99ff33";
                } else if (greenMV > 20.0) {
                    // Yeşil oda ateşlendiğinde: Kulakçıklar kasılır, kranial sıvı beyne hücum eder.
                    lunarPhaseEl.innerHTML = "DOLUNAY (Maksimum Akım)";
                    lunarPhaseEl.style.color = "#ffcc00";
                    csfPressureEl.innerHTML = "YÜKSEK (Kranial)";
                    csfPressureEl.style.color = "#ff3333";
                } else {
                    // Odalar dinlenme (Diyastol) fazındayken kozmik saat dengeli akış moduna geçer:
                    const slowClock = performance.now() * 0.00002; // Muazzam sakinleştirilmiş dünya saati
                    const waveClock = Math.sin(slowClock);
                    
                    if (waveClock > 0) {
                        lunarPhaseEl.innerHTML = "İLK DÖRDÜN";
                        lunarPhaseEl.style.color = "#00ffff";
                        csfPressureEl.innerHTML = "DENGELİ (Akışkan)";
                        csfPressureEl.style.color = "#00ffff";
                    } else {
                        lunarPhaseEl.innerHTML = "SON DÖRDÜN";
                        lunarPhaseEl.style.color = "#00ffaa";
                        csfPressureEl.innerHTML = "DENGELİ (Alçalan)";
                        csfPressureEl.style.color = "#00ffff";
                    }
                }
            }

            // 🔥 4 ELEMENT VE METABOLİK YOLAK HESAPLARI (Hatasız Kapsam)
            const fireScore = Math.max(0, Math.min(100, ((maxMV + 90) / 210) * 100));
            const airScore = Math.max(0, Math.min(100, (1.0 - Math.abs((totalHZ / activeCount) - 510) / 250) * 100));
            const waterScore = Math.max(0, Math.min(100, (totalWave / activeCount) * 100));
            const earthScore = Math.max(0, Math.min(100, (Math.abs(minMV) / 90) * 100));

            document.getElementById('fire-idx').innerHTML  = `🔥 ATEŞ (Aksiyon Potansiyeli): %${fireScore.toFixed(0)}`;
            document.getElementById('air-idx').innerHTML   = `💨 HAVA (Rezonans İletimi):  %${airScore.toFixed(0)}`;
            document.getElementById('water-idx').innerHTML = `💧 SU (Hemodinamik Akış):   %${waterScore.toFixed(0)}`;
            document.getElementById('earth-idx').innerHTML = `🌱 TOPRAK (Hücresel Tampon): %${earthScore.toFixed(0)}`;

            // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Yeşil)
            let leadV5Voltage = data ? parseFloat(data[4].voltageMV) : -90; // Sarı odaya (id:4) odaklı saf hücre voltajı
            historyMV.push(leadV5Voltage); 
            if (historyMV.length > oscCanvas.width) historyMV.shift();

            oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
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

            // 🔴 ALT KANAL: GİRDAP REZONANS FREKANS OSİLOSKOPU (Kırmızı)
            historyHZ.push(maxCurrentHZ);
            if (historyHZ.length > hzCanvas.width) historyHZ.shift();

            hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
            hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.2)';
            hzCtx.lineWidth = 0.5;
            for(let g = 0; g < hzCanvas.width; g += 20) {
                hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke();
                hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
            }

            hzCtx.strokeStyle = '#ff0066';hzCtx.lineWidth = 1.5;hzCtx.beginPath();const minScaleHz = 150;const maxScaleHz = 1000;const hzScaleRange = maxScaleHz - minScaleHz;for (let i = 0; i < historyHZ.length; i++) {const normalizedY = (historyHZ[i] - minScaleHz) / hzScaleRange;const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);if (i === 0) hzCtx.moveTo(i, safeY);else hzCtx.lineTo(i, safeY);}hzCtx.stroke();}}updateTelemetryPanel();})();
