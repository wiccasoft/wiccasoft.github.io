<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Siber-Biyolojik Kardiyak Elektrofizyoloji Simülatörü</title>
    <style>
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
        canvas { display: block; }
    </style>
</head>
<body>

<script src="./three.min.js"></script>
<script src="./OrbitControls.js"></script>
<script src="./metatron.js"></script>

<script>

// 🧠 1. GLOBAL DEĞİŞKENLER VE BİYO-WORKER
        window.currentMv = -90.0;
        window.currentOdaRengi = "Kırmızı";
        window.vagusBrakeActive = false;
        const biyoWorker = new Worker('neural-worker.js');

        // 📡 2. VERİ HATTINI İÇERİYE ALARAK "data is not defined" HATASI ÇÖZÜLDÜ
        biyoWorker.onmessage = function(e) {
            if (e.data.komut === "BİYOLOJİK_TELEMETRİ") {
                const data = e.data;
                window.currentMv = data.kalp.mv;
                window.currentOdaRengi = data.kalp.renk;
                window.vagusBrakeActive = data.vagusEffort >= 0.8;

                // 📯 ÜST PENCEREYE MESAJ KÖPRÜSÜ
                window.parent.postMessage({
                    komut: "EKRAN_GUNCELLE",
                    bpm: data.kalp.bpm,
                    mv: data.kalp.mv,
                    mod: data.sistemModu
                }, "*");
            }
        };

        // 🔄 3. ÇİZİM DÖNGÜSÜ (Parçacık Manipülasyonu)
  // anatomy.html içindeki animate() döngüsü:
function animate() {
    requestAnimationFrame(animate);

    if (window.scene && window.camera && window.renderer) {
        // Sahne üzerinden ismiyle yerel olarak yakalıyoruz (Globale gerek kalmadan)
        const dunyaOmurgaSelalesi = window.scene.getObjectByName("OMURGA_SELALESI");
        
        if (dunyaOmurgaSelalesi) {
            // Sinyallere (mV) göre parçacıkları dalgalandırma kodların...
        }
    }
}

        // 🪐 4. MOTORU TEK KEZ BAŞLAT
        window.addEventListener('DOMContentLoaded', () => {
            initMetatronEngine(); 
            animate();
        });
    </script>
</body>
</html>
