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
        
        <!-- 🎯 TEK VE GERÇEK SIRKA-LÜNAR SAAT ENTEGRASYONU -->
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

        // 🎯 25 FPS SABİTLEME MOTORU (ZAMANSAL FİLTRE)
    let fpsInterval = 1000 / 25; // Saniyede tam 25 kare (Her kare arası tam 40ms nefes alma süresi)
    let lastDrawTime = performance.now();

    function updateTelemetryPanel() {
        // Tarayıcıdan bir sonraki render karesini talep et
        requestAnimationFrame(updateTelemetryPanel);
        
        // 🚨 TITREME SAVAR SAAT: Geçen süreyi ölçüyoruz, 40ms dolmadıysa bu kareyi pas geç!
        const now = performance.now();
        const elapsed = now - lastDrawTime;
        
        if (elapsed < fpsInterval) return; // Henüz 40ms olmadı, ekranı erkenden yorup titretme!
        
        // 40ms dolduğu an saati güncelle ve çizime başla (Kalan milisaniyelik kaymaları da rezonansa eşle)
        lastDrawTime = now - (elapsed % fpsInterval);

        const data = window.MetatronAcademicTelemetry;
        if (!data) return;

/*
        // Yarın yazacağımız o kutsal yön şeması:
const isDaytime = (hours >= 6 && hours < 18);

if (isDaytime) {
    // 🎨 MONA LISA MODU: Su ve enerji aşağı aksa, toprağa ve metabolik tamponlara akar.
    lunarMultiplier = (ch.id === 4 || ch.id === 5) ? 1.333 : 0.85; 
} else {
    // 🎨 SALVATOR MUNDI MODU: CSF ve voltaj yukarı kraniale, tepe odalara fırlatılır.
    lunarMultiplier = (ch.id === 1 || ch.id === 2) ? 1.618 : 0.618;
}

*/
        const listContainer = document.getElementById('telemetry-chambers-list');
        let html = '';
        
        let totalHZ = 0;
        let activeCount = 0;
        let maxCurrentHZ = 174;
        let maxMV = -90;
        let minMV = 120;
        let totalWave = 0;

        // 6 ana odayı girdap sırasıyla dön
       [1,2,4,8,7,5].forEach((id) => {
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
            // 🪐 🌙 KÜRESEL LUNAR MASTER CLOCK & BIOLOGICAL CLOCK MATRIX (GERÇEK ZAMAN)
            // ========================================================================
            // 🚨 SIFIRLANMA TAMİRİ: performance.now() yerine gerçek dünya zamanını (Date.now()) bağlıyoruz.
            // Dünyanın neresinden kim açarsa açsın, gökteki Ay'ın 29.53 günlük gerçek evresini mühürler!
            const realUnixTime = Date.now();
            
            // Ay'ın bilinen resmî sinodik döngü milisaniyesi (29.53059 gün)
            const lunarPeriodMS = 29.53059 * 24 * 60 * 60 * 1000;
            
            // Dünyadaki her çocuk için aynı anda atan küresel, sıfırlanmayan Ay takvimi (0 - 29.5 gün arası)
            // Simülasyonun çocuklara yavaş modda izletilmesi için zamanı kozmik vitesle ölçekliyoruz
            const lunarCycleDays = ((realUnixTime * 0.01) % lunarPeriodMS) / (24 * 60 * 60 * 1000) * 29.53;
            
            // Fraktal Sirkadiyen Beden Saati Hesabı (Ay döngüsünün 24 saate izdüşümü)
            const circadianHours = (lunarCycleDays / 29.53) * 24;
            const hours = Math.floor(circadianHours);
            const minutes = Math.floor((circadianHours - hours) * 60);
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            const lunarPhaseEl = document.getElementById('lunar-phase');
            const csfPressureEl = document.getElementById('csf-pressure');
            const circadianClockEl = document.getElementById('circadian-clock');
            const metabolicModeEl = document.getElementById('metabolic-mode');

            // Turuncu odanın (VMY) anlık voltajına bağlı Mikro Sistol Şoku dinlemesi
            const orangeChamber = data[2]; 
            const isOrangeFiring = orangeChamber && parseFloat(orangeChamber.voltageMV) > 20.0;

            if (lunarPhaseEl && csfPressureEl && circadianClockEl && metabolicModeEl) {
                if (isOrangeFiring) {
                    lunarPhaseEl.innerHTML = `DOLUNAY (Kranial Şok) [Lünar Gün: ${lunarCycleDays.toFixed(1)}]`;
                    lunarPhaseEl.style.color = "#ffcc00";
                    circadianClockEl.innerHTML = `${formattedTime} (SİSTOLİK ŞOK / ATEŞ ZİRVESİ)`;
                    circadianClockEl.style.color = "#ff3333";
                    csfPressureEl.innerHTML = "MAKSİMUM (Kranial Dalga fırlaması!)";
                    csfPressureEl.style.color = "#ff3333";
                    metabolicModeEl.innerHTML = "KATABOLİK (Ejeksiyon Fazı)";
                    metabolicModeEl.style.color = "#ff3333";
                } 
                else {
                    // Kalp dinlenirken küresel takvimin asıl evresine geri oturur
                    if (lunarCycleDays >= 7.4 && lunarCycleDays < 14.8) {
                        lunarPhaseEl.innerHTML = `DOLUNAY (Lünar Gün: ${lunarCycleDays.toFixed(1)})`;
                        lunarPhaseEl.style.color = "#ffcc00";
                        circadianClockEl.innerHTML = `${formattedTime} (ÖĞLE / ATEŞ)`;
                        circadianClockEl.style.color = "#ff3333";
                        csfPressureEl.innerHTML = "YÜKSEK (Kranial)";
                        csfPressureEl.style.color = "#ffcc00";
                        metabolicModeEl.innerHTML = "KATABOLİK (Ateşleme)";
                        metabolicModeEl.style.color = "#ff3333";
                    } 
                    else if (lunarCycleDays >= 22.1 && lunarCycleDays <= 29.5) {
                        lunarPhaseEl.innerHTML = `YENİ AY (Lünar Gün: ${lunarCycleDays.toFixed(1)})`;
                        lunarPhaseEl.style.color = "#ffffff";
                        circadianClockEl.innerHTML = `${formattedTime} (GECE / DERİN TOPRAK)`;
                        circadianClockEl.style.color = "#99ff33";
                        csfPressureEl.innerHTML = "TOPRAKLANMIŞ (Sakral)";
                        csfPressureEl.style.color = "#99ff33";
                        metabolicModeEl.innerHTML = "ANABOLİK (Hücre Tamiri)";
                        metabolicModeEl.style.color = "#99ff33";
                    } 
                    else if (lunarCycleDays >= 0 && lunarCycleDays < 7.4) {
                        lunarPhaseEl.innerHTML = `İLK DÖRDÜN (Lünar Gün: ${lunarCycleDays.toFixed(1)})`;
                        lunarPhaseEl.style.color = "#00ffff";
                        circadianClockEl.innerHTML = `${formattedTime} (SABAH / SU AKIŞI)`;
                        circadianClockEl.style.color = "#00ffff";
                        csfPressureEl.innerHTML = "DENGELİ (Yükselen Hidrolik)";
                        csfPressureEl.style.color = "#00ffff";
                        metabolicModeEl.innerHTML = "GELİŞİM (Metabolik Geçiş)";
                        metabolicModeEl.style.color = "#00ffff";
                    } 
                    else {
                        lunarPhaseEl.innerHTML = `SON DÖRDÜN (Lünar Gün: ${lunarCycleDays.toFixed(1)})`;
                        lunarPhaseEl.style.color = "#00ffaa";
                        circadianClockEl.innerHTML = `${formattedTime} (AKŞAM / HAVA DEVRİDAİMİ)`;
                        circadianClockEl.style.color = "#00ffaa";
                        csfPressureEl.innerHTML = "DENGELİ (Alçalan Hidrolik)";
                        csfPressureEl.style.color = "#00ffff";
                        metabolicModeEl.innerHTML = "RELAXATION (Sönümlenme)";
                        metabolicModeEl.style.color = "#00ffaa";
                    }
                }
            }

            // 🔥 4 ELEMENT VE METABOLİK YOLAK HESAPLARI
            const fireScore = Math.max(0, Math.min(100, ((maxMV + 90) / 210) * 100));
            const airScore = Math.max(0, Math.min(100, (1.0 - Math.abs((totalHZ / activeCount) - 510) / 250) * 100));
            const waterScore = Math.max(0, Math.min(100, (totalWave / activeCount) * 100));
            const earthScore = Math.max(0, Math.min(100, (Math.abs(minMV) / 90) * 100));

            document.getElementById('fire-idx').innerHTML  = `🔥 ATEŞ (Aksiyon Potansiyeli): %${fireScore.toFixed(0)}`;
            document.getElementById('air-idx').innerHTML   = `💨 HAVA (Rezonans İletimi):  %${airScore.toFixed(0)}`;
            document.getElementById('water-idx').innerHTML = `💧 SU (Hemodinamik Akış):   %${waterScore.toFixed(0)}`;
            document.getElementById('earth-idx').innerHTML = `🌱 TOPRAK (Hücresel Tampon): %${earthScore.toFixed(0)}`;

            // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Hastane Tipi Sağa Akış)
            let leadV5Voltage = data[4] ? parseFloat(data[4].voltageMV) : -90; 
            historyMV.push(leadV5Voltage); 
            if (historyMV.length > oscCanvas.width) historyMV.shift();

            oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
            oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.2)';
            oscCtx.lineWidth = 0.5;
            for(let g = 0; g < oscCanvas.width; g += 20) {
                oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
                oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
            }
            
            // 🎯 SAĞA AKIŞ TAMİRİ: Çizim döngüsünü tersten başlatarak hastane monitörü akışı sağlıyoruz!
            oscCtx.strokeStyle = '#00ffcc';
            oscCtx.lineWidth = 1.5;
            oscCtx.beginPath();
            for (let i = 0; i < historyMV.length; i++) {
                const x = oscCanvas.width - (historyMV.length - i); // Sinyal sağdan sola değil, sağa doğru akar!
                const y = oscCanvas.height - (((historyMV[i] + 90) / 210) * oscCanvas.height);
                if (i === 0) oscCtx.moveTo(x, y);
                else oscCtx.lineTo(x, y);
            }
            oscCtx.stroke();

            // 🔴 ALT KANAL: GİRDAP REZONANS FREKANS OSİLOSKOPU (Hastane Tipi Sağa Akış)
            historyHZ.push(maxCurrentHZ);
            if (historyHZ.length > hzCanvas.width) historyHZ.shift();

            hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
            hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.2)';
            hzCtx.lineWidth = 0.5;
            for(let g = 0; g < hzCanvas.width; g += 20) {
                hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke();
                hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
            }
            
            // 🎯 SAĞA AKIŞ TAMİRİ: Frekans çizgisi de sağa doğru pürüzsüz akar!
            hzCtx.strokeStyle = '#ff0066';
            hzCtx.lineWidth = 1.5;
            hzCtx.beginPath();

            const minScaleHz = 150; 
            const maxScaleHz = 1000;
            const hzScaleRange = maxScaleHz - minScaleHz;

            for (let i = 0; i < historyHZ.length; i++) {
                const x = hzCanvas.width - (historyHZ.length - i);
                const normalizedY = (historyHZ[i] - minScaleHz) / hzScaleRange;
                const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);
                if (i === 0) hzCtx.moveTo(x, safeY);
                else hzCtx.lineTo(x, safeY);
            }
            hzCtx.stroke();
        

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

            hzCtx.strokeStyle = '#ff0066';hzCtx.lineWidth = 1.5;hzCtx.beginPath();
            for (let i = 0; i < historyHZ.length; i++) {const normalizedY = (historyHZ[i] - minScaleHz) / hzScaleRange;const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);if (i === 0) hzCtx.moveTo(i, safeY);else hzCtx.lineTo(i, safeY);}hzCtx.stroke();}}updateTelemetryPanel();})();
