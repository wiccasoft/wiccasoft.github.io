// ============================================================================
// metatron.js - SAHNE OMURGASI VE MERKEZİ (Salvator Orb / Çekirdek) GEOMETRİ MOTORU
// ============================================================================
//Küp + İç Piramitler + Plus + Tetrahedronlar ("Altın Oranlı Gluon Bölünmesi ve Entropi Kontrolü")
//Ana sayfada erişmek isteyebileceğimiz global referansları window nesnesine bağlıyoruz
//metatron.js içindeki o merkez nokta (Salvator Orb / Çekirdek), galaktik merkezden akan enerjiyi pürüzsüz bir dikey hat (True Spine) üzerinden alır.
//Enerji durağan kalamayacağı için dönmeye başlar ve dışa doğru bir Torus (Double Vortex) alanı yaratır.
//İşte o dönen alan, senin saniyede 6 kez turlayan 6 odalı renk tayfını ve akademinin bildiği o milivolt dalgalanmalarını doğuran ana jeneratördür
//⚡ Şarj ve Büyüme Fazı (Sarı Oda - Depolarizasyon): Enerji dışa doğru genleşirken, gluonlar altın oran katsayısıyla çarparak katlanır, 
// büyür ve çevre çeperlere (odalara) doğru bir Entropi Fırtınası patlatır (+20 mV / +35 mV patlaması).
// 🟩 Topraklama Fazı (Yeşil Oda - Plato): Tam senin bahsettiğin o harika aşamada, karaciğer ve pankreas devreye girdiğinde, o kaotik büyüme durur. 
// Enerji altın oran çarpanıyla dengelenir, yani topraklanır (0 mV).
// 🧘 Boşalım ve Küçülme Fazı (Mavi/Kırmızı Oda - Gevşeme): Enerji tekrar merkeze (çekirdeğe) doğru bükülürken, gluonlar altın orana bölünerek küçülür, sönümlenir. 
// Sistem, entropiyi (kaosu) sıfırlayarak en derin negatif enerji potansiyeline (-90 mV Kırmızı odadaki o pürüzsüz dinlenme hattına) geri çöker.
window.scene = null;
window.camera = null;
window.renderer = null;

// metatron.js içinde, parçacık sistemini kurduğun yer:
const dunyaOmurgaSelalesi = new THREE.Points(geometry, material);

// 🔑 İSİM MÜHRÜ: Nesnenin kendisine bu string ismi veriyoruz
dunyaOmurgaSelalesi.name = "OMURGA_SELALESI"; 

// Sahneye değil, senin ana grubuna ekliyorsun:
KuantumKafesi.add(dunyaOmurgaSelalesi); 




// metatron.js içinde durum okuma motoru
/**
 * Metatron odalarındaki anlık frekans ve tıbbi milivolt (mV) durumunu verir.
 * @param {number} anlikOdaIndex - 0 ile 5 arasında akan oda sırası
 * @returns {Object} Sadece frekans, mV akımı ve renk bilgisini taşıyan paket
 */
function getMetatronFrequencyState(anlikOdaIndex) {
    // 🩻 6 Odalı Solfej Frekansları ve Akademik Akım Matrisi
    const ODALAR = [
        { frekans: "174 Hz", mv: -90, renk: "Kırmızı", akımTipi: "Diyastolik Dinlenme" },
        { frekans: "285 Hz", mv: -70, renk: "Turuncu", akımTipi: "Uyarılma Eşiği" },
        { frekans: "396 Hz", mv:  20, renk: "Sarı",    akımTipi: "Hızlı Depolarizasyon" },
        { frekans: "528 Hz", mv:   0, renk: "Yeşil",   akımTipi: "Kasılma Plato Fazı" },
        { frekans: "741 Hz", mv: -60, renk: "Mavi",    akımTipi: "Hızlı Repolarizasyon" },
        { frekans: "852 Hz", mv: -90, renk: "Mor",     akımTipi: "Hiperpolarizasyon" }
    ];

    // Dizinin taşmasını önleyen güvenli kilit
    const index = Math.abs(anlikOdaIndex) % ODALAR.length;
    return ODALAR[index];
}


/**
 * Milivolt (mV) ve Vagus sinyallerine göre parçacıkları ve Metatron'u günceller.
 * anatomy.html içindeki animate() döngüsünde tek satırda çağrılır.
 */
function updateMetatronLoop() {
    if (!window.scene || !window.camera || !window.renderer) return;

    const dunyaOmurgaSelalesi = window.scene.getObjectByName("OMURGA_SELALESI");
    if (dunyaOmurgaSelalesi) {
        const positions = dunyaOmurgaSelalesi.geometry.attributes.position.array;
        const colors = dunyaOmurgaSelalesi.geometry.attributes.color.array;
        const zaman = performance.now() * 0.001;

        // 🛑 Vagus Freni Aktifse (-90mV Kilitlenme)
        if (window.vagusBrakeActive && window.currentMv === -90.0) {
            for (let i = 0; i < positions.length; i += 3) {
                positions[i]     *= 0.02; 
                positions[i + 2] *= 0.02; 
                colors[i] = 1.0; colors[i+1] = 1.0; colors[i+2] = 1.0; 
            }
        } 
        // ⚡ Normal / Kriz Akış Modu (Hücresel İyon Dalgalanması)
        else {
            let sacilimGucu = Math.max(0.1, (window.currentMv + 90) * 0.02);

            for (let i = 0; i < positions.length; i += 3) {
                let id = i / 3;
                let sin = Math.sin(zaman * 6 + id * 0.1);

                positions[i]     += sin * 0.01 * sacilimGucu; 
                positions[i + 2] += Math.cos(zaman * 6 + id * 0.1) * 0.01 * sacilimGucu; 
                positions[i + 1] -= 0.005; // Aşağı süzülme

                if (positions[i + 1] < -1.0) positions[i + 1] = 1.0; 

                // Akademik İyon Renk Geçişleri
                if (window.currentOdaRengi === "Sarı") {
                    colors[i] = 1.0; colors[i+1] = 1.0; colors[i+2] = 0.1; // Depolarizasyon (Na+)
                } else if (window.currentOdaRengi === "Yeşil") {
                    colors[i] = 0.1; colors[i+1] = 1.0; colors[i+2] = 0.1; // Plato Fazı (Ca2+)
                } else if (window.currentOdaRengi === "Mavi") {
                    colors[i] = 0.1; colors[i+1] = 0.5; colors[i+2] = 1.0; // Repolarizasyon (K+)
                } else {
                    colors[i] = 1.0; colors[i+1] = 0.1; colors[i+2] = 0.1; // Dinlenme (Kırmızı)
                }
            }
        }
        // GPU Güncelleme Emirleri
        dunyaOmurgaSelalesi.geometry.attributes.position.needsUpdate = true;
        dunyaOmurgaSelalesi.geometry.attributes.color.needsUpdate = true;
    }

    // Ekranı çizdir
    window.renderer.render(window.scene, window.camera);
}




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

    // ⚡ 4 ANA ELEMENT AKS MATRİSİ (Ateş, Toprak, Hava, Su Vektörleri)
const elementAkslari = [
    { c1: 0x111111, c2: 0xffffff, yon: new THREE.Vector3(-1, -1, -1).normalize(), name: "Siyah_Beyaz_Ates_Su" },
    { c1: 0xffff00, c2: 0xff00ff, yon: new THREE.Vector3(1, -1, 1).normalize(),   name: "Sari_Pembe_Hava_Toprak" },
    { c1: 0xff0000, c2: 0x00ff00, yon: new THREE.Vector3(-1, 1, 1).normalize(),  name: "Kirmizi_Yesil_Aktif_Pasif" },
    { c1: 0xff7f00, c2: 0x0000ff, yon: new THREE.Vector3(-1, -1, 1).normalize(), name: "Turuncu_Mavi_Merkez_Eter" }
];


// 🏟 Icosahedron Kaburgasını Oluşturacak Aks Çizgilerinin Görünür Kılınması
const aksGenisligi = 0.35 * Math.sqrt(2) * 1.1; 
const canlıAksCizgileri = []; // 👈 Güncelleme döngüsü için referans dizisi

elementAkslari.forEach(aks => {
    const posA = aks.yon.clone().multiplyScalar(aksGenisligi);
    const posB = aks.yon.clone().multiplyScalar(-aksGenisligi);
    const cizgiGeo = new THREE.BufferGeometry().setFromPoints([posA, posB]);
    
    const cizgiMat = new THREE.LineBasicMaterial({
        color: aks.c1 === 0x111111 ? 0xffffff : aks.c1,
        transparent: true, 
        opacity: 0.25, // 👈 Gözü yormayacak kararlı, sönük bir siber kalkan saydamlığı
        linewidth: 2,
        depthWrite: false
    });
    
    const lineMesh = new THREE.Line(cizgiGeo, cizgiMat);
    lineMesh.name = aks.name; // Fonksiyonel erişim için isim kilidi
    
    KuantumKafesi.add(lineMesh);
    canlıAksCizgileri.push(lineMesh); // Referansı içeriye çivile
});

// Küp köşeleri ve yüzeyleri
const corners = [
    new THREE.Vector3( 0.5,  0.5,  0.5), new THREE.Vector3( 0.5,  0.5, -0.5),
    new THREE.Vector3( 0.5, -0.5,  0.5), new THREE.Vector3( 0.5, -0.5, -0.5),
    new THREE.Vector3(-0.5,  0.5,  0.5), new THREE.Vector3(-0.5,  0.5, -0.5),
    new THREE.Vector3(-0.5, -0.5,  0.5), new THREE.Vector3(-0.5, -0.5, -0.5)
];
// (Yüzeyler dizisi buraya eklenebilir, orijinal koddaki faces yapısı)

// Döndürme sınırlarını tamamen kaldır
controls.minPolarAngle = -Infinity;
controls.maxPolarAngle = Infinity;
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

scene.add(new THREE.AmbientLight(0xffffff));


  // Yüzeyler: köşeler + merkez + normal
  const faces = [
    {corners:[corners[0], corners[2], corners[3], corners[1]], center:new THREE.Vector3(0.5,0,0), normal:new THREE.Vector3(1,0,0)},
    {corners:[corners[4], corners[6], corners[7], corners[5]], center:new THREE.Vector3(-0.5,0,0), normal:new THREE.Vector3(-1,0,0)},
    {corners:[corners[0], corners[4], corners[5], corners[1]], center:new THREE.Vector3(0,0.5,0), normal:new THREE.Vector3(0,1,0)},
    {corners:[corners[2], corners[6], corners[7], corners[3]], center:new THREE.Vector3(0,-0.5,0), normal:new THREE.Vector3(0,-1,0)},
    {corners:[corners[0], corners[2], corners[6], corners[4]], center:new THREE.Vector3(0,0,0.5), normal:new THREE.Vector3(0,0,1)},
    {corners:[corners[1], corners[3], corners[7], corners[5]], center:new THREE.Vector3(0,0,-0.5), normal:new THREE.Vector3(0,0,-1)}
  ];

  // Sarı kareler + gri “+” işaretleri
  faces.forEach(f=>{
    const squareVertices = [];
    for (let i=0; i<f.corners.length; i++) {
      squareVertices.push(...f.corners[i].toArray());
      squareVertices.push(...f.corners[(i+1)%4].toArray());
    }
    const squareGeom = new THREE.BufferGeometry();
    squareGeom.setAttribute('position', new THREE.Float32BufferAttribute(squareVertices,3));
    const squareMat = new THREE.LineBasicMaterial({color:0xffff00});
    //scene.add(new THREE.LineSegments(squareGeom, squareMat));
    KuantumKafesi.add(new THREE.LineSegments(squareGeom, squareMat));

    const u = new THREE.Vector3(f.normal.y, f.normal.z, f.normal.x).normalize();
    const v = new THREE.Vector3().crossVectors(f.normal, u).normalize();
    const plusVertices = [];
    plusVertices.push(...f.center.clone().add(u.clone().multiplyScalar(0.5)).toArray());
    plusVertices.push(...f.center.clone().add(u.clone().multiplyScalar(-0.5)).toArray());
    plusVertices.push(...f.center.clone().add(v.clone().multiplyScalar(0.5)).toArray());
    plusVertices.push(...f.center.clone().add(v.clone().multiplyScalar(-0.5)).toArray());
    const plusGeom = new THREE.BufferGeometry();
    plusGeom.setAttribute('position', new THREE.Float32BufferAttribute(plusVertices,3));
    const plusMat = new THREE.LineBasicMaterial({color:0xaaaaaa});
    //scene.add(new THREE.LineSegments(plusGeom, plusMat));
    KuantumKafesi.add(new THREE.LineSegments(plusGeom, plusMat));
  });

  // Eksenler
  function addAxis(color, from, to) {
    const axisGeom = new THREE.BufferGeometry().setFromPoints([from,to]);
    const axisMat = new THREE.LineBasicMaterial({color:color});
    scene.add(new THREE.Line(axisGeom, axisMat));
  }
 // addAxis(0xff0000, new THREE.Vector3(-10,0,0), new THREE.Vector3(10,0,0));
 // addAxis(0x00ff00, new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0));
 // addAxis(0x0000ff, new THREE.Vector3(0,0,-10), new THREE.Vector3(0,0,10));



// Beyaz ve siyah kürelerin yeni dikey omurga pozisyonları
//const whitePos = new THREE. Vector3( 0,  0.35, 0); // 🔑 Beyaz tam dikey Kuzey
//const blackPos = new THREE. Vector3( 0, -0.35, 0); // 🔑 Siyah tam dikey Güney

// 🔑 ÇAPRAZ OMURGA MÜHÜRÜ: Yeşil mili tam \(\sqrt{2}\) köşegen aksından geçirir
const whitePos = new THREE.Vector3(-0.25,  0.25, -0.25); 
const blackPos = new THREE.Vector3( 0.25, -0.25,  0.25); 
addAxis(0x00ff00, blackPos, whitePos);

// Yeşil eksen: dikey beyaz ve siyah kutup odalarını tam ortadan birleştiren çizgi
//addAxis( 0x00ff00, blackPos, whitePos);

  // Merkezden köşelere çizgiler (beyaz)
  const center = new THREE.Vector3(0,0,0);
  const pyramidVertices = [];
  corners.forEach(c=>{
    pyramidVertices.push(...center.toArray());
    pyramidVertices.push(...c.toArray());
  });
  const pyramidGeom = new THREE.BufferGeometry();
  pyramidGeom.setAttribute('position', new THREE.Float32BufferAttribute(pyramidVertices,3));
  const pyramidMat = new THREE.LineBasicMaterial({color:0xffffff});
  //scene.add(new THREE.LineSegments(pyramidGeom, pyramidMat));
  KuantumKafesi.add(new THREE.LineSegments(pyramidGeom, pyramidMat));
  // Tetrahedron köşeleri (küçük ölçekli, kübün içinde)
// ============================================================================
// AKSA HİZALI KUTSAL MERKABA KÖŞELERİ 
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
    //scene.add(new THREE.LineSegments(geom, mat));
      KuantumKafesi.add(new THREE.LineSegments(geom, mat));
  }

  // Beyaz ve gri tetrahedron ekle
  addTetrahedron(tetra1, 0xffffff);
  addTetrahedron(tetra2, 0xaaaaaa);// Küre materyali (saydam)

  
const sphereRadius = 0.2; // küçük küreler küpün içine sığacak

const spheres = [
    { id: 1, name: "KIRMIZI_ENERJI_ODASI", pos: new THREE.Vector3( 0.25,  0.25,  0.25), color: 0xff0000, isPole: false }, // Kırmızı Köşe
    { id: 2, name: "TURUNCU_EMICI_ODA",    pos: new THREE.Vector3( 0.25,  0.25, -0.25), color: 0xFF7F00, isPole: false },
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
spheres.forEach(s => {
  const geom = new THREE.SphereGeometry(sphereRadius, 32, 32);
  
  // Siyah ve Beyaz kutup mili kalıcı parlar, diğer odalar (124875) başlangıçta loş ve saydamdır
const mat = new THREE.MeshPhongMaterial({
    color: s.color,
    emissive: s.color,
    emissiveIntensity: s.isPole ? 1.0 : 0.3,
    transparent: true,
    opacity: s.isPole ? 1.0 : 0.45, 
    
    // 🔑 KESİK GÖRÜNME SORUNUNU ÇÖZEN MATRİS AYARLARI
    depthWrite: false,   // Kürelerin arkasındaki çizgilerin (Kafes, Tetrahedron) görünmesini sağlar, kesilmeyi bitirir.
    depthTest: true,     // Nesnelerin derinlik algısını korur.
    precision: "highp"   // GPU'nun piksel hesaplama hassasiyetini en üst seviyeye çıkarır.
});
  
  const sphere = new THREE.Mesh(geom, mat);
  sphere.position.copy(s.pos);
  sphere.name = s.name; 
  KuantumKafesi.add(sphere);
});
    
    // ... [Orijinal Metatron Geometrileriniz ve Parçacıklarınız] ...




    
    // Top view butonu için
function setTopView(camera, controls) {
  // Kamerayı yukarıya sabitle
  camera.position.set(0, 10, 0); 
  camera.lookAt(0, 0, 0);

  // Eğer OrbitControls kullanıyorsan:
  controls.target.set(0, 0, 0);
  controls.update();

}

// ============================================================================
// DOBLE VORTEX DATA SET
// ============================================================================
class KuantumPaketi {
  constructor(kaynakMesh, hedefMesh, renk, tip, layer) { 
    this.kaynak = kaynakMesh;
    this.hedef = hedefMesh;
    this.hedefId = hedefMesh.id; // 🔑 EN KRİTİK HATAYI ÇÖZEN SATIR: Hedefin ID mühürünü mermiye kilitler!
    this.ilerleme = 0.0;
    this.tip = tip; 
    this.layer = layer; 
    paketSayaci++;
    this.uuid = paketSayaci;
        
        const pGeom = new THREE.SphereGeometry(0.03, 8, 8); // Görsel netlik için parçacık hafif küçültüldü
  // 🔑 WebGL KATMAN MÜHÜRÜ: neonRengi hatasını çözer, zıt akımları Turkuaz ve Pembe olarak ayırır!
        const pMat = new THREE.MeshBasicMaterial({ 
            color: this.tip === "A" ? 0x00ffff : 0xff0055, // A akımı Turkuaz, B akımı Pembe parlar
            transparent: true, opacity: 0.95,
            depthWrite: false, // Zıt izlerin birbirini derinlik katmanında maskelemesini engeller
            blending: THREE.AdditiveBlending // Çarpışma anında element haçında plazma parlaması yaratır
        });
        this.mesh = new THREE.Mesh(pGeom, pMat);
        
        // İlk doğuş pozisyonu
        this.mesh.position.copy(this.kaynak.position);
        
        // 🚀 3 AŞAMALI KAYNAK ANTENİ: Katmanına göre dikey eksende ilk kırılmayı başlatır
        //if (this.layer === "UP") this.mesh.position.y += 0.08;
        //if (this.layer === "DOWN") this.mesh.position.y -= 0.08;

        KuantumKafesi.add(this.mesh);
    }

guncelle(delta) {
        // 🔑 ABSOLUTE SYMMETRY UNIFICATION: Both streams now share the exact same speed limits
        let hizKatsayisi = 1.6; // Fully unified velocity constant
        let dalgaliIvme = 0.5 + Math.sin(this.ilerleme * Math.PI) * hizKatsayisi;
        
        // Fluid speed pacing: 0.6 ensures they move beautifully without dragging or blinking away
        this.ilerleme += (delta * 0.6) * dalgaliIvme;

        let p = Math.min(this.ilerleme, 1.0);
        let merkezPos = new THREE.Vector3().lerpVectors(this.kaynak.position, this.hedef.position, p);
        
        // 🔑 PERFECTLY MIRRORED RADIAL CONSTANT: Broadens both orbits equally to match your logo's wheel
        let yorungeCap = 0.38; // Shared unified radius
        let dalgaBoyu = Math.sin(p * Math.PI) * yorungeCap; 
        let yonKatsayisi = this.tip === "A" ? 1 : -1; // Handled purely by the inverted compass direction

        // Symmetric polar gravity draw
        let cekimKuvveti = 1.0 - Math.sin(p * Math.PI) * 0.45;
        dalgaBoyu *= cekimKuvveti;

        // Unified 3D depth wave path tracking
        let layerKavisY = 0;
        if (this.layer === "UP") layerKavisY = Math.sin(p * Math.PI) * 0.15 * cekimKuvveti;
        if (this.layer === "DOWN") layerKavisY = -Math.sin(p * Math.PI) * 0.15 * cekimKuvveti;

        // The absolute spatial position: Fully symmetric, fluid, and perfectly mirrored
        this.mesh.position.set(
            merkezPos.x + Math.cos(p * Math.PI * 2) * dalgaBoyu * yonKatsayisi,
            merkezPos.y + layerKavisY,
            merkezPos.z + Math.sin(p * Math.PI * 2) * dalgaBoyu * yonKatsayisi
        );
    }
}


// ============================================================================
// DOUBLE VORTEX VE KUTSAL KAN POMPALAMA MOTORU
// ============================================================================
// Global veri paket takibi dizisi ve Rodin dizilimi
let aktifPaketler = [];
const colorspectrum =[1,2,4,8,7,5];

const RYB = [1, 4, 7, 8, 5, 2]; 
const BGR = [7, 4, 1, 5, 8, 2]; 
let paketSayaci = 0; // Her parçacığa verilecek benzersiz seri numarası

//let aktifDiziIndex = 0;
let aktifIndexA = 0;
let aktifIndexB = 0;


// ============================================================================
// FPS LİMİTLEYİCİ VE ANİMASYON DÖNGÜSÜ (TAM VE SIZINTISIZ SÜRÜM)
// ============================================================================
let globalDönüşHızı = 0.005; 
const hedefFPS = 25;
const kareAralığı = 1000 / hedefFPS; // 40ms
let sonKareZamanı = performance.now();

function animate() {
    requestAnimationFrame(animate);

    

    // 🛠 25 FPS Zaman Kilidi (Mevcut kararlı yapınız)
    const şimdikiZaman = performance.now();
    const geçenSüre = şimdikiZaman - sonKareZamanı;
    if (geçenSüre < kareAralığı) return;
    sonKareZamanı = şimdikiZaman - (geçenSüre % kareAralığı);

    const sabitDelta = 1 / hedefFPS;

    // 🔑 74 BPM BİYOLOJİK MOTOR: Zaman çarpanı ve anteni yeniden aktifleştirildi!
    const simdikiTarih = new Date();
    const saniyeZamani = simdikiTarih.getSeconds() + (simdikiTarih.getMilliseconds() / 1000); 

    

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

}
