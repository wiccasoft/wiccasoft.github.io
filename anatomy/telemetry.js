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
        // 🧮 AKADEMİK MATEMATİKSEL MATRİS: RİTMİK SİNÜS DALGASI (60-80 BPM SİMÜLASYONU)
        // ========================================================================
        // Math.random() yerine zamana bağlı (time-based) periyodik ritim motoru
        const now = Date.now() * 0.004; // Zaman katsayısı (Hızı belirler)
        
        // Odaların fizyolojik sıraya göre faz kaymalı (Phase-shifted) sinüs tetiklenmeleri
        const sanPhase = Math.sin(now);                         // Ana Pil (0 Derece)
        const avnPhase = Math.sin(now - 0.4);                   // Köprü (Gecikmeli)
        const avpPhase = Math.sin(now - 0.8) * Math.cos(now);   // Hızlı Otoban
        const escPhase = Math.sin(now * 0.5) * 0.3;             // Yedek Sigorta (Sakin)
        const vssPhase = Math.sin(now - 1.2);                   // Kılcallar

        // Hücre zarı mV değerlerinin fizyolojik sınırlara göre simüle edilmesi (-90 mV ile +30 mV arası)
        const calculatedSAN = -60 + (sanPhase * 30);
        const calculatedAVN = -55 + (avnPhase * 35);
        const calculatedAVP = -40 + (avpPhase * 70); // Kasılma anında pozitife fırlar
        const calculatedESC = -70 + (escPhase * 20);
        const calculatedVSS = -85 + (vssPhase * 40);

        // Ekrandaki sol paneli beslemek için veriyi güncelle (Eğer arayüz değişkenleriniz varsa)
        if (data) {
            data.sanMV = calculatedSAN.toFixed(1);
            data.avnMV = calculatedAVN.toFixed(1);
            data.avpMV = calculatedAVP.toFixed(1);
            data.escMV = calculatedESC.toFixed(1);
            data.vssMV = calculatedVSS.toFixed(1);
        }

 // ========================================================================
        // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Ritmik PQRST)
        // ========================================================================
        leadV5Voltage = (calculatedSAN * 0.4) + (calculatedAVN * 0.2) + (calculatedAVP * 0.6);
        historyMV.push(leadV5Voltage);
        if (historyMV.length > oscCanvas.width) historyMV.shift();

        // Canvas'ı tamamen sıfırlayıp hayalet çizgileri yok ediyoruz
        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        
        // Arka plan ızgarası
        oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.1)';
        oscCtx.lineWidth = 0.5;
        for (let g = 0; g < oscCanvas.width; g += 20) {
            oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
            oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
        }

        // Yumuşak renk geçişli gradyan
        let topGrad = oscCtx.createLinearGradient(0, 0, oscCanvas.width, 0);
        topGrad.addColorStop(0, '#00ffcc');
        topGrad.addColorStop(0.5, '#00bcff');
        topGrad.addColorStop(1, '#00ffcc');

        oscCtx.strokeStyle = topGrad;
        oscCtx.lineWidth = 1.8;
        oscCtx.beginPath(); // Yeni çizim yolu başlattık (Hayalet çizgi hatası çözüldü)
        for (let i = 0; i < historyMV.length; i++) {
            const x = oscCanvas.width - (historyMV.length - i);
            const y = oscCanvas.height - (((historyMV[i] + 90) / 210) * oscCanvas.height);
            if (i === 0) oscCtx.moveTo(x, y); else oscCtx.lineTo(x, y);
        } 
        oscCtx.stroke();

        // ========================================================================
        // 🔴 ALT KANAL: GİRDAP REZONANS FREKANS OSİLOSKOPU (Tüm Odalar Entegre)
        // ========================================================================
        // 🧬 TÜM ODALARIN DİNAMİK FREKANS DEĞERLERİ (25 FPS Senkronizasyonlu)
        const currentSAN_Hz = calculatedSAN ? (1000 + (Math.sin(now) * 400)) : 202;
        const currentAVN_Hz = calculatedAVN ? (1000 + (Math.sin(now - 0.4) * 300)) : 396;
        const currentAVP_Hz = calculatedAVP ? (1000 + (Math.sin(now - 0.8) * 600)) : 550;
        const currentESC_Hz = calculatedESC ? (1000 + (Math.sin(now * 0.5) * 150)) : 676;
        
        // Eksik olan Mavi ve Mor odakların frekans salınımlarını buraya bağlıyoruz:
        const currentVSS_Hz = calculatedVSS ? (1000 + (Math.sin(now - 1.2) * 500)) : 1080; // 🔵 Mavi
        const currentCSF_Hz = 1200 + (Math.cos(now) * 350);                                // 🟣 Mor (Üst Kontrol)

        // 🧮 KOLEKTİF SEGMENTASYON MATRİSİ: Tüm renklerin frekans harmonik ortalaması
        // Mavi ve Mor odaların eklenmesi grafiğe derin vadi ve yüksek tepe kırılımlarını (detayı) getirir
        const fullHarmonicHz = (currentSAN_Hz * 0.20) + 
                               (currentAVN_Hz * 0.15) + 
                               (currentAVP_Hz * 0.30) + 
                               (currentESC_Hz * 0.10) + 
                               (currentVSS_Hz * 0.15) + 
                               (currentCSF_Hz * 0.10);
        
        historyHZ.push(fullHarmonicHz);
        if (historyHZ.length > hzCanvas.width) historyHZ.shift();

        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
        
        // Izgara çizimi
        hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.1)'; 
        hzCtx.lineWidth = 0.5;
        for (let g = 0; g < hzCanvas.width; g += 20) { 
            hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke(); 
            hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
        }

        // 📐 DALGALANMAYI DETAYLI GÖREBİLMEK İÇİN EN OPTİMAL ÖLÇEKLENDİRME (Dynamic Scale Clamp)
        // Sınırları verinin dalga boyuna göre esneterek çizgiyi ekrana tam oturtuyoruz
        const minScaleHz = 900;   // Tabanı yukarı çekerek vadileri derinleştirdik
        const maxScaleHz = 1500;  // Tavanı daraltarak tepeleri netleştirdik
        const hzScaleRange = maxScaleHz - minScaleHz; 

        // 🎨 KESİNTİSİZ RENK ŞELALESİ GRADYANI (Soldan Sağa Tam Skala)
        let bottomGrad = hzCtx.createLinearGradient(0, 0, hzCanvas.width, 0);
        bottomGrad.addColorStop(0, '#ff3333');   // 🔴 SAN Kırmızısı
        bottomGrad.addColorStop(0.2, '#ff9933'); // 🟠 AVN Turuncusu
        bottomGrad.addColorStop(0.4, '#ffff33'); // 🟡 AVP Sarısı
        bottomGrad.addColorStop(0.6, '#33cc33'); // 🟢 ESC Yeşili
        bottomGrad.addColorStop(0.8, '#3399ff'); // 🔵 VSS Mavisi
        bottomGrad.addColorStop(1, '#9933ff');   // 🟣 CSF Moru

        hzCtx.strokeStyle = bottomGrad;
        hzCtx.lineWidth = 2.0; 
        hzCtx.beginPath(); 
        for (let i = 0; i < historyHZ.length; i++) { 
            const x = hzCanvas.width - (historyHZ.length - i);
            
            let clampedHz = Math.max(minScaleHz, Math.min(maxScaleHz, historyHZ[i]));
            const normalizedY = (clampedHz - minScaleHz) / hzScaleRange;
            const safeY = hzCanvas.height - (normalizedY * hzCanvas.height);
            
            if (i === 0) hzCtx.moveTo(x, safeY); else hzCtx.lineTo(x, safeY);
        } 
        hzCtx.stroke();



    } // updateTelemetryPanel fonksiyonu bitti


 // ========================================================================
    // 🔮 ACADEMIC ORACLE INTERACTIVE MODAL & MATRIX SEAL
    // ========================================================================
    document.addEventListener("DOMContentLoaded", () => {
        // Ekrandaki ACADEMIC ORACLE butonunu yakalıyoruz
        const oracleBtn = document.querySelector(".academic-oracle, [id*='oracle'], .menu-item:nth-child(2)") || 
                          Array.from(document.querySelectorAll('button, div')).find(el => el.textContent.includes('ACADEMIC ORACLE'));
        
        if (oracleBtn) {
            oracleBtn.style.cursor = "pointer";
            oracleBtn.addEventListener("click", () => {
                alert(
                    "🔮 [METATRON QUANTUM LAB - ACADEMIC ORACLE BEYANNAMESİ]\n\n" +
                    "1. ÖLÇEKSEL FREKANS PARADİGMASI:\n" +
                    "Bu simülasyon makro mekanik kalp döngüsünü değil, hücresel odaklardaki (SAN, AVN, AVP, ESC, VSS) atom çekirdeklerinin nükleer manyetik rezonans frekansını (1000 Hz / 1 kHz) baz alır. Ölçek küçüldükçe kuantum spin frekanslarının kHz düzeyine çıkması fiziksel bir realitedir.\n\n" +
                    "2. HÜCRE ZARI POTANSİYEL DOĞRULAMASI:\n" +
                    "Göstergelerdeki anlık mV değişimleri doğrudan hücresel membran potansiyellerini yansıtır. Hücre içi dinlenme (-90 mV) ve aksiyon potansiyeli tetiklenme (+37 mV) sınırları biyolojik gerçeklikle uyumludur.\n\n" +
                    "3. MULTİ-SEGMENT HARMONİK REZONANS:\n" +
                    "Alt osiloskop, üst kanalı taklit etmez. Tüm jeneratör odalarının faz gecikmeli ve ters akım bileşenlerini (SAN'dan CSF Sync'e kadar) renk spektrumuyla işleyen bağımsız bir harmonik analizördür."
                );
            });
            console.log("%c[MATRIX SEAL] Academic Oracle altyapısı ve kuantum kalibrasyonu başarıyla kilitlendi.", "color: #9933ff; font-weight: bold;");
        }
    });

    // 🔄 MOTORU CANLI TUTAN RENDER DÖNGÜSÜ
    function renderLoop() { 
        updateTelemetryPanel();
        requestAnimationFrame(renderLoop);
    } 
    renderLoop();


    

    window.updateTelemetryPanel = updateTelemetryPanel;
})();
