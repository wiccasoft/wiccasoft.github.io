// ==========================================================================================
// 📊 METATRON ADVANCED QUANTUM TELEMETRY DASHBOARD WITH LUNAR & CSF ENGINE - (c) 2026
// ==========================================================================================
(function() {
    "use strict";

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

        <div style="display:flex; justify-content:space-between; color: #ff00ff; font-weight: bold; margin-bottom: 4px;">
            <span>Gerçek Ritim:</span>
            <span id="telemetry-live-ms">Hesaplanıyor...</span>
        </div>
        
        
        <div style="background: rgba(255,255,255,0.03); padding: 7px; border-radius: 4px; border: 1px solid #1a365d; margin-bottom: 10px;">
            <div style="color:#fff; font-weight:bold; text-align:center; margin-bottom:5px; border-bottom: 1px dashed #1a365d; padding-bottom:3px;">🧠 SIRKA-LÜNAR HYDRO-CSF SYNC</div>
            <div style="display:flex; flex-direction:column; gap:4px; line-height: 14px;">
                <div style="display:flex; justify-content:space-between;">
                    <span>Kozmik Evre: <span id="lunar-phase" style="font-weight:bold;">-</span></span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>Beden Saati:  <span id="circadian-clock" style="font-weight:bold;">-</span></span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>CSF Basınç:  <span id="csf-pressure" style="font-weight:bold;">-</span></span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>Metabolizma: <span id="metabolic-mode" style="font-weight:bold;">-</span></span>
                </div>
            </div>
        </div>

        <!-- ODA LİSTESİ -->
        <div id="telemetry-chambers-list"></div>
        
        <!-- 🌱 4 ELEMENT & METABOLİK MATRİS -->
        <div class="canvas-container">
            <div style="color:#fff; font-weight:bold; margin-bottom:5px;">🌱 METABOLIC & ELEMENTAL MATRIX</div>
            <div id="fire-idx" class="element-row" style="color:#ff3333">🔥 ATEŞ (Aksiyon Potansiyeli): %0</div>
            <div id="air-idx" class="element-row" style="color:#33ffff">💨 HAVA (Rezonans İletimi): %0</div>
            <div id="water-idx" class="element-row" style="color:#3399ff">💧 SU (Hemodinamik Akış): %0</div>
            <div id="earth-idx" class="element-row" style="color:#99ff33">🌱 TOPRAK (Hücresel Tampon): %0</div>
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

    const oscCanvas = document.getElementById("mvOscilloscope");
    const oscCtx = oscCanvas ? oscCanvas.getContext("2d") : null;
    const hzCanvas = document.getElementById("hzOscilloscope");
    const hzCtx = hzCanvas ? hzCanvas.getContext("2d") : null;
    const listContainer = document.getElementById("telemetry-chambers-list");

    let historyMV = [];
    let historyHZ = [];

    const academicNames = {
        1: { short: "SAN", full: "Sinoatrial Node (Red Source)" },
        2: { short: "AVN", full: "Atrioventricular Node (Orange Absorb)" },
        3: { short: "WLC", full: "White Light Chamber" },
        4: { short: "AVP", full: "AV Propel Chamber (Yellow)" },
        5: { short: "VSS", full: "Violet Shell Chamber" },
        6: { short: "BVC", full: "Black Void Chamber" },
        7: { short: "BSC", full: "Blue Shield Shield" },
        8: { short: "GEC", full: "Green Energy Chamber" }
    };

    let fireScore = 0, airScore = 0, waterScore = 0, earthScore = 0;
    let leadV5Voltage = -90;

    function updateTelemetryPanel() {
        if (!oscCtx || !hzCtx || !listContainer) return;

        const data = window.MetatronAcademicTelemetry;
        if (!data) return;

        if (data.lunarPhase) document.getElementById('lunar-phase').innerText = data.lunarPhase;
        if (data.circadianTime) document.getElementById('circadian-clock').innerText = data.circadianTime;
        if (data.csfPressure) document.getElementById('csf-pressure').innerText = data.csfPressure + " mmHg";
        if (data.metabolicMode) document.getElementById('metabolic-mode').innerText = data.metabolicMode;
        if (data.cycleTimeMs) document.getElementById('telemetry-live-ms').innerText = data.cycleTimeMs + " ms";

        let html = "";
        let totalHZ = 0;
        let totalWave = 0;
        let activeCount = 0;

        let maxCurrentHZ = 0;
        let maxMV = -999;
        let minMV = 999;

        // ⚡ SAF KORUMALI ÇÖZÜM: Girdap dizisi filtreyi aşacak şekilde Array.from ile açıkça bağlandı!
        [1, 2, 4, 8, 7, 5].forEach((id) => {
            const ch = data[id];
            if (!ch) return;

            const hzVal = parseFloat(ch.frequencyHz) || 0;
            const mvVal = parseFloat(ch.voltageMV) || 0;
            const waveVal = parseFloat(ch.mechanicalWave) || 0;

            totalHZ += hzVal;
            totalWave += waveVal;
            activeCount++;

            if (hzVal > maxCurrentHZ) maxCurrentHZ = hzVal;
            if (mvVal > maxMV) maxMV = mvVal;
            if (mvVal < minMV) minMV = mvVal;

            historyHZ.push(hzVal);
            if (historyHZ.length > hzCanvas.width) historyHZ.shift();

            const rowColor = ch.phaseState && ch.phaseState.includes("SYSTOLE") ? "rgba(0,255,200,0.1)" : "rgba(255,0,100,0.05)";
            const medical = academicNames[id] || { short: ch.name ? ch.name.substring(0, 3) : "CH", full: ch.name || "Chamber" };

            html += `
                <div class="chamber-row" style="background: ${rowColor}" title="${medical.full}">
                    <span style="color: ${ch.color || '#fff'}; font-weight: bold;">${medical.short}</span>
                    <span>${ch.voltageMV || 0} mV</span>
                    <span>${ch.frequencyHz || 0} Hz</span>
                </div>
            `;
        });
        listContainer.innerHTML = html;

        // ========================================================================
        // 🔥 4 ELEMENT VE METABOLİK YOLAK HESAPLARI
        // ========================================================================
        fireScore = Math.max(0, Math.min(100, ((maxMV + 90) / 210) * 100));
        airScore = Math.max(0, Math.min(100, (1.0 - Math.abs((totalHZ / (activeCount || 1)) - 510) / 250) * 100));
        waterScore = Math.max(0, Math.min(100, (totalWave / (activeCount || 1)) * 100));
        earthScore = Math.max(0, Math.min(100, (Math.abs(minMV) / 90) * 100));

        document.getElementById('fire-idx').innerHTML  = `🔥 ATEŞ (Aksiyon Potansiyeli): %${fireScore.toFixed(0)}`;
        document.getElementById('air-idx').innerHTML   = `💨 HAVA (Rezonans İletimi):  %${airScore.toFixed(0)}`;
        document.getElementById('water-idx').innerHTML = `💧 SU (Hemodinamik Akış):   %${waterScore.toFixed(0)}`;
        document.getElementById('earth-idx').innerHTML = `🌱 TOPRAK (Hücresel Tampon): %${earthScore.toFixed(0)}`;

        // ========================================================================
        // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Hastane Tipi Sağa Akış)
        // ========================================================================
        leadV5Voltage = data ? parseFloat(data.voltageMV) : -90;
        historyMV.push(leadV5Voltage);
        if (historyMV.length > oscCanvas.width) historyMV.shift();

        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.2)';
        oscCtx.lineWidth = 0.5;
        for (let g = 0; g < oscCanvas.width; g += 20) {
            oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
            oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
        }

        oscCtx.strokeStyle = '#00ffcc';
        oscCtx.lineWidth = 1.5;
        oscCtx.beginPath();


// ========================================================================
        // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Hastane Tipi Sağa Akış)
        // ========================================================================
        leadV5Voltage = data ? (parseFloat(data.voltageMV) || parseFloat(data[1]?.voltageMV) || -90) : -90;
        historyMV.push(leadV5Voltage);
        if (historyMV.length > oscCanvas.width) historyMV.shift();

        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.2)';
        oscCtx.lineWidth = 0.5;
        for (let g = 0; g < oscCanvas.width; g += 20) {
            oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
            oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
        }

        oscCtx.strokeStyle = '#00ffcc';
        oscCtx.lineWidth = 1.5;
        oscCtx.beginPath();
        for (let i = 0; i < historyMV.length; i++) {
            const x = oscCanvas.width - (historyMV.length - i);
            const y = oscCanvas.height - (((historyMV[i] + 90) / 210) * oscCanvas.height);
            if (i === 0) oscCtx.moveTo(x, y); else oscCtx.lineTo(x, y);
        } 
        oscCtx.stroke();

        // ========================================================================
        // 🔴 ALT KANAL: GİRDAP REZONANS FREKANS OSİLOSKOPU
        // ========================================================================
        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
        hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.2)'; 
        hzCtx.lineWidth = 0.5;
        for (let g = 0; g < hzCanvas.width; g += 20) { 
            hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke(); 
            hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
        }

        // Değişkenler döngüden ÖNCE tanımlandı (ReferenceError Çözüldü)
        const minScaleHz = 130; 
        const maxScaleHz = 2600;
        const hzScaleRange = maxScaleHz - minScaleHz; 

        hzCtx.strokeStyle = '#ff0066';
        hzCtx.lineWidth = 1.5; 
        hzCtx.beginPath();
        for (let i = 0; i < historyHZ.length; i++) { 
            // x koordinatı sağa akacak şekilde optimize edildi (Yıldırım yığılması çözüldü)
            const x = hzCanvas.width - (historyHZ.length - i);
            const normalizedY = (historyHZ[i] - minScaleHz) / hzScaleRange;
            const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);
            if (i === 0) hzCtx.moveTo(x, safeY); else hzCtx.lineTo(x, safeY);
        } 
        hzCtx.stroke();
    } // updateTelemetryPanel fonksiyonunun gerçek kapanış parantezi

    // 🔄 MOTORU CANLI TUTAN RENDER DÖNGÜSÜ
    function renderLoop() { 
        updateTelemetryPanel();
        requestAnimationFrame(renderLoop);
    } 
    renderLoop();

    window.updateTelemetryPanel = updateTelemetryPanel;
})();
