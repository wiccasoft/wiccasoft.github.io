// ==========================================================================================
// 📊 METATRON QUANTUM TELEMETRY DASHBOARD - (c) 2026 wiccasoft
// ==========================================================================================
(function() {
    // 1. UI ve CSS Kurulumu (Ekranın sağ köşesine yapışan şık bilimsel panel)
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
        .chamber-row { display: flex; justify-content: space-between; margin: 4px 0; padding: 2px 5px; border-radius: 3px; }
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
            <div>📡 ACTION POTENTIAL (mV Osiloskop)</div>
            <canvas id="mvOscilloscope" width="290" height="80"></canvas>
        </div>
        <div class="canvas-container">
            <div>🌀 RESONANCE FFT POWER SPECTRUM (Hz)</div>
            <canvas id="hzSpectrum" width="290" height="80"></canvas>
        </div>
    `;
    document.body.appendChild(dashboard);

    const oscCanvas = document.getElementById('mvOscilloscope');
    const oscCtx = oscCanvas.getContext('2d');
    const specCanvas = document.getElementById('hzSpectrum');
    const specCtx = specCanvas.getContext('2d');

    let historyMV = []; // Osiloskop çizgi hafızası

    // 2. Canlı Güncelleme Döngüsü (Three.js'i yormadan bağımsız çalışır)
    function updateTelemetryPanel() {
        requestAnimationFrame(updateTelemetryPanel);
        
        const data = window.MetatronAcademicTelemetry;
        if (!data) return;

        const listContainer = document.getElementById('telemetry-chambers-list');
        let html = '';
        let totalMV = 0;
        let activeCount = 0;

        // 6 ana odayı listele ve anlık verileri bas
        [1, 2, 4, 8, 7, 5].forEach((id) => {
            const ch = data[id];
            if (!ch) return;

            totalMV += parseFloat(ch.voltageMV);
            activeCount++;

            // Hücre durumuna göre renk atanması
            const rowColor = ch.phaseState.includes("SYSTOLE") ? "rgba(0,255,200,0.1)" : "rgba(255,0,100,0.05)";
            
            html += `
                <div class="chamber-row" style="background: ${rowColor}">
                    <span style="color: ${ch.color}">${ch.name.substring(0,3)}</span>
                    <span>${ch.voltageMV} mV</span>
                    <span>${ch.frequencyHz} Hz</span>
                </div>
            `;
        });
        listContainer.innerHTML = html;

        // 3. mV Osiloskop Çizimi
        if (activeCount > 0) {
            let avgMV = totalMV / activeCount;
            historyMV.push(avgMV);
            if (historyMV.length > oscCanvas.width) historyMV.shift();

            oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
            oscCtx.strokeStyle = '#00ffcc';
            oscCtx.lineWidth = 1.5;
            oscCtx.beginPath();
            
            for (let i = 0; i < historyMV.length; i++) {
                // -90mV ile +25mV arasını Canvas yüksekliğine (80px) sığdırıyoruz
                const y = oscCanvas.height - (((historyMV[i] + 90) / 115) * oscCanvas.height);
                if (i === 0) oscCtx.moveTo(i, y);
                else oscCtx.lineTo(i, y);
            }
            oscCtx.stroke();
        }

        // 4. HZ FFT Spektrum Çizimi (Barlar)
        specCtx.clearRect(0, 0, specCanvas.width, specCanvas.height);
        const barWidth = specCanvas.width / 6;
        let barIdx = 0;

        [1, 2, 4, 8, 7, 5].forEach((id) => {
            const ch = data[id];
            if (!ch) return;

            const waveEnergy = parseFloat(ch.mechanicalWave); // 0.20 - 1.0 arası
            const barHeight = waveEnergy * specCanvas.height;

            // Gradyan bar rengi (Kasılma şiddetine göre parlar)
            specCtx.fillStyle = ch.phaseState.includes("SYSTOLE") ? `rgba(0, 255, 200, ${waveEnergy})` : `rgba(0, 100, 255, ${waveEnergy})`;
            specCtx.fillRect(barIdx * barWidth, specCanvas.height - barHeight, barWidth - 4, barHeight);
            
            barIdx++;
        });
    }

    // Döngüyü başlat
    updateTelemetryPanel();
})();