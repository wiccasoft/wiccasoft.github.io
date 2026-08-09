// ============================================================================
// metatron.js - SAHNE OMURGASI VE MERKEZİ GEOMETRİ MOTORU
// ============================================================================

// Ana sayfada erişmek isteyebileceğimiz global referansları window nesnesine bağlıyoruz
window.scene = null;
window.camera = null;
window.renderer = null;

/**
 * Tüm Three.js ekosistemini (Sahne, Kamera, Renderer, Kontroller ve Metatron) sıfırdan kurar.
 */
function initMetatronEngine() {
    // 1. Ana Sahne ve Grup Kurulumu
    window.scene = new THREE.Scene(); 
    const KuantumKafesi = new THREE.Group(); 
    KuantumKafesi.name = "MERKEZI_METATRON";

    // 🔑 22.5 DERECE KUTSAL SEKİZGEN PERSPEKTİF KİLİDİ
    KuantumKafesi.rotation.y = Math.PI / 2; 
    KuantumKafesi.position.y = 0.0;
    KuantumKafesi.position.x = 0.0;
    KuantumKafesi.scale.set(1.3, 1.3, 1.3);
    window.scene.add(KuantumKafesi);

    // --- Ortografik Kamera En-Boy Oranı Düzeltmesi ---
    const aspect = window.innerWidth / window.innerHeight;
    const d = 1.6; // 🔑 KESİN ÇÖZÜM
    window.camera = new THREE.OrthographicCamera(- d * aspect, d * aspect, d, - d, 0.1, 1000);
    window.camera.position.set(5, 5, 5);
    window.camera.lookAt(0, 0, 0);

    // 🖥️ Renderer ve Siyah Perde Kilidi
    window.renderer = new THREE.WebGLRenderer({ antialias: true });
    window.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(window.renderer.domElement);
    window.renderer.setClearColor(0x000000, 1);

    // Kontroller ve Işıklar
    const controls = new THREE.OrbitControls(window.camera, window.renderer.domElement);
    controls.minPolarAngle = -Infinity;
    controls.maxPolarAngle = Infinity;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    window.scene.add(new THREE.AmbientLight(0xffffff));

    // ============================================================================
    // 🧬 GEOMETRİK İNŞA VE DOUBLE VORTEX ÇEKİRDEK KODLARINIZ (Akslar, Köşeler, Faces)
    // ============================================================================
    // 600 satırlık element aksları, corners, faces.forEach döngüsü ve 200 satırlık girdap motorunuz
    // KuantumKafesi grubuna eklenecek şekilde burada yaşayacak.
    
    // ... [Orijinal Metatron Geometrileriniz ve Parçacıklarınız] ...

    // 📏 Ekran Boyutu Değiştiğinde Kadrajı Koruyan Dinleyici (Resize Motoru)
    window.addEventListener('resize', () => {
        const currentAspect = window.innerWidth / window.innerHeight;
        window.camera.left = -d * currentAspect;
        window.camera.right = d * currentAspect;
        window.camera.top = d;
        window.camera.bottom = -d;
        window.camera.updateProjectionMatrix();
        window.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}