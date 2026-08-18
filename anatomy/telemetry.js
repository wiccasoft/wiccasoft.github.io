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

        // ========================================================================
        // 📊 MERKEZİ ZAMAN MOTORU (Zaman Tanımları En Üste Alındı)
        // ========================================================================
        const loopTime = (Date.now()) % 800; 
        window.MetatronMasterClock = loopTime; // Küresel havuz
        const nowTime = (loopTime / 800) * Math.PI * 2; 

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

        // ⚡ SAF KORUMALI ÇÖZÜM: Girdap dizisi [1, 2, 4, 8, 7, 5] eksiksiz mühürlendi!
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

            // ========================================================================
            // 💡 ODALARI ALTTAN GELEN BAR RİTMİNE GÖRE ANLIK IŞIKLANDIRMA MOTORU
            // ========================================================================
            let rowColor = "rgba(255,255,255,0.02)"; 
            
            // 🟣 İlk 200ms -> Mor Bar (P) parladığında SAN (1) ve AVN (2) odalarını yak
            if (loopTime < 200 && (id === 1 || id === 2)) {
                rowColor = "rgba(153, 51, 255, 0.25)"; 
            }
            // 🟠 200-400ms -> Turuncu Bar (QRS) parladığında AVP (4) odasını patlat
            else if (loopTime >= 200 && loopTime < 400 && id === 4) {
                rowColor = "rgba(255, 153, 51, 0.35)"; 
            }
            // 🟢 400-800ms -> Yeşil Bar (T) parladığında VSS (5) odasını yak
            else if (loopTime >= 400 && id === 5) {
                rowColor = "rgba(51, 204, 51, 0.2)"; 
            }
            // Diğer sistol/diyastol odaları için varsayılan hafif siberpunk koruma
            else if (ch.phaseState && ch.phaseState.includes("SYSTOLE")) {
                rowColor = "rgba(0,255,200,0.1)";
            } else {
                rowColor = "rgba(255,0,100,0.05)";
            }

            const medical = academicNames[id] || { short: ch.name ? ch.name.substring(0, 3) : "CH", full: ch.name || "Chamber" };

            html += `
                <div class="chamber-row" style="background: ${rowColor}; transition: background 0.1s ease;" title="${medical.full}">
                    <span style="color: ${ch.color || '#fff'}; font-weight: bold;">${medical.short}</span>
                    <span>${ch.voltageMV || 0} mV</span>
                    <span>${ch.frequencyHz || 0} Hz</span>
                </div>
            `;
        });

        listContainer.innerHTML = html;

        // ========================================================================
        // 🔥 4 ELEMENT VE METABOLİK YOLAK HESAPLARI (Döngü Sonrası Güvenli Alan)
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
        // 🟢 ÜST KANAL: SAF VOLTAJ OSİLOSKOPU (Lead V5 - Her Vuruşta Tek Bir PQRST)
        // ========================================================================
        let p_Wave = 0;
        let qrs_Complex = 0;
        let t_Wave = 0;

        // ⏱️ Fizyolojik Zaman Kapılaması: Enerji sadece kendi evresinde akım çevirir
        if (loopTime < 200) {
            // 🟣 0 - 200ms: Sadece P Dalgası akar (SAN aktif)
            p_Wave = Math.sin((loopTime / 200) * Math.PI) * 12; 
        } 
        else if (loopTime >= 200 && loopTime < 400) {
            // 🟠 200 - 400ms: Keskin QRS Kompleksi patlar (AVP aktif)
            const qrsProgress = (loopTime - 200) / 200;
            // Çift tepe ve derin S çukuru oluşturan keskin sodyum patlaması
            qrs_Complex = Math.sin(qrsProgress * Math.PI * 2) * 55 - Math.sin(qrsProgress * Math.PI) * 15;
        } 
        else {
            // 🟢 400 - 800ms: Yumuşak T Dalgası sönümlenir (VSS aktif)
            t_Wave = Math.sin(((loopTime - 400) / 400) * Math.PI) * 18;
        }

        // Tüm fazların fizyolojik toplamı (Gereksiz ara akımlar temizlendi)
        leadV5Voltage = -60 + p_Wave + qrs_Complex + t_Wave;

        historyMV.push(leadV5Voltage);
        if (historyMV.length > oscCanvas.width) historyMV.shift();

        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        
        // Sabit Arka Plan Izgarası
        oscCtx.strokeStyle = 'rgba(26, 54, 93, 0.08)';
        oscCtx.lineWidth = 0.5;
        for (let g = 0; g < oscCanvas.width; g += 20) {
            oscCtx.beginPath(); oscCtx.moveTo(g, 0); oscCtx.lineTo(g, oscCanvas.height); oscCtx.stroke();
            oscCtx.beginPath(); oscCtx.moveTo(0, g); oscCtx.lineTo(oscCanvas.width, g); oscCtx.stroke();
        }

        // Osiloskop Çizgisi (PQRST Dalgası)
        oscCtx.strokeStyle = window.topGrad || '#00ffcc';
        oscCtx.lineWidth = 1.8;
        oscCtx.beginPath(); 
        for (let i = 0; i < historyMV.length; i++) {
            const x = i; 
            // -120 mV ile +40 mV arasını canvas yüksekliğine güvenle oranlıyoruz
            const y = oscCanvas.height - (((historyMV[i] + 120) / 160) * oscCanvas.height);
            if (i === 0) oscCtx.moveTo(x, y); else oscCtx.lineTo(x, y);
        } 
        oscCtx.stroke();



         oscCtx.stroke();

        // ========================================================================
        // 🔴 KUVVETLİ BLIP: Çift Girdap Dalgalanmasını Takip Eden Neon Nokta
        // ========================================================================
        if (historyMV.length > 0) {
            const lastIdx = historyMV.length - 1;
            const blipX = lastIdx;
            const blipY = oscCanvas.height - (((historyMV[lastIdx] + 120) / 160) * oscCanvas.height);

            // Dış Parlama Efekti (Neon Koruma)
            oscCtx.shadowBlur = 8;
            oscCtx.shadowColor = "#ff3333";

            // Merkez Kırmızı Çekirdek Nokta
            oscCtx.beginPath();
            oscCtx.arc(blipX, blipY, 4, 0, Math.PI * 2);
            oscCtx.fillStyle = "#ff3333"; // Parlak Kırmızı
            oscCtx.fill();

            // Efekti temizle (Diğer çizimleri bozmasın)
            oscCtx.shadowBlur = 0;
        }

        
        // ========================================================================
        // 📊 3 BANT SABİT BİYO-EKOLAYZIR MOTORU (P->QRS->T Akış Sıralaması)
        // ========================================================================
        let p_Height = 0;   
        let qrs_Height = 0; 
        let t_Height = 0;   

        if (loopTime < 200) {
            const progress = loopTime / 200;
            p_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.4); 
            qrs_Height = Math.sin(nowTime) * 5; 
            t_Height = Math.cos(nowTime) * 3;
        } 
        else if (loopTime >= 200 && loopTime < 400) {
            const progress = (loopTime - 200) / 200;
            qrs_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.95); 
            p_Height = Math.sin(nowTime) * 4;
            t_Height = Math.cos(nowTime) * 3;
        } 
        else {
            const progress = (loopTime - 400) / 400;
            t_Height = Math.sin(progress * Math.PI) * (hzCanvas.height * 0.55);
            p_Height = Math.cos(nowTime) * 3;
            qrs_Height = Math.sin(nowTime) * 5;
        }

        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
        
        // Sabit Arka Plan Izgarası
        hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.08)'; 
        hzCtx.lineWidth = 0.5;
        for (let g = 0; g < hzCanvas.width; g += 20) { 
            hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke(); 
            hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
        }

        const barWidth = hzCanvas.width / 4; 
        const spacing = hzCanvas.width / 8; 

        // 🟪 Bar 1: Mor (P Segmenti) -> En sol
        let gradP = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - p_Height);
        gradP.addColorStop(0, '#6600cc'); 
        gradP.addColorStop(1, '#9933ff'); 
        hzCtx.fillStyle = gradP;
        hzCtx.fillRect(spacing, hzCanvas.height - p_Height, barWidth, p_Height);

        // 🟥 Bar 2: Kırmızı + Turuncu + Sarı (QRS Zirve) -> Orta
        let gradQRS = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - qrs_Height);
        gradQRS.addColorStop(0, '#ff3333');   
        gradQRS.addColorStop(0.5, '#ff9933'); 
        gradQRS.addColorStop(1, '#ffff33');   
        hzCtx.fillStyle = gradQRS;
        hzCtx.fillRect(spacing * 2 + barWidth, hzCanvas.height - qrs_Height, barWidth, qrs_Height);

        // 🟩 Bar 3: Yeşil + Mavi (T Segmenti) -> En sağ
        let gradT = hzCtx.createLinearGradient(0, hzCanvas.height, 0, hzCanvas.height - t_Height);
        gradT.addColorStop(0, '#3399ff'); 
        gradT.addColorStop(1, '#33cc33'); 
        hzCtx.fillStyle = gradT;
        hzCtx.fillRect(spacing * 3 + barWidth * 2, hzCanvas.height - t_Height, barWidth, t_Height);

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
