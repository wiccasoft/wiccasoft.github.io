// ==========================================================================================
// 📊 METATRON ADVANCED QUANTUM TELEMETRY DASHBOARD WITH LUNAR & CSF ENGINE - (c) 2026
// ==========================================================================================

// 🔋 GLOBAL ECO PERFORMANCE ENGINE (Kilitlenmeyi Kökten Çözen En Tepe Mühür)
window.metatronTargetFPS = window.metatronTargetFPS || 60; 
window.metatronPulseSpeed = 0.035;

window.togglePerformanceMode = function() {
    const btn = document.getElementById('perf-toggle-btn');
    if (!btn) return;

    if (window.metatronTargetFPS === 60) {
        window.metatronTargetFPS = 25;
        window.metatronPulseSpeed = 0.035 * 1.2; // 25 FPS Adaptasyon Çarpanı
        btn.innerText = "25 FPS (ECO)";
        btn.style.color = "#99ff33"; 
        btn.style.borderColor = "#99ff33";
        btn.style.boxShadow = "0 0 5px rgba(153,255,51,0.2)";
    } else {
        window.metatronTargetFPS = 60;
        window.metatronPulseSpeed = 0.035; 
        btn.innerText = "60 FPS (TURBO)";
        btn.style.color = "#33ffff"; 
        btn.style.borderColor = "#33ffff";
        btn.style.boxShadow = "0 0 5px rgba(51,255,255,0.2)";
    }
};

(function() {
    "use strict";

    // 1. UI ve Tıbbi Kontrol Paneli CSS Kurulumu
    const style = document.createElement('style');
    style.textContent = `
        #quantum-telemetry-dashboard {
            position: fixed; top: 10px; right: 10px; width: 320px;
            background: rgba(10, 16, 26, 0.92); border: 1px solid #1a365d;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.15); border-radius: 8px;
            font-family: 'Courier New', monospace; color: #00ffcc;
            padding: 15px; z-index: 999999 !important; font-size: 11px; 
            pointer-events: auto !important;
        }
            
        .telemetry-title { text-align: center; font-weight: bold; border-bottom: 1px dashed #1a365d; padding-bottom: 5px; margin-bottom: 10px; color: #ffffff; }
        .chamber-row { display: flex; justify-content: space-between; margin: 4px 0; padding: 2px 5px; border-radius: 3px; cursor: help; }
        .canvas-container { margin-top: 12px; border-top: 1px dashed #1a365d; padding-top: 8px; }
        canvas { background: #050a12; border: 1px solid #112244; display: block; margin-top: 5px; }
        .element-row { display: flex; justify-content: space-between; margin: 3px 0; font-weight: bold; }
        
        #perf-toggle-btn:hover { background: #222 !important; filter: brightness(1.2); }
    `;
    document.head.appendChild(style);

    const dashboard = document.createElement('div');
    dashboard.id = 'quantum-telemetry-dashboard';
    dashboard.innerHTML = `
        <div class="telemetry-title">electrocardiogram</div>

    

        <!-- ODA LİSTESİ -->
        <div id="telemetry-chambers-list"></div>
        
 <!-- 🌱 4 ELEMENTS & METABOLIC MATRIX (TABULAR ACADEMIC MODE) -->
        <div class="canvas-container">
            <div style="color:#fff; font-weight:bold; margin-bottom:6px; font-size: 0.9em; letter-spacing: 0.5px;"></div>
            
            <!-- Başlık Satırı -->
            <div class="chamber-row" style="background: rgba(255,255,255,0.05); font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 4px;">
                <span style="color: #aaa;">MATRIX</span>
                <span style="color: #aaa;">VOLTAGE</span>
                <span style="color: #aaa;">RESONANCE</span>
            </div>

            <!-- Canlı Tablo Satırları (JS Buraya Doğrudan innerHTML Çakacak) -->
            <div id="elemental-table-body">
                <!-- Canlı Veriler Buraya Akacak -->
            </div>
        </div>


   <!--<div style="display:flex; justify-content:space-between; color: #ff00ff; font-weight: bold; margin-bottom: 4px;">
            <span>Live Rhythm:</span>
            <div>
                <span id="telemetry-bpm" style="margin-right: 8px;">74 BPM (1.23 Hz)</span>
                <span id="telemetry-live-ms" style="font-size: 0.85em; opacity: 0.8;">16 ms</span>
            </div>
        </div>-->
        <div class="canvas-container">
            <div>📡  LEAD V5 FOCUS (Single-Cell Action Potential)</div>
            <canvas id="mvOscilloscope" width="290" height="70"></canvas>
        </div>
        <div class="canvas-container">
            <div>🌀 VORTEX RESONANCE FREQUENCY OSCILLOSCOPE</div>
            <canvas id="hzOscilloscope" width="290" height="70"></canvas>
        </div>
    `;
    document.body.appendChild(dashboard);


    window.metatronTargetFPS = window.metatronTargetFPS || 25; // Varsayılan  mod
    let lastTelemetryTime = performance.now();

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



        // 🔋 KINETIC ENGINE THROTTLING (Ekran Kartı ve Pil Koruyucu Baraj)
        const simdi = performance.now();
        const gecenSure = simdi - lastTelemetryTime;
        const gerekenInterval = window.metatronTargetFPS === 25 ? 40 : 16.66; // 25 FPS için 40ms, 60 FPS için 16.6ms Barajı

        if (gecenSure < gerekenInterval) {
            return; // Ekran kartı henüz dinleniyor, renderı pas geç, işlemciyi yorma!
        }
        lastTelemetryTime = simdi - (gecenSure % gerekenInterval);

  // 🩺 Live Rhythm ve Asystole (Kalp Durma) Durum Yönetimi
        const bpmEl = document.getElementById('telemetry-bpm');
        if (bpmEl) {
            //bpmEl.innerText = window.heartAnimationActive ? "74 BPM (1.23 Hz)" : "0 BPM (0.00 Hz)";
            //bpmEl.style.color = window.heartAnimationActive ? "#ff00ff" : "#ff3333"; // Durunca ölüm kırmızısı
        }

        //if (data.cycleTimeMs) document.getElementById('telemetry-live-ms').innerText = data.cycleTimeMs + " ms"
        //document.getElementById('live-rhythm-val').innerText = window.heartAnimationActive ? "74 BPM" : "0 BPM (Asystole)";
   
        const data = window.MetatronAcademicTelemetry; if (!data) return;
        // ========================================================================
        // 📊 MERKEZİ ZAMAN MOTORU (Zaman Tanımları En Üste Alındı)
        // ========================================================================
        let loopTime = 0;
        
        // 🩺 Eğer Metatron Kalbi aktifse zamanı akıt, durdurulduysa zamanı sıfırla (Düz Çizgi)
        if (window.heartAnimationActive === true) {
            loopTime = (Date.now()) % 800; 
            window.MetatronMasterClock = loopTime; // Küresel havuzu besle
        } else {
            loopTime = 0;
            window.MetatronMasterClock = 0; // Küresel havuzu ölüm çizgisine kilitle
        }
        
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
        // 🔥 4 ELEMENTS & METABOLIC PATHWAY (Hizalı Tablo & Voltaj Katmanı Motoru)
        // ========================================================================
        fireScore = Math.max(0, Math.min(100, ((maxMV + 90) / 210) * 100));
        airScore = Math.max(0, Math.min(100, (1.0 - Math.abs((totalHZ / (activeCount || 1)) - 510) / 250) * 100));
        waterScore = Math.max(0, Math.min(100, (totalWave / (activeCount || 1)) * 100));
        earthScore = Math.max(0, Math.min(100, (Math.abs(minMV) / 90) * 100));

        // 🩺 İlk Versiyondaki Canlı Voltaj ve İletkenlik Akor Hesaplamaları (Geri Döndü!)
        // Elementlerin biyofiziksel gerilim karşılıkları
        const fireVoltage  = maxMV.toFixed(1);                            // En tepe aksiyon potansiyeli voltajı
        const airResonance = (totalHZ / (activeCount || 1)).toFixed(1);   // Ortalama sistem frekans iletimi
        const waterFlow    = (totalWave * 10).toFixed(1);                 // Hemodinamik akış dalga genliği
        const earthBuffer  = minMV.toFixed(1);                            // Hücresel taban tampon voltajı

        // Tabloyu tamamen hizalı ve fütüristik renk koduyla inşa ediyoruz
        const tableBody = document.getElementById('elemental-table-body');
        if (tableBody) {
            tableBody.innerHTML = `
                <div class="chamber-row" style="background: rgba(255, 51, 51, 0.08); margin-bottom: 2px;">
                    <span style="color:#ff3333; font-weight: bold;">FIRE</span>
                    <span style="color:#ff5555;">${fireVoltage} mV</span>
                    <span style="color:#ff7777;">%${fireScore.toFixed(0)} ACT</span>
                </div>
                <div class="chamber-row" style="background: rgba(51, 255, 255, 0.08); margin-bottom: 2px;">
                    <span style="color:#33ffff; font-weight: bold;">AIR</span>
                    <span style="color:#55ffff;">${airResonance} Hz</span>
                    <span style="color:#77ffff;">%${airScore.toFixed(0)} CND</span>
                </div>
                <div class="chamber-row" style="background: rgba(51, 153, 255, 0.08); margin-bottom: 2px;">
                    <span style="color:#3399ff; font-weight: bold;">WATER</span>
                    <span style="color:#55aaff;">${waterFlow} fW</span>
                    <span style="color:#77bbyy;">%${waterScore.toFixed(0)} FLW</span>
                </div>
                <div class="chamber-row" style="background: rgba(153, 255, 51, 0.08); margin-bottom: 2px;">
                    <span style="color:#99ff33; font-weight: bold;">EARTH</span>
                    <span style="color:#aaff55;">${earthBuffer} mV</span>
                    <span style="color:#bbff77;">%${earthScore.toFixed(0)} BUF</span>
                </div>
            `;
        }
        // ========================================================================
        // ⏱️ GÜVENLİ MİLİSANİYE MOTORU (data.cycleTimeMs Bypass Alanı)
        // ========================================================================
        const msEl = document.getElementById('telemetry-live-ms');
        if (msEl) {
            if (window.heartAnimationActive === true) {
                // Eğer data.cycleTimeMs sorunluysa alternatifi olan metatronLiveMs değerini dene, o da yoksa 16ms bas
                let tazeMS = data.cycleTimeMs || data.metatronLiveMs || "16";
                // Eğer gelen verinin içinde zaten "ms" yazısı varsa mükerrer ekleme yapma
                let stringMS = String(tazeMS);
                msEl.innerText = stringMS.includes("ms") ? stringMS : (stringMS + " ms");
            } else {
                msEl.innerText = "0 ms"; // Kalp durduğunda net sıfır çizgisi
            }
        }
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
        // 📊 3-BAND BIOMECHANICAL EQUALIZER (En Sevilen Dengeli Kuantum Sürümü)
        // ========================================================================
        let p_RawEnergy = 0;   
        let qrs_RawEnergy = 0; 
        let t_RawEnergy = 0;   

        if (window.METATRON_SPECTRUM_MODEL && window.chambers) {
            window.METATRON_SPECTRUM_MODEL.forEach((ch) => {
                const mesh = window.chambers[ch.id];
                const currentWave = (mesh && mesh.userData && mesh.userData.currentWave) !== undefined 
                                    ? mesh.userData.currentWave 
                                    : 0.2;

                // 🌟 SAF REEL ENERJİ: Odanın öz ivmesi (ch.e) ile canlı dalganın hilesiz çarpımı
                const rawEnergy = Number(ch.e) * currentWave;

                if (ch.id === 1) {
                    // 🟣 P BAR (Atrial Shock): Tek oda (Kırmızı)
                    p_RawEnergy += rawEnergy; 
                } 
                else if (ch.id === 4 || ch.id === 3) {
                    // 🟠 QRS BAR (Asıl Turuncu Pompa & Beyaz Aks): 2 odanın saf toplamı
                    //635 Hz / 30 mV'luk asıl devasa kinetik gücü üreten 2 odanın saf toplam enerjisi 
                    qrs_RawEnergy += rawEnergy; 
                } 
                else if (ch.id === 5 || ch.id === 6 || ch.id === 8 || ch.id === 7) {
                    // 🟢 T BAR (Repolarization): 4 odanın (Mor, Siyah, Yeşil, Mavi) yığılmasını engellemek,
                    // fazla odayı absorbe etmek için toplam enerjiyi oda sayısı olan 4'e bölüyoruz!
                    // İşte burası o kutsal merkez, yani 528 Hz'lik sönümleyici ve dengeleyici girdap!.
                    t_RawEnergy += rawEnergy / 4; 
                }
            });
        }


window.LIVE_QRS_ENERGY = qrs_RawEnergy; // 635 Hz'lik asıl pompa deşarjı
window.LIVE_T_ENERGY = t_RawEnergy;     // 528 Hz'lik kutsal dengeleyici merkez
        // 🩺 SAF AKADEMİK NORMALİZASYON (Katsayısız Evrensel Matrix Ölçekleme)
        const energyCeiling = 4.5; 

        let p_Height   = (p_RawEnergy / energyCeiling) * hzCanvas.height;
        let qrs_Height = (qrs_RawEnergy / energyCeiling) * hzCanvas.height;
        let t_Height   = (t_RawEnergy / energyCeiling) * hzCanvas.height;

        // 🛡️ Canvas Sınır Koruyucuları (Sıvı gibi pürüzsüz limit koruması)
        p_Height   = Math.max(10, Math.min(hzCanvas.height - 10, p_Height));
        qrs_Height = Math.max(10, Math.min(hzCanvas.height - 10, qrs_Height));
        t_Height   = Math.max(10, Math.min(hzCanvas.height - 10, t_Height));

        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);
        const hzTitle = document.getElementById('hz-title');
        if (hzTitle) hzTitle.innerText = "🌀 VORTEX RESONANCE FREQUENCY OSCILLOSCOPE (Hz)";
        
        // Sabit Arka Plan Izgarası
        hzCtx.strokeStyle = 'rgba(93, 26, 54, 0.08)'; 
        hzCtx.lineWidth = 0.5;
        for (let g = 0; g < hzCanvas.width; g += 20) { 
            hzCtx.beginPath(); hzCtx.moveTo(g, 0); hzCtx.lineTo(g, hzCanvas.height); hzCtx.stroke(); 
            hzCtx.beginPath(); hzCtx.moveTo(0, g); hzCtx.lineTo(hzCanvas.width, g); hzCtx.stroke();
        }

        // ========================================================================
        // 🎨 SAHA ORTALAMA MOTORU: 3 BANLI BIOMECHANICAL EQUALIZER ÇİZİM ALANI
        // ========================================================================
        hzCtx.clearRect(0, 0, hzCanvas.width, hzCanvas.height);

        // Canvas genişliğine göre barları tam ortalayan dinamik ölçüler
        const barWidth = 32;       // Her bir barın ideal fütüristik genişliği
        const barSpacing = 16;     // Barların arasındaki asil boşluk
        const totalWidth = (barWidth * 3) + (barSpacing * 2); // Toplam matris genişliği
        
        // İlk barın başlayacağı sol koordinat (Canvası tam ortadan böler)
        const startX = (hzCanvas.width - totalWidth) / 2;

        // 🟣 Bar 1: P BAR (Atrial / Mor)
        hzCtx.fillStyle = "#ff00ff";
        hzCtx.fillRect(startX, hzCanvas.height - p_Height, barWidth, p_Height);

        // 🟠 Bar 2: QRS BAR (Turuncu Şok / Şimşek)
        hzCtx.fillStyle = "#ff9900";
        hzCtx.fillRect(startX + barWidth + barSpacing, hzCanvas.height - qrs_Height, barWidth, qrs_Height);

        // 🟢 Bar 3: T BAR (Repolarization / Yeşil-Mavi)
        hzCtx.fillStyle = "#33ff33";
        hzCtx.fillRect(startX + (barWidth * 2) + (barSpacing * 2), hzCanvas.height - t_Height, barWidth, t_Height);


    // 1. Her kalp atışında pompalanan doğal kan miktarı (Stroke Volume)
    // Turuncu odaların (ch.id 3 ve 4) ürettiği qrs_RawEnergy tavan yaptıkça mL miktarı doğal olarak 85mL sınırına fırlar!
    let liveQrs = window.LIVE_QRS_ENERGY || 0.2;
    
    // Güvenlik ve Kararlılık: liveQrs değerinin 0 ile 1 arasında kalmasını garanti altına alıyoruz (Clamping)
    liveQrs = Math.max(0, Math.min(1, liveQrs));
    
    // 55mL (gevşeme) ile 100mL (maksimum pompa) arası doğal salınım
    let strokeVolume = 55.0 + (liveQrs * 45.0); 

    // 2. Dakikada pompalanan toplam kan hacmi (Cardiac Output = SV * BPM / 1000)
    // Sistemdeki anlık BPM değerini çekiyoruz, yoksa varsayılan 72 akademi standardıdır
    let currentBPM = window.metatronCurrentBPM || window.currentBPM || 72; 
    let cardiacOutput = (strokeVolume * currentBPM) / 1000; // Litre cinsinden net debi

    // 🚀 Ana ekrana (main.html) sızdırmak için küresel belleğe mühürle!
    // Arayüzde düzgün görünmesi için virgülden sonraki basamakları sabitliyoruz (.toFixed)
    window.LIVE_STROKE_VOLUME = Number(strokeVolume.toFixed(1));
    window.LIVE_CARDIAC_OUTPUT = Number(cardiacOutput.toFixed(2));

    // 🔒 GÜVENLİK GÜNCELLEMESİ: Verinin sadece kendi ana alan adınıza gitmesini sağlayın
    // Projenizin ana ekran adresi neyse (örn: "https://metatron-sistem.local" veya mevcut konum) onu yazın.
    const TARGET_ORIGIN = window.location.origin; 

    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({
            type: "METATRON_HYDRAULICS",
            strokeVolume: window.LIVE_STROKE_VOLUME,
            cardiacOutput: window.LIVE_CARDIAC_OUTPUT
        }, TARGET_ORIGIN); // '*' yerine TARGET_ORIGIN kullanılarak veri sızıntısı önlendi.
    }

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



    // 📡 MAIN.HTML'DEN GELEN PERFORMANS SİNYALİNİ HAVADA YAKALAYAN KULAKLIK
window.addEventListener("message", (event) => {
    if (event.data && event.data.komut === "SET_TARGET_FPS") {
        const targetFPS = event.data.fps;
        window.metatronTargetFPS = targetFPS;
        
        if (targetFPS === 25) {
            window.metatronPulseSpeed = 0.035 * 1.2; // Senin o efsanevi 25 FPS çarpanın
            console.log("[TELEMETRY CORE] Engine throttled down to 25 FPS Eco Mode.");
        } else {
            window.metatronPulseSpeed = 0.035; // Orijinal saf 60 FPS akış hızı
            console.log("[TELEMETRY CORE] Engine cranked up to 60 FPS Turbo Mode.");
        }
    }
});



    window.togglePerformanceMode = function() {
    const btn = document.getElementById('perf-toggle-btn');
    if (!btn) return;

    if (window.metatronTargetFPS === 60) {
        // 🔋 ECO MODA GEÇİŞ (25 FPS)
        window.metatronTargetFPS = 25;
        window.metatronPulseSpeed = 0.035 * 1.2; // Senin o yukarıda keşfettiğin 25 FPS rezonans çarpanı!
        btn.innerText = "25 FPS (ECO)";
        btn.style.color = "#99ff33"; // Çevre dostu eko yeşili
        btn.style.borderColor = "#99ff33";
        btn.style.boxShadow = "0 0 5px rgba(153,255,51,0.2)";
    } else {
        // 🚀 TURBO MODA GEÇİŞ (60 FPS)
        window.metatronTargetFPS = 60;
        window.metatronPulseSpeed = 0.035; // Orijinal 60 FPS akış hızı
        btn.innerText = "60 FPS (TURBO)";
        btn.style.color = "#33ffff"; // Siber punk neon mavi
        btn.style.borderColor = "#33ffff";
        btn.style.boxShadow = "0 0 5px rgba(51,255,255,0.2)";
    }
};

    window.updateTelemetryPanel = updateTelemetryPanel;
})();

