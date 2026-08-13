// ==================================================================================
// metatron.js - SAHNE OMURGASI VE MERKEZİ (Salvator Orb / Çekirdek) GEOMETRİ MOTORU
// ==================================================================================
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

// Eksen milleri iskeletle senkronize hareket etsin kafa karışmasın
if (window.currentAxisX) window.currentAxisX.visible = gelenDurum; // 👈 İskelet

// ============================================================================
// DOUBLE VORTEX VE KUTSAL KAN POMPALAMA MOTORU (DOĞRUSAL RENK TAYFI FAZI)
// ============================================================================
// 💡 AÇIKLAMA: Kafayı karıştıran tüm Rodin/Tesla çapraz döngüleri silindi.
// Sistem tamamen doğrusal gökkuşağı tayfı (Spektrum) sırasına göre akar.

let aktifPaketler = []; // Sahne üzerinde canlı uçan gluon parçacıkları dizisi
let paketSayaci = 0;    // Her parçacığa verilecek benzersiz seri numarası
//let mevcutOdaSirasi = 0; // 0'dan 5'e kadar sırayla dönen pürüzsüz oda sayacı

const colorspectrum =[1,2,4,8,7,5];

const RYB = [1, 4, 7, 8, 5, 2]; 
const BYR = [7, 4, 1, 5, 8, 2]; 

//let aktifDiziIndex = 0;
//let aktifIndexA = 0;
//let aktifIndexB = 0;


window.sonsuzlukCizgisi = null;
window.sonsuzlukZamani = 0;


window.KuantumPaketi = class KuantumPaketi {
    constructor(kaynakMesh, hedefMesh, renk, tip, layer) { 
        this.kaynak = kaynakMesh;
        this.hedef = hedefMesh;
        this.hedefId = hedefMesh.id; 
        this.ilerleme = 0.0;
        this.tip = tip; 
        this.layer = layer; 

        if (typeof window.paketSayaci === "undefined") window.paketSayaci = 0;
        window.paketSayaci++;
        this.uuid = window.paketSayaci;
        
        const pGeom = new THREE.SphereGeometry(0.03, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({ 
            color: this.tip === "A" ? 0x00ffff : 0xff0055, // Eril Turkuaz, Dişil Pembe
            transparent: true, 
            opacity: 0.95,
            depthWrite: false, 
            blending: THREE.AdditiveBlending 
        });
        this.mesh = new THREE.Mesh(pGeom, pMat);
        this.mesh.position.copy(this.kaynak.position);

        window.KuantumKafesi.add(this.mesh);
    }

    guncelle(delta) {
        let hizKatsayisi = 1.0; 
        let dalgaliIvme = 0.5 + Math.sin(this.ilerleme * Math.PI) * hizKatsayisi;
        this.ilerleme += (delta * 0.6) * dalgaliIvme;

        let p = Math.min(this.ilerleme, 1.0);
        let merkezPos = new THREE.Vector3().lerpVectors(this.kaynak.position, this.hedef.position, p);
        
        let yorungeCap = 0.38; // Tekerlek genişliği altın oran dengesi
        let dalgaBoyu = Math.sin(p * Math.PI) * yorungeCap; 
        let yonKatsayisi = this.tip === "A" ? 1 : -1; 

        let cekimKuvveti = 1.0 - Math.sin(p * Math.PI) * 0.45;
        dalgaBoyu *= cekimKuvveti;

        let layerKavisY = 0;
        if (this.layer === "UP") layerKavisY = Math.sin(p * Math.PI) * 0.15 * cekimKuvveti;
        if (this.layer === "DOWN") layerKavisY = -Math.sin(p * Math.PI) * 0.15 * cekimKuvveti;

        this.mesh.position.set(
            merkezPos.x + Math.cos(p * Math.PI * 2) * dalgaBoyu * yonKatsayisi,
            merkezPos.y + layerKavisY,
            merkezPos.z + Math.sin(p * Math.PI * 2) * dalgaBoyu * yonKatsayisi
        );
    }
};

window.createDseedInfinityBackground = function() {
    // Varsa eski çizgiyi sahneden uçur
    if (window.sonsuzlukCizgisi) {
        window.scene.remove(window.sonsuzlukCizgisi);
        window.sonsuzlukCizgisi.geometry.dispose();
        window.sonsuzlukCizgisi.material.dispose();
    }

    const curvePoints = [];
    const segments = 120;
    
    // Sonsuzluk (∞) matematiksel eğri döngüsü
    for (let i = 0; i <= segments; i++) {
        let t = (i / segments) * Math.PI * 2;
        let scale = 1.6; // Metatron'un arkasında kalacak şekilde altın oran ölçeği
        let x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
        let y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
        
        // Z ekseninde hafifçe arkaya (-0.4) iterek derinlik veriyoruz
        curvePoints.push(new THREE.Vector3(x, y, -0.4));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const material = new THREE.LineBasicMaterial({
        color: 0xff00ff,          // Pembe Tonu
        transparent: true,
        opacity: 0.1,             // Gözü yormayacak hafif bir gizli sis önizlemesi
        blending: THREE.AdditiveBlending
    });

    window.sonsuzlukCizgisi = new THREE.Line(geometry, material);
    window.sonsuzlukCizgisi.name = "DSEED_INFINITY_LINE";
    window.scene.add(window.sonsuzlukCizgisi);
};

// ============================================================================
// 🧭 INTEGRATED RGB AXES ENGINE (İSKELET İÇİNDE KALAN KİLİTLİ VE GÜVENLİ SÜRÜM)
// ============================================================================
window.createAxes = function(isAxisVisible) {
    // 🛠️ Eğer sahnede veya grupta eski eksenler kalmışsa pürüzsüzce imha et
    ["currentAxisX", "currentAxisY", "currentAxisZ"].forEach(axisName => {
        if (window[axisName]) {
            if (window.KuantumKafesi) window.KuantumKafesi.remove(window[axisName]);
            if (window.scene) window.scene.remove(window[axisName]);
            window[axisName].geometry.dispose();
            window[axisName].material.dispose();
            window[axisName] = null;
        }
    });

    const axisLength = 0.5; // İskeletin içinde kalacak tam altın oran uzunluğu
    
    // 🔴 1. KIRMIZI AKS (X Ekseni - Yatay Doğu-Batı Mili)
    const geomX = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, 0, 0), 
        new THREE.Vector3(axisLength, 0, 0)
    ]);
    const matX = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    window.currentAxisX = new THREE.Line(geomX, matX);
    window.currentAxisX.name = "AXIS_X"; 
    window.currentAxisX.visible = isAxisVisible; // Butondan gelen net true/false emri
    
    // 🔑 KESİN ÇÖZÜM KALKANI: Sayfa ilk açıldığında KuantumKafesi henüz doğmadıysa (null ise) 
    // add() yapıp motoru çökertmesini engelliyoruz! Doğduğu an otomatik gruba kilitlenir.
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.currentAxisX); 
    }

    // 🟢 2. YEŞİL AKS (Y Ekseni - Dikey Kutupsal Mil / Crux-Sacrum Koridoru)
    const geomY = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -axisLength, 0), 
        new THREE.Vector3(0, axisLength, 0)
    ]);
    const matY = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
    window.currentAxisY = new THREE.Line(geomY, matY);
    window.currentAxisY.name = "AXIS_Y";
    window.currentAxisY.visible = isAxisVisible;
    
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.currentAxisY);
    }

    // 🔵 3. MAVİ AKS (Z Ekseni - Derinlik / Ön-Arka Ölçü Mili)
    const geomZ = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -axisLength), 
        new THREE.Vector3(0, 0, axisLength)
    ]);
    const matZ = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
    window.currentAxisZ = new THREE.Line(geomZ, matZ);
    window.currentAxisZ.name = "AXIS_Z";
    window.currentAxisZ.visible = isAxisVisible;
    
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.currentAxisZ);
    }
    
    console.log(`[AXES PROTOCOL] Miller İskelet Grubuna Bağlandı. Görünürlük: ${isAxisVisible}`);
};


// ============================================================================
// 🪐 TRUE ZERO-POINT AXIS ENGINE: 90° SAF VE MERKEZLİ 4 KÜRE ŞASİSİ
// ============================================================================
window.createFiveFoldCore = function(isCoreVisible) {
    // 🛠️ Bellek sızıntılarını ve eski kalıntıları pürüzsüzce temizle
    if (window.FiveFoldGrubu) {
        window.scene.remove(window.FiveFoldGrubu);
        window.FiveFoldGrubu.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        });
        window.FiveFoldGrubu = null;
    }

    if (!isCoreVisible) return;

    // 📐 Tek bir merkez grup oluşturuyoruz kanka
    window.FiveFoldGrubu = new THREE.Group();
    window.FiveFoldGrubu.name = "FIVE_FOLD_CORE_GROUP";
    
    // 🔑 GRUBUN KENDİSİNİ TAM MERKEZE REZONANSA ALIYORUZ
    window.FiveFoldGrubu.position.set(0, 0, 0);
    window.FiveFoldGrubu.rotation.set(0, 0, 0); 

    const cemberYaricapi = 0.23; // Küre boyutu
    const r = 0.26;              // 📐 Eksen kaçıklığı (Merkezden uzaklaşma mesafesi)

    // 🪐 TAM 90° KARŞIT MATRİS (KÜPÜN İÇİNDEKİ ODACIKLARA ÇAKILI NİZAM)
    // Sapmalar tamamen sıfırlandı. Yeşil Üstte, Turuncu Altta, Sarı Solda, Mavi Sağda.
    const elementToplari = [
        { x: 0,  y: r,  z: 0, color: 0x00ff00, name: "PURE_YESIL_TOP" },     // ⬆️ YEŞİL (Tam Üst / +Y)
        { x: 0,  y: -r, z: 0, color: 0xff7f00, name: "PURE_TURUNCU_BOTTOM" }, // ⬇️ TURUNCU (Tam Aşağı / -Y)
        { x: -r, y: 0,  z: 0, color: 0xffff00, name: "PURE_SARI_LEFT" },     // ⬅️ SARI (Tam Sol / -X)
        { x: 0,  y: 0,  z: r, color: 0x0077ff, name: "PURE_MAVI_RIGHT" }    // ➡️ MAVİ (Tam Sağ / +X)
     
    ];

    elementToplari.forEach((el, index) => {
        // Pürüzsüz küre şasisi
        const kureGeom = new THREE.SphereGeometry(cemberYaricapi, 32, 32);
        
        // Görünürlük zırhı: Katmanların birbirini silmesini engelleyen kesin ayar
        const kureMat = new THREE.MeshBasicMaterial({ 
            color: el.color,
            transparent: true,
            opacity: 0.5,             
            depthWrite: false,        // 🚨 Kürelerin arka arkaya bindiğinde kaybolmasını engeller
            depthTest: true,
            side: THREE.DoubleSide
        });
        
        const anaKureMesh = new THREE.Mesh(kureGeom, kureMat);
        anaKureMesh.position.set(el.x, el.y, el.z);
        anaKureMesh.name = el.name;
        
        // Çizim sırası önceliği
        anaKureMesh.renderOrder = index + 1;

        // Küreyi ana gruba ekle
        //window.FiveFoldGrubu.add(anaKureMesh);
    });

    // Grubu ana sahneye ya da kuantum kafesine mühürle
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.FiveFoldGrubu);
    } else {
        window.scene.add(window.FiveFoldGrubu);
    }

    console.log("[ZERO-POINT-FIX] 4 küre haçı tam (0,0,0) merkezine çivilendi! 🪐⚔️");
};
// ============================================================================
// BİRLEŞİK ALTIN ORAN & FREKANS BAZLI ULTRA-HAFİF PARÇACIK MOTORU (0% CPU YÜKÜ)
// ============================================================================
// Hız = (Odanın Öz Frekansı * Taban Katsayı) * Altın Oran Şalteri (1.618 / 0.618)


window.spheres = [
        { id: 1, name: "KIRMIZI_ENERJI_ODASI", pos: new THREE.Vector3( 0.25,  0.25,  0.25), color: 0xff0000, isPole: false }, 
        { id: 2, name: "TURUNCU_EMICI_ODA",    pos: new THREE.Vector3( 0.25,  0.25, -0.25), color: 0xFF7F00, isPole: false },
        { id: 4, name: "SARI_ITICI_ODA",      pos: new THREE.Vector3( 0.25, -0.25, -0.25), color: 0xffff00, isPole: false },
        { id: 8, name: "YESIL_ENERJI_ODASI",   pos: new THREE.Vector3(-0.25, -0.25, -0.25), color: 0x00ff00, isPole: false }, 
        { id: 7, name: "MAVI_KALKAN_ODASI",   pos: new THREE.Vector3(-0.25, -0.25,  0.25), color: 0x0000ff, isPole: false }, 
        { id: 5, name: "MOR_KABUK_ODASI",     pos: new THREE.Vector3(-0.25,  0.25,  0.25), color: 0x660099, isPole: false },
        { id: 3, name: "BEYAZ_KUTUP_ODASI",   pos: new THREE.Vector3(-0.25,  0.25, -0.25), color: 0xffffff, isPole: true  }, 
        { id: 6, name: "SIYAH_KUTUP_ODASI",   pos: new THREE.Vector3( 0.25, -0.25,  0.25), color: 0x222222, isPole: true  }  
    ];

// 🩻 Akademik Gösterge ve Renk Spektrumu Sözlüğü (Yeni Enerji Akış Sırasına Göre Senkronize)
// 🌈 SPEKTRAL REZONANS SÖZLÜĞÜ (Termodinamik ve Solfeggio Tam Senkronizasyon)
window.RENK_TAYFI_SPEKTRUMU = [
    { id: 1, name: "KIRMIZI_ENERJI_ODASI", mv: -90, renk: "Kırmızı", frekans: "174 Hz" }, // 🔥 Başlangıç / Isınma / Dinlenme tetiği
    { id: 2, name: "TURUNCU_EMICI_ODA",    mv: -70, renk: "Turuncu", frekans: "285 Hz" }, // 🔥 İvmelenme / Voltaj tırmanışı
    { id: 4, name: "SARI_ITICI_ODA",       mv:  20, renk: "Sarı",    frekans: "396 Hz" }, // 🔥 Depolarizasyon / Genleşme (Tepe Isı Girişi)
    // 🪐 [963 Hz - MERKEZ ÇEKİRDEK RESMİ ODA DEĞİLDİR, GEÇİŞ GİRDABIDIR!]
    { id: 8, name: "YESIL_ENERJI_ODASI",   mv:   0, renk: "Yeşil",   frekans: "528 Hz" }, // 💧 Denge / Topraklama / Kalp (Orta Frekans)
    { id: 7, name: "MAVI_KALKAN_ODASI",    mv: -60, renk: "Mavi",    frekans: "741 Hz" }, // 💧 Soğuma / Koruma / Akış yavaşlaması
    { id: 5, name: "MOR_KABUK_ODASI",      mv: -90, renk: "Mor",     frekans: "852 Hz" }  // 💧 Deep State / Hiperpolarizasyon / Büzüşme
];


// 🌈 SPEKTRAL REZONANS SÖZLÜĞÜ (Altın Oran Sistol/Diyastol Fraktal Döngüsü)
// Enerji sol aks boyunca katlanır (Maksimum Tepe: Sarı), sağ aks boyunca bölünerek söner!
window.RENK_TAYFI_SPEKTRUMU = [
    // 🔥 YÜKSELEN AKS (Isınma / Genleşme / Sistol): Çarpılarak Katlanır (* 1.618)
    { id: 1, name: "KIRMIZI_ENERJI_ODASI", mv: -90, renk: "Kırmızı", fKatsayi: 1.0 },     // 🧊 Taban (Phi^0)
    { id: 2, name: "TURUNCU_EMICI_ODA",    mv: -70, renk: "Turuncu", fKatsayi: 1.618 },   // 🚀 İvme Başlangıcı (Phi^1)
    { id: 4, name: "SARI_ITICI_ODA",       mv:  20, renk: "Sarı",    fKatsayi: 2.618 },   // ⚡ ZİRVE ISI / TEPE ENERJİ (Phi^2)
    // 💧 SÖNÜMLENEN AKS (Soğuma / Büzüşme / Diyastol): Bölünerek Azalır (/ 1.618 veya * 0.618)
    { id: 8, name: "YESIL_ENERJI_ODASI",   mv:   0, renk: "Yeşil",   fKatsayi: 1.618 },   // 🟢 Denge / Kalp Topraklaması (2.618 / 1.618)
    { id: 7, name: "MAVI_KALKAN_ODASI",    mv: -60, renk: "Mavi",    fKatsayi: 1.0 },     // 💧 Soğuma Koridoru (1.618 / 1.618)
    { id: 5, name: "MOR_KABUK_ODASI",      mv: -90, renk: "Mor",     fKatsayi: 0.618 }    // 🧊 Deep State / Mutlak Sakinlik (1.0 / 1.618)
];

// 🎛 3. ŞALTERLER KİLİTLENİYOR
window.sonUretimZamani = 0;
window.mevcutOdaSirasi = 1;
window.frameSayaci = 0; 

/**
 * Milivolt (mV) ve Vagus sinyallerine göre parçacıkları ve Metatron'u günceller.
 * anatomy.html içindeki animate() döngüsünde tek satırda çağrılır.
 */

//const RENK_TAYFI_SPEKTRUMU = [1,2,4,8,7,5];

window.vortexPointer = 0;
window.akimZamanlayici = null;
//window.MATTER_SEQUENCE = [1,2,4,8,7,5];
window.MATTER_SEQUENCE = [1,4,7,8,5,2];

// 🚀 Sadece buton tetiklendiğinde çalışan bağımsız akım üreteci
// 🚀 METATRON'U TEK BAŞINA REZONANSA SOKAN GERÇEK 174 HZ MOTORU
// 🚀 %100 SAF 174 HZ SOLFEJ KALP REZONANS MOTORU
// 🚀 KUSURSUZ 174 HZ DOUBLE VORTEX VE KUTSAL KAN POMPALAMA MOTORU
window.startVortexFlux = function() {
    // Harici setInterval tamamen silindi. 
    // Ritim artık tamamen updateMetatronLoop içerisindeki "kanalRitmi"ne emanet!
    window.vortexPointer = 0;
    window.aktifIndexA = 0;
    window.aktifIndexB = 0;
    console.log("[VORTEX] Kuantum Akım Motoru Ana Ritime Kilitlendi. 🫀");
};

window.stopVortexFlux = function() {
    window.aktifPaketler = [];
    // Canlı tüm odaların emisyonlarını pürüzsüzce söndür
    window.spheres.forEach(s => {
        const nodeMesh = window.KuantumKafesi.getObjectByName(`ID_${s.id}`);
        if (nodeMesh && nodeMesh.material) nodeMesh.material.emissiveIntensity = 0.0;
    });
    console.log("[VORTEX] Kuantum Akım Motoru Kapatıldı.");
};

// ============================================================================
// DOUBLE VORTEX VE KUTSAL KAN POMPALAMA MOTORU (DOĞRUSAL RENK TAYFI FAZI)
// ============================================================================
window.aktifPaketler = []; // Sahne üzerinde canlı uçan gluon parçacıkları
window.paketSayaci = 0;    // Benzersiz parçacık kimliği
window.mevcutOdaSirasi = 0; // Doğrusal spektrumda o an aktif olan oda indisi
window.sonUretimZamani = 0; // İki parçacık üretimi arasındaki zaman kilidi
 


//let aktifDiziIndex = 0;
let aktifIndexA = 0;
let aktifIndexB = 0;


if (typeof window.vortexFrameCounter === "undefined") window.vortexFrameCounter = 0;


window.updateMetatronLoop = function() { 
    
    // Eğer temel Three.js nesneleri henüz sahnede yoksa döngüden güvenle çık (Hata fırlatmaz)
    if (!window.scene || !window.renderer || !window.camera || !window.KuantumKafesi) return;

    // 🛡️ OTOMATİK DOĞUŞ ZIRHI: Eğer saat henüz yaratılmadıysa, tam şu an yarat ve hata vermesini engelle!
    if (!window.metatronClock) {window.metatronClock = new THREE.Clock();    }
    
    // 🎯 Gerçek zamanı milisaniyelik güvenle oku
    const delta = window.metatronClock.getDelta();

    const milisaniyeZamani = performance.now();

    // 🔑 74 BPM Biyolojik Kalp Anteni
    const simdikiTarih = new Date();
    const saniyeZamani = simdikiTarih.getSeconds() + (simdikiTarih.getMilliseconds() / 1000); 
    const kalpAteslemeSinyali = (saniyeZamani * (74 / 60));
    let ateslemeRitmi = Math.floor(kalpAteslemeSinyali * 2.0) % 2 === 0;// ⚡ "GÜM GÜM" VURUŞ ŞALTERİ:

     // 🧭 Kristal Zamanlama ve Rodin İndeksleme (6'lık Nizam)
    if (typeof window.biyolojikKareSayaci === "undefined") window.biyolojikKareSayaci = 0;
    window.biyolojikKareSayaci++;

    // ============================================================================
    // 🫀 2. MADDE MATRİSİ AC MULTI-VORTEX TEKİL ENJEKSİYON MOTORU (PARÇACIK DOĞUMU)
    // ============================================================================
    const rodinDizisiA = [1, 4, 7, 8, 5, 2]; // Eril Akış Hattı (Saat Yönü İleri)
    const rodinDizisiB = [7, 4, 1, 5, 8, 2]; // Dişil Akış Hattı (Ters Saat Yönü Geri)

    // --- RODIN & AC KALBİ (GÜNCELLENMİŞ) ---
    const rodinDizisi = [1,2,4,8,7,5]; // Dizi tamamlandı
    const rodinIndeks = Math.floor(saniyeZamani * 1.5) % rodinDizisi.length;
    const aktifRodinDegeri = rodinDizisi[rodinIndeks];

     // 🧭 Kristal Zamanlama Kilidi: İndeksleri doğrudan kare sayacına mühürlüyoruz.
    let hamIndex = Math.floor(window.biyolojikKareSayaci / 6);
    window.aktifIndexA = hamIndex % rodinDizisiA.length;
    window.aktifIndexB = (window.aktifIndexA + 3) % rodinDizisiB.length;

    const kalpDalga174 = Math.sin(saniyeZamani * 174 * Math.PI);
    const kalpDalga852 = Math.sin(saniyeZamani * 852 * Math.PI);
    const anlikKalpSinyali = 174 + Math.floor(kalpDalga174 * 5 + kalpDalga852 * 2);


    // 🌊 1. ODALARI ÖNCE LERP İLE YUMUŞAKÇA SÖNDÜR
    
     window.spheres.forEach(s => {
        // 🔑 KİLİT DÜZELTME: Hem ID hem de String isim varyasyonlarını tarayan akıllı kalkan!
        let odaMesh = window.KuantumKafesi.children.find(c => c.name === `ID_${s.id}` || c.name === s.name);
        if (odaMesh && odaMesh.material) {
            odaMesh.material.emissiveIntensity = THREE.MathUtils.lerp(odaMesh.material.emissiveIntensity, 0.2, 0.15);
        }
    });


    if (typeof window.aktifIndexA === "undefined") window.aktifIndexA = 0;
    if (typeof window.aktifIndexB === "undefined") window.aktifIndexB = 0;


  if (ateslemeRitmi && window.aktifPaketler && window.aktifPaketler.length < 36) {
    

            let kaynakA = window.spheres.find(o => o.id === rodinDizisiA[window.aktifIndexA]);
            let hedefA = window.spheres.find(o => o.id === rodinDizisiA[(window.aktifIndexA + 1) % rodinDizisiA.length]);
            
            let kaynakB = window.spheres.find(o => o.id === rodinDizisiB[window.aktifIndexB]);
            let hedefB = window.spheres.find(o => o.id === rodinDizisiB[(window.aktifIndexB - 1 + rodinDizisiB.length) % rodinDizisiB.length]);

            if (kaynakA && hedefA && kaynakB && hedefB) {
                let meshKA = window.KuantumKafesi.getObjectByName(`ID_${kaynakA.id}`);
                let meshHA = window.KuantumKafesi.getObjectByName(`ID_${hedefA.id}`);
                let meshKB = window.KuantumKafesi.getObjectByName(`ID_${kaynakB.id}`);
                let meshHB = window.KuantumKafesi.getObjectByName(`ID_${hedefB.id}`);

                if (meshKA && meshHA && meshKB && meshHB) {
                    
                    // ⚡ ERİL VE DİŞİL PARÇACIKLARI AYNI ANDA DOĞUR
                    [ { s: meshKA, h: meshHA, d: hedefA, t: "A" }, { s: meshKB, h: meshHB, d: hedefB, t: "B" } ].forEach(p => {
                        let odaMesh = window.KuantumKafesi.getObjectByName(p.t === "A" ? meshHA.name : meshHB.name);
                        
                        if (odaMesh && odaMesh.material) {
                            // Sınıfı çağır ve parçacığı canlandır
                            if (typeof window.KuantumPaketi === "function") {
                                const yeniPaket = new window.KuantumPaketi(p.s, p.h, p.d.color, p.t, p.t === "A" ? "UP" : "DOWN");
                                window.aktifPaketler.push({
                                    id: yeniPaket.uuid,
                                    instance: yeniPaket,
                                    hedefId: p.d.id,
                                    yon: p.t === "A" ? "ERIL" : "DISIL",
                                    ilerleme: 0
                                });
                            }

                            // 🔑 MAVİ'Yİ KURTARAN KİLİT: marsFazı artık merminin Tipine göre (A/B) özgürleşti!
                            let marsFazı = p.t === "A" ? rodinDizisiA[window.aktifIndexA] : rodinDizisiB[window.aktifIndexB];
                            let saniyeZamani = performance.now() * 0.001;
                            let kalpDalga174 = Math.sin(saniyeZamani * 1.74);
                            let kalpDalga852 = Math.sin(saniyeZamani * 8.52);

                            // 🔑 AKILLI ELEMAN FREKANS SES ENJEKTÖRÜ
                            if (typeof kozmikFrekansCal === 'function') {
                                if (marsFazı === 1 || marsFazı === 5) kozmikFrekansCal(174, 0.12);
                                else if (marsFazı === 2 || marsFazı === 4) kozmikFrekansCal(432, 0.08);
                                else if (marsFazı === 8) kozmikFrekansCal(528, 0.15);
                                else if (marsFazı === 7) kozmikFrekansCal(852, 0.10);
                            }
  // ============================================================================
                            // 🌊 🪨 🌬️ 🔥 SİZİN ORİJİNAL 4-ELEMENT MASTER MOTORUNUZ (STRING İSİMLERİ KORUNDU)
                            // ============================================================================
                            
                            // 🍼 1. SU KRALLIĞI: URINARY GİRİŞ KAPISI (Faz: 1)
                            if (marsFazı === 1) {
                                if (odaMesh.name === "KIRMIZI_ENERJI_ODASI") {
                                    let suTabanPuls = 7.0 + (Math.abs(kalpDalga174) * 4.5);
                                    odaMesh.material.emissiveIntensity = suTabanPuls;
                                    odaMesh.material.opacity = 1.0;
                                }
                            }
                            // 🪐 2. SU KRALLIĞI: DIGESTIVE İŞLEME KAPISI (Faz: 2 & 4)
                            else if (marsFazı === 2 || marsFazı === 4) {
                                if (odaMesh.name === "TURUNCU_EMICI_ODA" || odaMesh.name === "SARI_ITICI_ODA") {
                                    odaMesh.material.emissiveIntensity = (odaMesh.name === "SARI_ITICI_ODA") ? 6.5 : 6.0;
                                    odaMesh.material.opacity = 0.9;
                                }
                            }
                            // 🪨 3. TOPRAK KRALLIĞI: SKELETAL SYSTEM (Faz: 8)
                            else if (marsFazı === 8) {
                                if (odaMesh.name === "YESIL_ENERJI_ODASI") {
                                    odaMesh.material.emissiveIntensity = 5.5; 
                                    odaMesh.material.opacity = 0.85;
                                }
                            }
                            // 🌬️ 4. HAVA KRALLIĞI: PULMONARY SHIELD (Faz: 7)
                            // 🔑 MAVİ ODA BURADA KURTARILDI: Dişil mermi Faz 7 olduğunda bu string kapısını başarıyla açar!
                            else if (marsFazı === 7) {
                                if (odaMesh.name === "MAVI_KALKAN_ODASI") {
                                    odaMesh.material.emissiveIntensity = 6.8 + (kalpDalga852 * 1.5);
                                    odaMesh.material.opacity = 0.95;
                                }
                            }
                            // 🔑 🔥 5. ATEŞ KRALLIĞI: NERVOUS SYSTEM & BRAIN LIGHTNING (Faz: 5)
                            else if (marsFazı === 5) {
                                const sinapsDalgasi963 = Math.sin(saniyeZamani * 963 * Math.PI);
                                if (odaMesh.name === "MOR_KABUK_ODASI" || odaMesh.name === "BEYAZ_KUTUP_ODASI") {
                                    if (odaMesh.name === "MOR_KABUK_ODASI") {
                                        odaMesh.material.emissiveIntensity = 8.5 + (Math.abs(sinapsDalgasi963) * 3.5);
                                        odaMesh.material.opacity = 1.0;
                                    } else {
                                        odaMesh.material.emissiveIntensity = 7.0 + (sinapsDalgasi963 * 1.5);
                                    }
                                }
                            }
                        } // <-- if (odaMesh && odaMesh.material) kapanışı
                    }); // <-- Enjeksiyon forEach döngüsünün kapanışı

                    // 🧭 Kutsal Omurga Aks Kilidi: Eril ileri giderken, 
                    // Dişil otomatik olarak onun 6'lı çark nizamındaki tam 180 derece karşısına kilitlenir!
                    window.aktifIndexA = (window.aktifIndexA + 1) % rodinDizisiA.length;
                    window.aktifIndexB = (window.aktifIndexA + 3) % rodinDizisiB.length;
                }
            }
        
    }

    // ============================================================================
    // 🌀 3. PARÇACIK DİNAMİKLERİ VE HASSAS HEDEF ÇARPIŞMA KONTROLÜ
    // ============================================================================
    if (window.aktifPaketler && window.aktifPaketler.length > 0) {
        for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
            let p = window.aktifPaketler[i];
            if (!p || !p.instance) continue;
            
            p.instance.guncelle(delta);
            p.ilerleme = p.instance.ilerleme;

            if (p.ilerleme >= 0.93) {
                const collisionDetected = window.aktifPaketler.some(digerPaket =>
                    digerPaket &&
                    digerPaket.id !== p.id && 
                    digerPaket.hedefId === p.hedefId && 
                    digerPaket.yon !== p.yon &&         
                    digerPaket.ilerleme >= 0.93         
                );

                if (collisionDetected) {
                    const targetChamber = window.KuantumKafesi.children.find(c => c.name === `ID_${p.hedefId}`);
                    if (targetChamber && targetChamber.material && window.akademikKalpAktif) {
                        const color = window.spheres.find(s => s.id === p.hedefId)?.color;
                        if (color) targetChamber.material.color.setHex(color);
                        
                        if (p.hedefId === 4) targetChamber.material.emissiveIntensity = 9.0; 
                        else if (p.hedefId === 2) targetChamber.material.emissiveIntensity = 7.5; 
                        else targetChamber.material.emissiveIntensity = 5.0; 
                    }
                }
            }

            // Temizlik (Cleanup)
            if (p.ilerleme >= 1.0) {
                if (p.instance.mesh && window.KuantumKafesi) {
                    window.KuantumKafesi.remove(p.instance.mesh);
                    if (p.instance.mesh.geometry) p.instance.mesh.geometry.dispose();
                    if (p.instance.mesh.material) p.instance.mesh.material.dispose();
                }
                window.aktifPaketler.splice(i, 1);
            }
        }
    }


// 3. DEŞARJ DÖNGÜSÜ (GEZEGEN ENERJİ ALANLARI VE ASİMETRİK FREKANS BAĞLANTISI - TAMİR EDİLDİ)
      spheres.forEach(s => {
        // 🔑 KİLİT TAMİR 1: Bilgisayarın odayı bulması için isim şablonu düzeltildi!
        let odaMesh = KuantumKafesi.getObjectByName(`ID_${s.id}`);
        
        if (odaMesh && !s.isPole && odaMesh.material) {
            // 🪐 GEZEGEN ENERJİ FREKANS MATRİSİ: Deşarj hızları Walter Russell iniş-çıkış aksına bağlı!
            let gezegenEnerjiAlani = 28.0; 

            // 1. Kırmızı (1) ve Yeşil (8) -> Deli gibi yanan, enerjiyi tutan kutup ikiye bölen aks
            if (s.id === 1 || s.id === 8) {
                gezegenEnerjiAlani = 8.0; // Çok yavaş söner, ışığı uzun süre tutar!
            }
            // 2. Turuncu (2) ve Sarı (4) -> İniş frekansı (Merkeze emilen ve sapan gibi boşalan alan)
            else if (s.id === 2 || s.id === 4) {
                gezegenEnerjiAlani = 45.0; // Yıldırım hızıyla deşarj olur, anlık havai fişek patlaması verir!
            }
            // 3. Mavi (7) ve Mor (5) -> Çıkış frekansı (Kinetik enerjinin yukarı tırmandığı alan)
            else if (s.id === 7 || s.id === 5) {
                gezegenEnerjiAlani = 18.0; // Orta hızda süzülerek söner.
            }

            // ============================================================================
            // 🔑 KİLİT TAMİR 2: MAVİ VE DİĞER ODALARI KURTARAN GLUON YAKLAŞMA ENJEKSİYONU
            // ============================================================================
            // Odalar sönmeden önce, o odaya doğru fırlatılmış canlı bir gluon varsa voltajı besler!
                    // 🔑 KİLİT TAMİR: Akıllı Materyal Kontrolü
                window.aktifPaketler.forEach(p => {
                    if (p.hedefId === s.id) {
                        let uyarilma = Math.pow(p.ilerleme, 2) * 10;
                        
                        // Emissive var mı kontrol et, yoksa hata verme, rengi değiştir
                        if (odaMesh.material.emissive) {
                            odaMesh.material.emissive.setHex(s.color);
                            odaMesh.material.emissiveIntensity = uyarilma;
                        } else {
                            // MeshBasicMaterial için güvenli renk güncellemesi
                            odaMesh.material.color.setHex(s.color);
                        }
                        odaMesh.material.opacity = Math.max(0.3, p.ilerleme);
                    }
                });

            // 🔑 Orijinal Walter Russell Doğal Homeostasis Azalımı (Senin Yazdığın Deşarj Filtresi)
      // 🔑 Walter Russell Azalımı (Güvenli Sürüm)
if (odaMesh.material.emissiveIntensity !== undefined) {
    odaMesh.material.emissiveIntensity *= 0.95;
} else {
    // BasicMaterial için yumuşak renk sönümlemesi
    odaMesh.material.color.lerp(new THREE.Color(0x111111), 0.05);
}
        }
    });



  // ============================================================================
    // 🧭 PERSPEKTİF UYARLI ELEMAN AKSI HOMEOSTASIS SÖNÜMLEME FİLTRESİ
    // ============================================================================
    const elementAksIsimleri = ["Siyah_Beyaz_Ates_Su", "Sari_Pembe_Hava_Toprak", "Kirmizi_Yesil_Aktif_Pasif", "Turuncu_Mavi_Merkez_Eter"];
    
    // Eğer kamera tepeden bakış açısını (Y: 10, X: 0, Z: 0) kaybettiyse, opasiteleri yumuşakça eski haline getir
    const tepedenBakiliyorMu = Math.abs(window.camera.position.x) < 0.1 && Math.abs(window.camera.position.z) < 0.1;
    
    window.KuantumKafesi.children.forEach(child => {
        if (elementAksIsimleri.includes(child.name) && child.material) {
            let hedefOpasite = tepedenBakiliyorMu ? 0.85 : 0.25;
            child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, hedefOpasite, 0.1);
        }
    });

    window.renderer.render(window.scene, window.camera);
};

// ============================================================================
// METATRON CANLI DURUM OKUMA VE DIŞARIYA SİNYAL VERME MOTORU
// ============================================================================
// 🔑 DIŞ ERİŞİM KİLİDİ: Fonksiyon window nesnesine bağlanarak iframe dışından 
// ve ana HUD panelinden anlık veri okunabilir hale getirildi!

window.getMetatronFrequencyState = function(anlikOdaIndex) {
    // 🩻 6 Odalı Solfej Frekansları ve Akademik Akım Matrisi (Müfredatla Tam Uyumlu)
    const ODALAR = [
        { frekans: "174 Hz", mv: -90, renk: "Kırmızı", akımTipi: "Diyastolik Dinlenme" },
        { frekans: "285 Hz", mv: -70, renk: "Turuncu", akımTipi: "Uyarılma Eşiği" },
        { frekans: "396 Hz", mv:  20, renk: "Sarı",    akımTipi: "Hızlı Depolarizasyon" },
        { frekans: "528 Hz", mv:   0, renk: "Yeşil",   akımTipi: "Kasılma Plato Fazı" },
        { frekans: "741 Hz", mv: -60, renk: "Mavi",    akımTipi: "Hızlı Repolarizasyon" },
        { frekans: "852 Hz", mv: -90, renk: "Mor",     akımTipi: "Hiperpolarizasyon" }
    ];

    // Dizinin taşmasını ve tanımsız kalmasını önleyen sarsılmaz emniyet kilidi
    const index = Math.abs(anlikOdaIndex) % ODALAR.length;
    return ODALAR[index];
};




// ============================================================================
// 🧭 DETACHED RGB AXES CORE ENGINE (BAĞIMSIZ BOYUT MİLİ FONKSİYONU - SAF SÜRÜM)
// ============================================================================
window.createMetatronAxes = function(isAxisVisible) {
    // 🛠️ Eğer sahnede veya grupta eski eksenler kalmışsa pürüzsüzce imha et
    ["currentAxisX", "currentAxisY", "currentAxisZ"].forEach(axisName => {
        if (window[axisName]) {
            if (window.KuantumKafesi) window.KuantumKafesi.remove(window[axisName]);
            window.scene.remove(window[axisName]);
            window[axisName].geometry.dispose();
            window[axisName].material.dispose();
            window[axisName] = null;
        }
    });

    const axisLength = 0.5; // İskeletin içinde kalacak tam altın oran uzunluğu
    
    // 🔴 1. KIRMIZI AKS (X Ekseni - Yatay Doğu-Batı Mili)
    const geomX = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, 0, 0), 
        new THREE.Vector3(axisLength, 0, 0)
    ]);
    const matX = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    window.currentAxisX = new THREE.Line(geomX, matX);
    window.currentAxisX.name = "AXIS_X"; 
    
    // 🔑 KESİN ÇÖZÜM: Butondan fırlatılan dinamik parametreyi (true/false) doğrudan mühürlüyoruz!
    window.currentAxisX.visible = isAxisVisible; 
    
    if (window.KuantumKafesi) window.KuantumKafesi.add(window.currentAxisX);

    // 🟢 2. YEŞİL AKS (Y Ekseni - Dikey Kutupsal Mil / Crux-Sacrum Koridoru)
    const geomY = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -axisLength, 0), 
        new THREE.Vector3(0, axisLength, 0)
    ]);
    const matY = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
    window.currentAxisY = new THREE.Line(geomY, matY);
    window.currentAxisY.name = "AXIS_Y";
    
    // 🔑 KESİN ÇÖZÜM
    window.currentAxisY.visible = isAxisVisible;
    
    if (window.KuantumKafesi) window.KuantumKafesi.add(window.currentAxisY);

    // 🔵 3. MAVİ AKS (Z Ekseni - Derinlik / Ön-Arka Ölçü Mili)
    const geomZ = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -axisLength), 
        new THREE.Vector3(0, 0, axisLength)
    ]);
    const matZ = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
    window.currentAxisZ = new THREE.Line(geomZ, matZ);
    window.currentAxisZ.name = "AXIS_Z";
    
    // 🔑 KESİN ÇÖZÜM
    window.currentAxisZ.visible = isAxisVisible;
    
    if (window.KuantumKafesi) window.KuantumKafesi.add(window.currentAxisZ);
    
    console.log(`[AXES PROTOCOL] Miller Yeniden İnşa Edildi. Görünürlük: ${isAxisVisible}`);
};

// ============================================================================
// TÜM THREE.JS EKOSİSTEMİNİ VE METATRON GRUBUNU SIFIRDAN KURAN ANA MOTOR
// ============================================================================
// 🔑 DIŞ ERİŞİM KİLİDİ: Fonksiyon ve kritik nesneler window katmanına bağlanarak 
// dış panellerden ve frame döngülerinden tam zamanlı erişilebilir yapıldı!

window.initMetatronEngine = function() {

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
    window.createAxes(true); 

    window.createFiveFoldCore(true)

// --- KUTSAL ENERJİ ODALARI (8 KÜRE) ---

window.spheres.forEach(s => {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        new THREE.MeshStandardMaterial({ // 🚀 Daha hassas ışık gradyanı için Standard seviyeye çekildi
            color: 0x111111,             // 🧊 Açılışta mat ve nötr şasi rengi
            emissive: 0x111111,          // 🧊 Açılışta sönük plazma oda rengi
            emissiveIntensity: 0.0,      // 🎯 KİLİT HAMLE: Açılışta tamamen sönük (0.0) başlar, sarsıntı biter!
            transparent: true, 
            opacity: 0.85
        })
    );
    sphere.position.copy(s.pos);
    sphere.name = `ID_${s.id}`; 
    
    // 📦 KOPUKLUĞU BİTİREN REFAYALAMA: Sahne nesnesini doğrudan veri matrisine kilitleyin
    s.meshRef = sphere; 
    
    window.KuantumKafesi.add(sphere); 
});
// -------------------------------------

 // 🔑 22.5 DERECE KUTSAL SEKİZGEN PERSPEKTİF KİLİDİ
    window.KuantumKafesi.rotation.y = Math.PI / 2; 

    // 🌍 EKSEN EĞİKLİĞİ: Yan bakış profilinde ekran düzleminde tam karşıdan 23 derece sağa (saat yönüne) döndürme kilidi
    //window.KuantumKafesi.rotation.z = 0 * (Math.PI / 180); 
    window.KuantumKafesi.rotation.z = 0 * (Math.PI / 180); // Saat yönünde tam 45 derece sarmal kayma

    window.KuantumKafesi.position.y = -0.6;
    window.KuantumKafesi.position.x = 0.0;
    window.KuantumKafesi.scale.set(1.3, 1.3, 1.3);
    window.scene.add(window.KuantumKafesi);

    // --- Ortografik Kamera En-Boy Oranı Düzeltmesi ---
    const aspect = window.innerWidth / window.innerHeight;
    window.d = 1.6; // 🔑 KESİN ÇÖZÜM
    window.camera = new THREE.OrthographicCamera(- window.d * aspect, window.d * aspect, window.d, - window.d, 0.1, 1000);
    window.camera.position.set(5, 5, 5);
    window.camera.lookAt(0, 0, 0);

    // 🖥️ Renderer ve Siyah Perde Kilidi
    window.renderer = new THREE.WebGLRenderer({ antialias: true });
    window.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(window.renderer.domElement);
    window.renderer.setClearColor(0x000000, 1);

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
        const squareMat = new THREE.LineBasicMaterial({color:0x333300});
        
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
        const plusMat = new THREE.LineBasicMaterial({color:0xaaaaaa});
        
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

    //const whitePos = new THREE.Vector3(-0.25,  0.25, -0.25); 
    //const blackPos = new THREE.Vector3( 0.25, -0.25,  0.25); 
    //window.addAxis(0x00ff00, blackPos, whitePos);

   //addAxis(0xff0000, new THREE.Vector3(-10,0,0), new THREE.Vector3(10,0,0));
   //addAxis(0x00ff00, new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0));
   //addAxis(0x0000ff, new THREE.Vector3(0,0,-10), new THREE.Vector3(0,0,10));

   // 🔑 ÇAPRAZ OMURGA MÜHÜRÜ: Yeşil mili tam \(\sqrt{2}\) köşegen aksından geçirir
   // Salvador Mundi portresinin kalbine Da Vinci’nin gizlediği o en meşhur, 
   // o en kadim "Kutsal Merkez Piramitleri" (The Inner Core Pyramids) ve
   // Merkezden Köşelere Genleşen Işın Vektörleri geometrisidir.
   
    // burası kübün tam 0,0,0 mutlak sıfır noktasından (Tekillikten) doğup, 
    // 8 ana köşeye (corners) doğru bir patlama (Big Bang) şeklinde genleşen
    // o ilk iç içe geçmiş göksel ve yersel piramit şasisidir.
    
    const center = new THREE.Vector3(0,0,0);
    const pyramidVertices = [];
    corners.forEach(c=>{
        pyramidVertices.push(...center.toArray());
        pyramidVertices.push(...c.toArray());
    });
    const pyramidGeom = new THREE.BufferGeometry();
    pyramidGeom.setAttribute('position', new THREE.Float32BufferAttribute(pyramidVertices,3));
    const pyramidMat = new THREE.LineBasicMaterial({color:0xffffff});
    
    // ============================================================================
    // 🔑 GLOBAL GRUP KİLİDİ: Merkez piramit hatları doğrudan küresel kafese mühürlendi!
    window.KuantumKafesi.add(new THREE.LineSegments(pyramidGeom, pyramidMat));        // fire in the middle
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
    addTetrahedron(tetra1, 0xffffff);
    addTetrahedron(tetra2, 0xaaaaaa); // Küre materyali (saydam)
  
const sphereRadius = 0.2; // küçük küreler küpün içine sığacak


} // 👈 BÜYÜK AMİRAL GEMİSİ 'window.initMetatronEngine' 


// ============================================================================
// 📢 KUZEY IŞIĞI TEPEDEN BAKIŞ VE ELEMAN AKSI PARLATICI MOTORU
// ============================================================================
window.setTopView = function(camera, controls) {
    if (!camera || !controls || !window.KuantumKafesi) return;

    // 1. Kamerayı tam dikey Kuzey Kutup aksına (Kuzey Işığı) kilitliyoruz
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);

    // OrbitControls hedef noktasını sıfırlayıp matrisi senkronize et
    controls.target.set(0, 0, 0);
    controls.update();

    // 2. 🌌 2D KOZMİK ZODYAK HARİTASI PARLAMA EFEKTİ
    // Sahnede bulunan 4 Ana Element Aks çizgisini bulup opasitelerini arttırıyoruz
    const elementAksIsimleri = [
        "Siyah_Beyaz_Ates_Su", 
        "Sari_Pembe_Hava_Toprak", 
        "Kirmizi_Yesil_Aktif_Pasif", 
        "Turuncu_Mavi_Merkez_Eter"
    ];

    window.KuantumKafesi.children.forEach(child => {
        if (elementAksIsimleri.includes(child.name) && child.material) {
            // Normalde 0.25 olan eterik opasiteyi tam karşıdan bakıldığında 
            // 2D Zodyak kadranı gibi parlaması için 0.85 seviyesine çıkartıyoruz!
            child.material.opacity = 0.85;
            if(child.material.linewidth) child.material.linewidth = 3; 
        }
    });

    console.log("[OPTICAL ENGINE] 2D Zodyak Matrisi Aktif: Element Kaburgaları Parlatıldı! 👁️✨");
};

// ============================================================================
// FPS LİMİTLEYİCİ VE ANİMASYON DÖNGÜSÜ (TAM VE SIZINTISIZ SÜRÜM)
// ============================================================================
// 🔑 COUPLING DIRECTLY TO WINDOW CONTEXT: Time variables and the animate loop 
// are anchored globally to prevent frame-skipping and temporal desync inside the browser engine.

window.globalDönüşHızı = 0.001; 
const hedefFPS = 25;
const kareAralığı = 1000 / hedefFPS; // 40ms
window.sonKareZamanı = performance.now();

window.animate = function() {
    requestAnimationFrame(window.animate);

    // 🛠 25 FPS Zaman Kilidi (Mevcut kararlı yapınız)
    const şimdikiZaman = performance.now();
    const geçenSüre = şimdikiZaman - window.sonKareZamanı;
    if (geçenSüre < kareAralığı) return;
    window.sonKareZamanı = şimdikiZaman - (geçenSüre % kareAralığı);

    // 🔑 74 BPM BİYOLOJİK MOTOR: Zaman çarpanı ve anteni yeniden aktifleştirildi!
    const simdikiTarih = new Date();
    const saniyeZamani = simdikiTarih.getSeconds() + (simdikiTarih.getMilliseconds() / 1000); 

    // 🛠 KROMAZOM KİLİDİ: 25 FPS zaman sınırlamasını ve delta hesaplarını 
    // doğrudan mühürlediğimiz global ana döngüye paslıyoruz
    if (window.updateMetatronLoop) {
        window.updateMetatronLoop();
    }
};



// ============================================================================
// 🖥️ RESIZE OLAREK EMNİYET ŞALTERLİ KADRAJ KİLİDİ (HATA BİTİRİCİ)
// ============================================================================
window.addEventListener('resize', () => {
    // 🛡️ MUTLAK GÜVENLİK FİLTRESİ: Kamera kurulmadan bu kodun çalışıp çökmesini engeller!
    if (!window.camera || !window.renderer) return;

    const currentAspect = window.innerWidth / window.innerHeight;
    window.camera.left = -window.d * currentAspect;
    window.camera.right = window.d * currentAspect;
    window.camera.top = window.d;
    window.camera.bottom = -window.d;
    window.camera.updateProjectionMatrix();
    window.renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// ============================================================================
// 📢 Master Master Receiver Bridge - Senkronize Sürüm
// ============================================================================
window.addEventListener("message", (event) => {
    if (!event.data || !event.data.komut) return;

    // 📢 MASTER RECEIVER BRIDGE - EMİR 4: KUZEY IŞIĞI TEPEDEN BAKIŞ AKTİFLEYİCİ
    if (event.data.komut === "SET_TOP_VIEW") {
        if (typeof window.setTopView === "function") {
            // 🔑 KİLİT DÜZELTME: metatron.js içindeki parametre bekleyen yapıya global kollar paslanıyor
            window.setTopView(window.camera, window.controls);
            console.log("[OPTICAL BRIDGE] Kamera Kuzey Işığı Kutup Aksına Sabitlendi: TOP_VIEW 👁️");
        }
    }

    // 🔴 1. Eksen Milleri Aç/Kapat Tetiği
    if (event.data.komut === "EKSEN_DURUMU_DEGISTIR") {
        let butonGelenDurum = event.data.durum;
        if (typeof window.createMetatronAxes === "function") {
            window.createMetatronAxes(butonGelenDurum); 
        }
    }

    // 🟡 2. İskelet Görünürlük Tetiği (Toggle Switch)
    if (event.data.komut === "SKELETON_TOGGLE") {
        if (window.KuantumKafesi) {
            window.KuantumKafesi.visible = !window.KuantumKafesi.visible;
            if (window.currentAxisX) window.currentAxisX.visible = window.KuantumKafesi.visible;
            if (window.currentAxisY) window.currentAxisY.visible = window.KuantumKafesi.visible;
            if (window.currentAxisZ) window.currentAxisZ.visible = window.KuantumKafesi.visible;
            console.log(`[DECK PROTOCOL] Skeleton Visible Toggled To: ${window.KuantumKafesi.visible}`);
        }
    }

    // 🛑 EMİR: Kuantum Kalp Atış Şalteri (Double Vortex Başlatıcı & Temizleyici)
    if (event.data.komut === "HEART_TOGGLE") {
        window.akademikKalpAktif = event.data.durum;
        
        if (event.data.durum) {
            if (typeof window.startVortexFlux === "function") {
                window.startVortexFlux();
            }
        } else {
            if (typeof window.stopVortexFlux === "function") {
                window.stopVortexFlux();

                window.parent.postMessage({
                    komut: "METATRON_HUD_UPDATE",
                    data: {
                        id: 0,
                        renk: "Nötr",
                        frekans: "0 Hz",
                        mv: -90,
                        akimTipi: "Diyastolik Dinlenme"
                    }
                }, "*");
            }
            
            // Havada uçan kuantum mermilerini hafızadan temizle
            if (window.aktifPaketler && window.aktifPaketler.length > 0) {
                for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
                    let p = window.aktifPaketler[i];
                    if (p.mesh) {
                        window.KuantumKafesi.remove(p.mesh);
                        if (p.mesh.geometry) p.mesh.geometry.dispose();
                        if (p.mesh.material) p.mesh.material.dispose();
                    }
                }
                window.aktifPaketler = []; 
            }
            
            // 🔑 KİLİT DÜZELTME: Sızıntıyı Önleyen Çift İsim Filtreli Oda Söndürücü
            if (window.spheres && window.KuantumKafesi) {
                window.spheres.forEach(s => {

                    // 🔑 SIFIR CPU YÜKÜ: Doğrudan referans kullanımı!
                    let odaMesh = s.meshRef;


                     if (odaMesh && odaMesh.material) {
            odaMesh.material.emissiveIntensity = THREE.MathUtils.lerp(odaMesh.material.emissiveIntensity, 0.2, 0.15);
        }
        
                });
            }
            
            window.vortexPointer = 0;
            console.log("[HEART_TOGGLE] Quantum engine reset and purged to baseline state.");
        }
    }
});
