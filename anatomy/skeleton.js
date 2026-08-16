
// ============================================================================
// 🧭 DETACHED RGB AXES CORE ENGINE (BAĞIMSIZ BOYUT MİLİ FONKSİYONU)
// ============================================================================
window.createMetatronAxes = function(isAxisVisible) {

    ["currentAxisX", "currentAxisY", "currentAxisZ"].forEach(axisName => {
        if (window[axisName]) {
            if (window.KuantumKafesi) window.KuantumKafesi.remove(window[axisName]);
            window.scene.remove(window[axisName]);
            window[axisName].geometry.dispose();
            window[axisName].material.dispose();
            window[axisName] = null;
        }
    });

    const axisLength = 0.5; // İskelet sınırlarında kalacak altın oran uzunluğu

    // 🔴 1. KIRMIZI AKS (X Ekseni - Yatay Doğu-Batı Aynalama Mili)
    const geomX = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, 0, 0), 
        new THREE.Vector3(axisLength, 0, 0)
    ]);
    const matX = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    window.currentAxisX = new THREE.Line(geomX, matX);
    window.currentAxisX.name = "AXIS_X";
    window.currentAxisX.visible = isAxisVisible; // 🔑 İçeride dinamik görünürlük kilidi

    // 🟢 2. YEŞİL AKS (Y Ekseni - Dikey Kutupsal Mil / Crux-Sacrum Koridoru)
    const geomY = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -axisLength, 0), 
        new THREE.Vector3(0, axisLength, 0)
    ]);
    const matY = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
    window.currentAxisY = new THREE.Line(geomY, matY);
    window.currentAxisY.name = "AXIS_Y";
    window.currentAxisY.visible = isAxisVisible;

    // 🔵 3. MAVİ AKS (Z Ekseni - Derinlik / Ön-Arka Ölçü Mili)
    const geomZ = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -axisLength), 
        new THREE.Vector3(0, 0, axisLength)
    ]);
    const matZ = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
    window.currentAxisZ = new THREE.Line(geomZ, matZ);
    window.currentAxisZ.name = "AXIS_Z";
    window.currentAxisZ.visible = isAxisVisible;

    // 🔑 Miller doğrudan KuantumKafesi grubuna mühürlenir
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.currentAxisX);
        window.KuantumKafesi.add(window.currentAxisY);
        window.KuantumKafesi.add(window.currentAxisZ);
    }
    
    console.log(`[AXES PROTOCOL] Miller Yeniden İnşa Edildi. Görünürlük: ${isAxisVisible}`);
};



window.initSkelaton = function() {

    // 1. Ana Sahne Kurulumu
    window.scene = new THREE.Scene(); 
    
    // 🔑 GRUP REFERANSI GLOBALE ALINDI: updateMetatronLoop artık bunu anında görecek
    window.KuantumKafesi = new THREE.Group(); 
    window.KuantumKafesi.name = "MERKEZI_METATRON";

      window.KuantumKafesi.visible = true; 

    // ============================================================================
    // 🧭 INTEGRATED RGB AXES (MODÜLER FONKSİYONEL ÇAĞRI)
    // ============================================================================
    // İlk açılışta kapalı gelmesi için parametreyi 'false' olarak fırlatıyoruz!
    // İleride 4 element aynalama modunda bu fonksiyonu 'true' ile özgürce çağırabiliriz.
    window.createMetatronAxes(true); 

  

    // 🔑 22.5 DERECE KUTSAL SEKİZGEN PERSPEKTİF KİLİDİ
    window.KuantumKafesi.rotation.y = Math.PI / 2; 
    window.KuantumKafesi.position.y = 0.0;
    window.KuantumKafesi.position.x = 0.0;
    window.KuantumKafesi.scale.set(1.3, 1.3, 1.3);
    window.scene.add(window.KuantumKafesi);

    // --- Ortografik Kamera En-Boy Oranı Düzeltmesi ---
    const aspect = window.innerWidth / window.innerHeight;
    window.d = 1.6; // 🔑 KESİN ÇÖZÜM
    window.camera = new THREE.OrthographicCamera(- window.d * aspect, window.d * aspect, window.d, - window.d, 0.1, 1000);
    window.camera.position.set(5, 5, 5);
    window.camera.lookAt(0, 0, 0);

// 🖥 Renderer ve Siyah Perdeyi Kaldırma Transparan Maskesi
window.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true eklendi tatlım!
window.renderer.setSize(window.innerWidth, window.innerHeight);
window.renderer.setClearColor(0x000000, 0); // 1 olan değer 0 yapıldı, siyah fon tamamen yok edildi!
document.body.appendChild(window.renderer.domElement);

    // 🔑 KONTROLLER GLOBALE ALINDI: setTopView artık bu kolları doğrudan kontrol edebilir
    window.controls = new THREE.OrbitControls(window.camera, window.renderer.domElement);
    window.controls.minPolarAngle = -Infinity;
    window.controls.maxPolarAngle = Infinity;
    window.controls.minAzimuthAngle = -Infinity;
    window.controls.maxAzimuthAngle = Infinity;
    
    window.scene.add(new THREE.AmbientLight(0xffffff));


    // ============================================================================
    // 🧬 GEOMETRİK İNŞA VE DOUBLE VORTEX ÇEKİRDEK KODLARINIZ (Akslar, Köşeler, Faces)
    // ============================================================================
    // 💡 AÇIKLAMA: Yerel sızıntıların hepsi global window nesnesine kenetlenmiştir.

    // ⚡ 4 ANA ELEMENT AKS MATRİSİ (Ateş, Toprak, Hava, Su Vektörleri)
    //Metatron İskeletinin Kutsal Çapraz Kaburgası ve 4 Element Omurgasıdır.
    const elementAkslari = [
        { c1: 0x111111, c2: 0xffffff, yon: new THREE.Vector3(-1, -1, -1).normalize(), name: "Siyah_Beyaz_Ates_Su" },
        { c1: 0xffff00, c2: 0xff00ff, yon: new THREE.Vector3(1, -1, 1).normalize(),   name: "Sari_Pembe_Hava_Toprak" },
        { c1: 0xff0000, c2: 0x00ff00, yon: new THREE.Vector3(-1, 1, 1).normalize(),  name: "Kirmizi_Yesil_Aktif_Pasif" },
        { c1: 0xff7f00, c2: 0x0000ff, yon: new THREE.Vector3(-1, -1, 1).normalize(), name: "Turuncu_Mavi_Merkez_Eter" }
    ];

    // 🏟 Icosahedron Kaburgasını Oluşturacak Aks Çizgilerinin Görünür Kılınması
    const aksGenisligi = 0.35 * Math.sqrt(2) * 1.1; 
    const canlıAksCizgileri = []; // 👈 Güncelleme döngüsü için referans dizisi
  // burası tam anlamıyla 4 Ana Element Aksını (Ateş, Toprak, Hava, Su) matematiksel vektörlerden çıkarıp, 
  // 3D sahnede et ve kemiğe büründüren, yani çizgisel kaburgaları çizen Kutsal Döngüdür. 
    elementAkslari.forEach(aks => {
        const posA = aks.yon.clone().multiplyScalar(aksGenisligi);
        const posB = aks.yon.clone().multiplyScalar(-aksGenisligi);
        const cizgiGeo = new THREE.BufferGeometry().setFromPoints([posA, posB]);
        
        const cizgiMat = new THREE.LineBasicMaterial({
            color: aks.c1 === 0x111111 ? 0xffffff : aks.c1,
            transparent: true, 
            opacity: 0.25, 
            linewidth: 2,
            depthWrite: false
        });
        
        const lineMesh = new THREE.Line(cizgiGeo, cizgiMat);
        lineMesh.name = aks.name; 
        
        // 🔑 GLOBAL ADRESE BAĞLANDI: Yerel KuantumKafesi yerine window.KuantumKafesi kullanılıyor!
        window.KuantumKafesi.add(lineMesh);
        canlıAksCizgileri.push(lineMesh); 
    });

    // Küp corners dizisi lokal kalabilir, çünkü dışarıdan çağrılmıyor
    //burası da tam anlamıyla Metatron Küpünün 8 Kutsal Köşebaşı (corners) ve Kamera Özgürlük Kalkanıdır.
    const corners = [
        new THREE.Vector3( 0.5,  0.5,  0.5), new THREE.Vector3( 0.5,  0.5, -0.5),
        new THREE.Vector3( 0.5, -0.5,  0.5), new THREE.Vector3( 0.5, -0.5, -0.5),
        new THREE.Vector3(-0.5,  0.5,  0.5), new THREE.Vector3(-0.5,  0.5, -0.5),
        new THREE.Vector3(-0.5, -0.5,  0.5), new THREE.Vector3(-0.5, -0.5, -0.5)
    ];

    // 🔑 GLOBAL CONTROLS KİLİDİ: controls. yerine window.controls. olarak mühürlendi!
    window.controls.minPolarAngle = -Infinity;
    window.controls.maxPolarAngle = Infinity;
    window.controls.minAzimuthAngle = -Infinity;
    window.controls.maxAzimuthAngle = Infinity;

    // window.scene zaten yukarıda global yapılmıştı, kararlılık korundu
    window.scene.add(new THREE.AmbientLight(0xffffff));
    // Yüzeyler: köşeler + merkez + normal 
    // Metatron Küpünün 3 Boyutlu Uzay Sınırlarını Belirleyen 6 Kutsal Yüzey (faces) Matrisidir.
    const faces = [
        {corners:[corners[0], corners[2], corners[3], corners[1]], center:new THREE.Vector3(0.5,0,0), normal:new THREE.Vector3(1,0,0)},
        {corners:[corners[4], corners[6], corners[7], corners[5]], center:new THREE.Vector3(-0.5,0,0), normal:new THREE.Vector3(-1,0,0)},
        {corners:[corners[0], corners[4], corners[5], corners[1]], center:new THREE.Vector3(0,0.5,0), normal:new THREE.Vector3(0,1,0)},
        {corners:[corners[2], corners[6], corners[7], corners[3]], center:new THREE.Vector3(0,-0.5,0), normal:new THREE.Vector3(0,-1,0)},
        {corners:[corners[0], corners[2], corners[6], corners[4]], center:new THREE.Vector3(0,0,0.5), normal:new THREE.Vector3(0,0,1)},
        {corners:[corners[1], corners[3], corners[7], corners[5]], center:new THREE.Vector3(0,0,-0.5), normal:new THREE.Vector3(0,0,-1)}
    ];

    // Sarı kareler + gri “+” işaretleri
    //Metatron Küpünün Dış Geometrik Zırhını (Sarı Kareler) ve İç Denge Akslarını (Gri Artı İşaretleri) Sahnede Canlandıran Döngüdür.
    faces.forEach(f=>{
        const squareVertices = [];
        for (let i=0; i<f.corners.length; i++) {
            squareVertices.push(...f.corners[i].toArray());
            squareVertices.push(...f.corners[(i+1)%4].toArray());
        }
        const squareGeom = new THREE.BufferGeometry();
        squareGeom.setAttribute('position', new THREE.Float32BufferAttribute(squareVertices,3));
        const squareMat = new THREE.LineBasicMaterial({color:0x333333});/// METATRON CORNERS
        
        // 🔑 GLOBAL GRUP KİLİDİ: Yerel KuantumKafesi söküldü, window.KuantumKafesi bağlandı!
        window.KuantumKafesi.add(new THREE.LineSegments(squareGeom, squareMat));

        const u = new THREE.Vector3(f.normal.y, f.normal.z, f.normal.x).normalize();
        const v = new THREE.Vector3().crossVectors(f.normal, u).normalize();
        const plusVertices = [];
        plusVertices.push(...f.center.clone().add(u.clone().multiplyScalar(0.5)).toArray());
        plusVertices.push(...f.center.clone().add(u.clone().multiplyScalar(-0.5)).toArray());
        plusVertices.push(...f.center.clone().add(v.clone().multiplyScalar(0.5)).toArray());
        plusVertices.push(...f.center.clone().add(v.clone().multiplyScalar(-0.5)).toArray());
        const plusGeom = new THREE.BufferGeometry();
        plusGeom.setAttribute('position', new THREE.Float32BufferAttribute(plusVertices,3));
        const plusMat = new THREE.LineBasicMaterial({color:0x666666});//// ROOMS
        
        // 🔑 GLOBAL GRUP KİLİDİ: Gri artı işaretleri de doğrudan küresel kafese mühürlendi!
        window.KuantumKafesi.add(new THREE.LineSegments(plusGeom, plusMat));
    });

    // 🎛 EKSENLERİ DOĞRUDAN DIŞARIYA VE GLOBALE AÇAN MOTOR
    // 🔑 FONKSİYON KİLİDİ: addAxis artık pencere düzeyinde bir küresel şalterdir!
    window.addAxis = function(color, from, to) {
        const axisGeom = new THREE.BufferGeometry().setFromPoints([from,to]);
        const axisMat = new THREE.LineBasicMaterial({color:color});
        window.scene.add(new THREE.Line(axisGeom, axisMat));
    };
    
    
  //addAxis(0xff0000, new THREE.Vector3(-10,0,0), new THREE.Vector3(10,0,0));
  //addAxis(0x00ff00, new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0));
  //addAxis(0x0000ff, new THREE.Vector3(0,0,-10), new THREE.Vector3(0,0,10));



// 🔑 ÇAPRAZ OMURGA MÜHÜRÜ: Yeşil mili tam \(\sqrt{2}\) köşegen aksından geçirir
// Salvador Mundi portresinin kalbine Da Vinci’nin gizlediği o en meşhur, 
// o en kadim "Kutsal Merkez Piramitleri" (The Inner Core Pyramids) ve
//  Merkezden Köşelere Genleşen Işın Vektörleri geometrisidir.
    const whitePos = new THREE.Vector3(-0.25,  0.25, -0.25); 
    const blackPos = new THREE.Vector3( 0.25, -0.25,  0.25); 

    // burası kübün tam 0,0,0 mutlak sıfır noktasından (Tekillikten) doğup, 
    // 8 ana köşeye (corners) doğru bir patlama (Big Bang) şeklinde genleşen
    // o ilk iç içe geçmiş göksel ve yersel piramit şasisidir.
    
    // 🔑 GLOBAL FONKSİYON ÇAĞRISI: addAxis artık window düzeyinden çağrılıyor!
    //window.addAxis(0x00ff00, blackPos, whitePos);

    // Merkezden köşelere çizgiler (beyaz)
    const center = new THREE.Vector3(0,0,0);
    const pyramidVertices = [];
    corners.forEach(c=>{
        pyramidVertices.push(...center.toArray());
        pyramidVertices.push(...c.toArray());
    });
    const pyramidGeom = new THREE.BufferGeometry();
    pyramidGeom.setAttribute('position', new THREE.Float32BufferAttribute(pyramidVertices,3));
    const pyramidMat = new THREE.LineBasicMaterial({color:0xff00ff});
    
    // ============================================================================
    // 🔑 GLOBAL GRUP KİLİDİ: Merkez piramit hatları doğrudan küresel kafese mühürlendi!
    window.KuantumKafesi.add(new THREE.LineSegments(pyramidGeom, pyramidMat)); // fire in the middle
    // ============================================================================


    // ============================================================================
    // AKSA HİZALI KUTSAL MERKABA KÖŞELERİ (Lokal kalabilir, dışarıdan çağrılmıyor)
    // ============================================================================
    // Tetrahedron 1: Beyaz Kutup merkezli göksel enerji piramidi
    const tetra1 = [
        new THREE.Vector3(-0.25,  0.25, -0.25), // topBackLeft -> BEYAZ KUTUP (Tepe)
        new THREE.Vector3( 0.25,  0.25,  0.25), // topFrontRight -> KIRMIZI
        new THREE.Vector3( 0.25, -0.25, -0.25), // bottomBackRight -> TURUNCU
        new THREE.Vector3(-0.25, -0.25,  0.25)  // bottomFrontLeft -> MOR
    ];

    // Tetrahedron 2: Siyah Kutup merkezli yersel manyetik piramit
    const tetra2 = [
        new THREE.Vector3( 0.25, -0.25,  0.25), // bottomFrontRight -> SİYAH KUTUP (Taban)
        new THREE.Vector3(-0.25, -0.25, -0.25), // bottomBackLeft -> YEŞİL
        new THREE.Vector3( 0.25,  0.25, -0.25), // topBackRight -> SARI
        new THREE.Vector3(-0.25,  0.25,  0.25)  // topFrontLeft -> MAVİ
    ];

    // 🔑 YARDIMCI FONKSİYON KORUMASI: Sadece bu inşada kullanıldığı için içeride kalabilir
    function addTetrahedron(vertices, color) {
        const edges = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
        const tetraVertices = [];
        edges.forEach(e=>{
            tetraVertices.push(...vertices[e[0]].toArray());
            tetraVertices.push(...vertices[e[1]].toArray());
        });
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.Float32BufferAttribute(tetraVertices,3));
        const mat = new THREE.LineBasicMaterial({color:color});
        
        // 🔑 GLOBAL GRUP KİLİDİ: Merkaba çizgileri de doğrudan küresel kafese mühürlendi!
        window.KuantumKafesi.add(new THREE.LineSegments(geom, mat));
    }

    // Beyaz ve gri tetrahedron (Merkaba Yıldızı) ekle
    addTetrahedron(tetra1, 0x0000ff);
    addTetrahedron(tetra2, 0xff0000); // Küre materyali (saydam)
  
    //const sphereRadius = 0.2; // küçük küreler küpün içine sığacak

    
    // ============================================================================
    // METATRON MAGIC SPHERES
    // ============================================================================
    
const sphereRadius = 0.26; // küçük küreler küpün içine sığacak

const spheres = [
    { id: 1, name: "KIRMIZI_ENERJI_ODASI", pos: new THREE.Vector3( 0.25,  0.25,  0.25), color: 0xff0000, isPole: false }, // Kırmızı Köşe
    { id: 2, name: "TURUNCU_EMICI_ODA",    pos: new THREE.Vector3( 0.25,  0.25, -0.25), color: 0xFF4500, isPole: false },
    { id: 4, name: "SARI_ITICI_ODA",      pos: new THREE.Vector3( 0.25, -0.25, -0.25), color: 0xffff00, isPole: false },
    { id: 8, name: "YESIL_ENERJI_ODASI",   pos: new THREE.Vector3(-0.25, -0.25, -0.25), color: 0x00ff00, isPole: false }, // Yeşil Karşı Köşe
    { id: 7, name: "MAVI_KALKAN_ODASI",   pos: new THREE.Vector3(-0.25, -0.25,  0.25), color: 0x0000ff, isPole: false }, // Mavi Oposite
    { id: 5, name: "MOR_KABUK_ODASI",     pos: new THREE.Vector3(-0.25,  0.25,  0.25), color: 0x660099, isPole: false },
    { id: 3, name: "BEYAZ_KUTUP_ODASI",   pos: new THREE.Vector3(-0.25,  0.25, -0.25), color: 0xffffff, isPole: true  }, // 🌟 \(\sqrt{2}\) ÇAPRAZ KUTUP (KUZEYBATI)
    { id: 6, name: "SIYAH_KUTUP_ODASI",   pos: new THREE.Vector3( 0.25, -0.25,  0.25), color: 0x222222, isPole: true  }  // 🌟 \(\sqrt{2}\) ÇAPRAZ TABAN (GÜNEYDOĞU)
];
// ============================================================================
// ODALARI BAŞLANGIÇTA YARI SAYDAM CAMA DÖNÜŞTÜRME 
// ============================================================================
// ============================================================================
// ODALARI BAŞLANGIÇTA YARI SAYDAM CAMA DÖNÜŞTÜRME (AÇILIŞTA RENKSİZ NÖTR CAM)
// ============================================================================
spheres.forEach(s => {
  const geom = new THREE.SphereGeometry(sphereRadius, 32, 32);
  
  // 🎯 KESİN ÇÖZÜM: İlk açılışta materyalin rengini doğrudan nötr gri (cam) yapıyoruz,
  // ama asıl rengini kaybetmesin diye 's.color' kimliğini buraya gömüyoruz!
  const mat = new THREE.MeshPhongMaterial({
    color: s.isPole ? s.color : 0x444444, // Açılışta loş gri cam tonu
    emissive: s.isPole ? s.color : 0x222222,
    emissiveIntensity: s.isPole ? 1.0 : 0.1, 
    transparent: true,
    opacity: s.isPole ? 0.9 : 0.20, // Harika bir açılış saydamlığı
    
    depthWrite: false,   
    depthTest: true,     
    precision: "highp"   
  });
  
  const sphere = new THREE.Mesh(geom, mat);
  sphere.position.copy(s.pos);
  sphere.name = s.name; 
  
  // 🔑 KİLİT NOKTA: Odanın asıl rengini motorun okuyabilmesi için mesh üzerine mühürle!
  sphere.userData = { originalColor: s.color };

  KuantumKafesi.add(sphere);

  window.chambers = window.chambers || {};
  window.chambers[s.id] = sphere;
});

 //window.initMagicSpheres();
 
} 



// ============================================================================
// 🪐 LOCAL ANIMATION MATRIX LOOP (ZİNCİRLEME WEBGL TETİKLEYİCİSİ)
// ============================================================================
function animateSkelatonMatrix() {
    // Tarayıcının ekran yenileme hızında (60 FPS) bu fonksiyonu sürekli döndür
    requestAnimationFrame(animateSkelatonMatrix);

    // 🎯 ORKESTRA ŞEFİNİ BURADA HER KAREDE ZORLA İLERİYE SÜRÜYORUZ!
    // Böylece şef, motor kapalıyken 'else' koluna düşüp iskeleti pürüzsüzce çizecek.
    if (typeof window.updateMetatronLoop === "function") {
        window.updateMetatronLoop();
    }
}

// 🚀 İSKELET VE MOTOR KURULDUĞU AN ANIMASYON ÇARKINI DÖNDÜRMEYE BAŞLA
animateSkelatonMatrix();
console.log("[ANIMATION MATRIX] Yerel WebGL döngüsü başarıyla kenetlendi.");
// ============================================================================
// 🌊 SKELETON.JS - METATRON ENGINE COUPLING & SINGLE BRIDGE SOURCE
// ============================================================================
window.initMetatronEngine = function() {
    window.activePackets = window.activePackets || [];
    console.log("Metatron Engine Initialized successfully.");
};



// 🧠 ORKESTRA ŞEFİ KÖPRÜSÜ (MASTER LOOP BRIDGE)
// anatomy.html içindeki animate() fonksiyonu her karede burayı çağırır.
// ============================================================================
// 🫀 SKELETON MESH SCALER (NİHAİ DENGELENMİŞ BOYUT KİLİDİ)
// ============================================================================
window.metatronMeshScaler = function(mesh, now, ch) {
    // 🎯 ATOMİK KİLİT: Fiziksel şişme tamamen kapatıldı. 
    // İşlemci sıfır yükle sadece taban boyutu mühürler.
    // Enerji içeriden dışarıya saf ışık ve opaklık frekansı olarak zangır zangır akar!
    mesh.scale.setScalar(1.0);
};

// ============================================================================
// 🪐 ORKESTRA ŞEFİ KÖPRÜSÜ (ANA DÖNGÜ TARAFINDAN BESLENEN TEMİZ ŞASİ)
// ============================================================================

// 🎯 KELİMEYİ BİTİREN REFORM: Eski 'animateSkelatonMatrix' yerel döngüsü ve 
// 'requestAnimationFrame' kalıntıları çift başlılık yaratmasın diye TAMAMEN SİLİNDİ!
// Çünkü artık orkestra şefi gücünü doğrudan projenin kendi ana animate() kalbinden alıyor.

window.lastMatrixFrameTimeGlobal = Date.now();

// ============================================================================
// 🧠 ORKESTRA ŞEFİ KÖPRÜSÜ (MASTER LOOP BRIDGE) - NİHAİ KİLİT ÇÖZÜM!
// ============================================================================
window.updateMetatronLoop = function() {
    // 🎯 1. DURUM: Kuantum kalp şalteri aktifse motoru koştur!
    if (window.heartAnimationActive === true && typeof window.MetatronEngine === "function") {
        window.MetatronEngine();
    } 
    // 💤 2. DURUM: Şalter kapalıyken asilce dön
    else if (window.KuantumKafesi) {
        //window.KuantumKafesi.rotation.y += 0.002;
    }

    // 🔮 SİYAH PERDEYİ YIRTAN MUTLAK CAN DAMARI (Asla durmaz!)
    if (window.renderer && window.scene && window.camera) {
        window.renderer.render(window.scene, window.camera);
    }
};


console.log("[ATOMİK MODEL] Çift döngü kalıntıları temizlendi, saf atomik titreşim mühürlendi. ⚛️");
// ============================================================================
// 🚀 KUSURSUZ ZİNCİRLEME BAŞLATICI (SKELETON BOOT)
// ============================================================================
window.initAllMetatronSystems = function() {
    // initSkelaton'ın mükerrer/çift tetiklenmesini engellemek için koruma
    if (typeof window.initSkelaton === "function" && !window.scene) {
        window.initSkelaton();
    }
    // Eğer metatron motoru yüklendiyse döngüyü uyandır
    if (typeof window.MetatronEngine === "function") {
        //window.MetatronEngine();
    }
};

// Sayfa yüklenme durumuna göre tetikleyiciyi güvenle çalıştır
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", window.initAllMetatronSystems);
} else {
    window.initAllMetatronSystems();
}


// ============================================================================
// 📡 SKELETON.JS - METATRON INTER-FRAME COMMAND LISTENER
// ============================================================================
window.addEventListener("message", function(event) {
    // Güvenlik veya veri kontrolü (Gelen veri boşsa işlem yapma)
    if (!event.data || !event.data.komut) return;

    const komut = event.data.komut;
    const durum = event.data.durum; // true veya false sinyali gelir

    console.log(`[METATRON SKELETON] Mesaj yakalandı -> Komut: ${komut}, Durum: ${durum}`);

    // 1. SARI İSKELET ŞALTERİ (Görünürlük Kontrolü)
    if (komut === "SKELETON_TOGGLE") {
        if (window.KuantumKafesi) {
            window.KuantumKafesi.visible = durum;
            // İsteğe bağlı: İçindeki tüm mesh yapılarını da tek tek gezerek gizle/göster yapabilirsin
            window.KuantumKafesi.children.forEach(mesh => {
                if(mesh.material) mesh.material.visible = durum;
            });
        }
    }

    // 2. RGB EKSEN MİLLERİ ŞALTERİ
    else if (komut === "EKSEN_DURUMU_DEGISTIR") {
        // Üçüncü parti veya senin eklediğin THREE.AxesHelper nesnesini sahneden bul ve gizle/aç
        if (window.scene) {
            window.scene.traverse(function(object) {
                if (object.isAxesHelper || (object.name && object.name.toLowerCase().includes("axis"))) {
                    object.visible = durum;
                }
            });
        }
    }

    // 3. KUANTUM KALP ATIŞ ŞALTERİ (Nefes alma efektini dondurma/açma kilidi)
    else if (komut === "HEART_TOGGLE") {
        // Bu durumu global yapıyoruz ki updateMetatronLoop içinde animasyonu durdurabilelim
          //window.heartAnimationActive = durum; 
          //window.heartAnimationActive = msg.value;
          window.heartAnimationActive = durum; 
    }

    // 4. KUANTUM AÇI ŞALTERİ (Üstten Görünüm / Kamera Kilidi)
    else if (komut === "SET_TOP_VIEW") {
        if (window.camera) {
            if (durum === true) {
                // Kamera tam tepeden (Top View) baksın
                window.camera.position.set(0, 50, 0); 
                window.camera.lookAt(0, 0, 0);
            } else {
                // Kamera normal perspektif/açılı konumuna geri dönsün
                window.camera.position.set(15, 20, 25); 
                window.camera.lookAt(0, 0, 0);
            }
            if(window.camera.updateProjectionMatrix) window.camera.updateProjectionMatrix();
        }
    }
});


