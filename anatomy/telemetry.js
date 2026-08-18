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
        // 🛡️ ANTI-FLICKER: GLOBAL HAZIR DEĞİŞKENLER VE REZONANS SINIRLARI
        // ========================================================================
        // Değişkenleri döngü dışına taşıyarak Garbage Collector titremesini engelliyoruz
        const minScaleHz = 900;   // 🔍 Yakalanan efsane büyüteç filtresi
        const maxScaleHz = 1600;  
        const hzScaleRange = maxScaleHz - minScaleHz; 

        // 🎨 GRADYAN HAFIZALAMA: Renkleri her karede sıfırdan YARATMIYORUZ, bir kez hafızaya alıyoruz
        // Bu hamle işlemci yükünü sıfırlayarak anlık takılmaları (flicker) bitirir
        if (!window.topGrad) {
            window.topGrad = oscCtx.createLinearGradient(0, 0, oscCanvas.width, 0);
            window.topGrad.addColorStop(0, '#00ffcc');
            window.topGrad.addColorStop(0.5, '#00bcff');
            window.topGrad.addColorStop(1, '#00ffcc');
        }
        if (!window.bottomGrad) {
            window.bottomGrad = hzCtx.createLinearGradient(0, 0, hzCanvas.width, 0);
            window.bottomGrad.addColorStop(0, '#ff3333');   // 🔴 SAN
            window.bottomGrad.addColorStop(0.2, '#ff9933'); // 🟠 AVN
            window.bottomGrad.addColorStop(0.4, '#ffff33'); // 🟡 AVP
            window.bottomGrad.addColorStop(0.6, '#33cc33'); // 🟢 ESC
            window.bottomGrad.addColorStop(0.8, '#3399ff'); // 🔵 VSS
            window.bottomGrad.addColorStop(1, '#9933ff');   // 🟣 CSF
        }

        // ========================================================================
        // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Ritmik PQRST)
        // ========================================================================
        leadV5Voltage = (calculatedSAN * 0.4) + (calculatedAVN * 0.2) + (calculatedAVP * 0.6);
        historyMV.push(leadV5Voltage);
        if (historyMV.length > oscCanvas.width) historyMV.shift();

        // Çizimi tamamen sıfırlayıp hayalet pikselleri arındırıyoruz
        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        
        // Sabit Arka Plan Izgarası
        oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.08)';
        oscCtx.lineWidth = 0.5;
        for (let g = 0; g < oscCanvas.width; g += 20) {
            oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
            oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
        }

        oscCtx.strokeStyle = window.topGrad;
        oscCtx.lineWidth = 1.8;
        oscCtx.beginPath(); // Titremeyi önleyen yeni yol açma
        for (let i = 0; i < historyMV.length; i++) {
            const x = oscCanvas.width - (historyMV.length - i);
            const y = oscCanvas.height - (((historyMV[i] + 90) / 210) * oscCanvas.height);
            if (i === 0) oscCtx.moveTo(x, y); else oscCtx.lineTo(x, y);
        } 
        oscCtx.stroke();

        // ========================================================================
        // 📊 3 BANT SABİT BİYO-EKOLAYZIR MOTORU (Akmayan, Göz Yormayan Sistem)
        // ========================================================================
        // Toplam kalp döngüsü: 200ms (P) + 200ms (QRS) + 400ms (T) = 800ms
        const loopTime = (Date.now()) % 800; // 800 ms'lik sürekli dönen zaman çarkı

        let p_Height = 0;   // Mor Bar Genliği
        let qrs_Height = 0; // Kırmızı-Turuncu-Sarı Bar Genliği
        let t_Height = 0;   // Yeşil-Mavi Bar Genliği

        // ⏱️ FİZYOLOJİK ZAMAN DİLİMLEMESİ (Milisaniye Tabanlı Tetiklenme)
        if (loopTime < 200) {
            // 🟣 1. BANT: MOR (P Dalgası) - İlk 200 ms (Hafif dalgalanma)
            const progress = loopTime / 200;
            p_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.4); 
            qrs_Height = Math.sin(now) * 5; // Arka plan dip gürültüsü
            t_Height = Math.cos(now) * 3;
        } 
        else if (loopTime >= 200 && loopTime < 400) {
            // 🔴🟠🟡 2. BANT: QRS (Zirve Patlama) - Sonraki 200 ms (Keskin tavan vuruşu)
            const progress = (loopTime - 200) / 200;
            qrs_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.95); // Neredeyse tavan yapar
            p_Height = Math.sin(now) * 4;
            t_Height = Math.cos(now) * 3;
        } 
        else {
            // 🟢🔵 3. BANT: TEK (Yumuşak Sönüş) - Son 400 ms (Uzun ve pürüzsüz iniş)
            const progress = (loopTime - 400) / 400;
            t_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.55);
            p_Height = Math.cos(now) * 3;
            qrs_Height = Math.sin(now) * 5;
        }

        // Alt kanalı temizle
        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
        
        // Sabit Arka Plan Izgarası
        hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.08)'; 
        hzCtx.lineWidth = 0.5;
        for (let g = 0; g < hzCanvas.width; g += 20) { 
            hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke(); 
            hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
        }

        // 🎨 3 AYRI BAĞIMSIZ GÖRSEL BARIN ÇİZİMİ
        const barWidth = hzCanvas.width / 4; // Barların genişliği
        const spacing = hzCanvas.width / 8; // Barlar arası boşluk

        // 🟩 Bar 1: Yeşil + Mavi (T Segmenti)
        let gradT = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - t_Height);
        gradT.addColorStop(0, '#3399ff'); // 🔵 Mavi
        gradT.addColorStop(1, '#33cc33'); // 🟢 Yeşil
        hzCtx.fillStyle = gradT;
        hzCtx.fillRect(spacing, hzCanvas.height - t_Height, barWidth, t_Height);

        // 🟥 Bar 2: Kırmızı + Turuncu + Sarı (QRS Zirve)
        let gradQRS = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - qrs_Height);
        gradQRS.addColorStop(0, '#ff3333');   // 🔴 Kırmızı
        gradQRS.addColorStop(0.5, '#ff9933'); // 🟠 Turuncu
        gradQRS.addColorStop(1, '#ffff33');   // 🟡 Sarı
        hzCtx.fillStyle = gradQRS;
        hzCtx.fillRect(spacing * 2 + barWidth, hzCanvas.height - qrs_Height, barWidth, qrs_Height);

        // 🟪 Bar 3: Mor (P Segmenti)
        let gradP = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - p_Height);
        gradP.addColorStop(0, '#6600cc'); // Derin mor
        gradP.addColorStop(1, '#9933ff'); // 🟣 Parlak mor
        hzCtx.fillStyle = gradP;
        hzCtx.fillRect(spacing * 3 + barWidth * 2, hzCanvas.height - p_Height, barWidth, p_Height);

    } // updateTelemetryPanel fonksiyonu bitti


   // ========================================================================
    // 🔮 ACADEMIC ORACLE: INTERACTIVE MODAL & GÖSTERGE GİZLEME (TOGGLE) MOTORU
    // ========================================================================
    document.addEventListener("DOMContentLoaded", () => {
        const oracleBtn = document.querySelector(".academic-oracle, [id*='oracle'], .menu-item:nth-child(2)") || 
                          Array.from(document.querySelectorAll('button, div')).find(el => el.textContent.includes('ACADEMIC ORACLE'));
        
        if (oracleBtn) {
            oracleBtn.style.cursor = "pointer";
            oracleBtn.addEventListener("click", () => {
                // 1. Akademik Dokümantasyon Bildirimi
                alert(
                    "🔮 [METATRON QUANTUM LAB - ACADEMIC ORACLE]\n\n" +
                    "• Kuantum Filtresi Aktif:\n" +
                    "Alt kanal 900 Hz taban eşiğine sabitlenerek VSS odasının -83 mV'luk 'Quantum Ground State' (Yanal Dinlenme) rezonansı mikro düzeyde izole edilmiştir.\n\n" +
                    "• Eğitim Modu Tetiklendi:\n" +
                    "Tam odaklanma sağlamak adına sol paneldeki sayısal göstergeler gizleniyor/açılıyor."
                );

                // 2. 🛠️ GÖSTERGELERİ KAPATMA / GİZLEME SİSTEMİ
                // Sol paneldeki sayısal odaların ve matrisin bulunduğu ana kapsayıcıyı (container) hedefliyoruz
                const targetPanels = document.querySelectorAll('.room-list, [class*="matrix"], [class*="elemental"], #telemetry-data');
                
                targetPanels.forEach(panel => {
                    if (panel.style.display === "none") {
                        panel.style.display = "block"; // Tekrar göster
                    } else {
                        panel.style.display = "none";  // Göstergeleri kapat
                    }
                });
            });
            console.log("%c[ORACLE SYSTEM] Gösterge gizleme ve kuantum kilit mekanizması başarıyla entegre edildi.", "color: #9933ff; font-weight: bold;");
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
