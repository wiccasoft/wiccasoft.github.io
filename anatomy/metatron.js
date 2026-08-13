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

// ============================================================================
// 🧬 GLUONSUZ KUANTUM PAKETİ: Bellekte Three.js mesh'i yaratmaz, sadece mantıksal veri taşır.
window.KuantumPaketi = class KuantumPaketi {
    constructor(kaynakMesh, hedefMesh, frekansDegeri, KuantumKafesi, yonCarpan) {
        // ... (constructor içeriği)
    }

    guncelle(sabitDelta) {
        // ... (guncelle mantığı)
    }
};


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
    if (window.akimZamanlayici) clearInterval(window.akimZamanlayici);

    // 🫀 O en baştaki kusursuz, sarsılmaz 480ms biyolojik kalp ritmi
    window.akimZamanlayici = setInterval(() => {
        if (!window.akademikKalpAktif) return;

        // 🌀 174 HZ İKİLİ KUTUP REZONANS DİZİLİMLERİ (Eril ve Dişil Akor)


        const ERIL_SEQUENCE = [1,4,7,8,5,2]; // Saat yönü (RYB Türevi)
        const DISIL_SEQUENCE =[7,4,1,5,8,2]; // Ters saat yönü (BYR Türevi)

        let pointer = window.vortexPointer % ERIL_SEQUENCE.length;

        // ============================================================================
        // ⚡ WAVE 1: ERIL AKIM DALGASI (İleri Hat)
        // ============================================================================
        let eMevcutId = ERIL_SEQUENCE[pointer];
        let eSonrakiId = ERIL_SEQUENCE[(pointer + 1) % ERIL_SEQUENCE.length];
        
        const eKaynak = window.KuantumKafesi.children.find(c => c.name === `ID_${eMevcutId}`);
        const eHedef = window.KuantumKafesi.children.find(c => c.name === `ID_${eSonrakiId}`);

        // ============================================================================
        // ⚡ WAVE 2: DİŞİL AKIM DALGASI (Geri Hat - Eşzamanlı Simetri)
        // ============================================================================
        let dMevcutId = DISIL_SEQUENCE[pointer];
        let dSonrakiId = DISIL_SEQUENCE[(pointer + 1) % DISIL_SEQUENCE.length];
        
        const dKaynak = window.KuantumKafesi.children.find(c => c.name === `ID_${dMevcutId}`);
        const dHedef = window.KuantumKafesi.children.find(c => c.name === `ID_${dSonrakiId}`);

        // --- 1. ERİL PARÇACIK DOĞUMU ---
        if (eKaynak && eHedef) {
            const eRenk = window.spheres.find(s => s.id === eMevcutId)?.color || 0xffffff;
            
            // Odaya anlık ilk vuruş darbesi
            if (eKaynak.material) {
                let darbe = (eMevcutId === 2 || eMevcutId === 4) ? 3.5 : 1.5;
                eKaynak.material.emissiveIntensity = darbe;
            }

            const pGeometri = new THREE.SphereGeometry(0.04, 8, 8);
            const pMateryal = new THREE.MeshBasicMaterial({ color: eRenk, transparent: true, opacity: 0.9 });
            const meshEril = new THREE.Mesh(pGeometri, pMateryal);
            meshEril.position.copy(eKaynak.position);
            window.KuantumKafesi.add(meshEril);

            window.paketSayaci++;
            window.aktifPaketler.push({
                id: window.paketSayaci,
                kaynak: eKaynak.position.clone(),
                hedef: eHedef.position.clone(),
                ilerleme: 0,
                hiz: 0.0174, // 174 Hz Mutlak Dalga Boyu Hızı
                mesh: meshEril,
                hedefId: eSonrakiId,
                renkHex: eRenk,
                yon: "ERIL"
            });
        }

        // --- 2. DİŞİL PARÇACIK DOĞUMU (Aynı milisaniyede tam karşı kutupta!) ---
        if (dKaynak && dHedef) {
            const dRenk = window.spheres.find(s => s.id === dMevcutId)?.color || 0xffffff;
            
            if (dKaynak.material) {
                let darbe = (dMevcutId === 2 || dMevcutId === 4) ? 3.5 : 1.5;
                dKaynak.material.emissiveIntensity = darbe;
            }

            const pGeometri = new THREE.SphereGeometry(0.04, 8, 8);
            const pMateryal = new THREE.MeshBasicMaterial({ color: dRenk, transparent: true, opacity: 0.9 });
            const meshDisil = new THREE.Mesh(pGeometri, pMateryal);
            meshDisil.position.copy(dKaynak.position);
            window.KuantumKafesi.add(meshDisil);

            window.paketSayaci++;
            window.aktifPaketler.push({
                id: window.paketSayaci,
                kaynak: dKaynak.position.clone(),
                hedef: dHedef.position.clone(),
                ilerleme: 0,
                hiz: 0.0174, // 174 Hz Mutlak Dalga Boyu Hızı
                mesh: meshDisil,
                hedefId: dSonrakiId,
                renkHex: dRenk,
                yon: "DISIL"
            });
        }

        window.vortexPointer = (window.vortexPointer + 1) % ERIL_SEQUENCE.length;
    }, 480);
};

// 🛑 Akımı ve zamanlayıcıyı tamamen kapatan fonksiyon
window.stopVortexFlux = function() {
    if (window.akimZamanlayici) {
        clearInterval(window.akimZamanlayici);
        window.akimZamanlayici = null;
    }
    window.aktifPaketler = [];
};

// ============================================================================
// DOUBLE VORTEX VE KUTSAL KAN POMPALAMA MOTORU (DOĞRUSAL RENK TAYFI FAZI)
// ============================================================================
window.aktifPaketler = []; // Sahne üzerinde canlı uçan gluon parçacıkları
window.paketSayaci = 0;    // Benzersiz parçacık kimliği
window.mevcutOdaSirasi = 0; // Doğrusal spektrumda o an aktif olan oda indisi
window.sonUretimZamani = 0; // İki parçacık üretimi arasındaki zaman kilidi

window.updateMetatronLoop = function() {

    //Sistemin Matematiksel Çalışma Mekanizması:
    // Diyastolik Dinlenme (Kırmızı -90 mV): Enerji en düşük potansiyelde sönük ve sakin başlar. 
    // Parçacık hızı yavaştır (0.618).Hızlı Depolarizasyon (Sarı +20 mV): Akım bu odaya ulaştığında emissiveIntensity 2.5 katına çıkarak
    // sahnede anlık bir parlama patlaması yaratır ve gluon hızı Altın Oran katsayısıyla (1.618) katlanarak çevre çeperlere fırlar.
    // Kasılma Plato Fazı (Yeşil 0 mV): Karaciğer ve pankreas dengesini simüle eden bu evrede hız normalleşir ve enerji topraklanır.
    if (!window.scene || !window.camera || !window.renderer || !window.KuantumKafesi) return;

    const simdikiZaman = performance.now();
    
    // ⚡ 1. KALP AKTİFSE PARÇACIK (GLUON) ÜRETİM JENERATÖRÜ
    if (window.akademikKalpAktif) {
        // Her 350ms'de bir doğrusal spektrum sırasına göre yeni bir akım dalgası fırlat
        if (simdikiZaman - window.sonUretimZamani > 350) {
            window.sonUretimZamani = simdikiZaman;

            // Mevcut odanın akademik ve frekans verilerini oku
            const mevcutOdaVerisi = window.getMetatronFrequencyState(window.mevcutOdaSirasi);
            const sonrakiOdaVerisi = window.getMetatronFrequencyState(window.mevcutOdaSirasi + 1);

            // Sahnedeki Three.js Mesh nesnelerini isimlerine göre yakala
            const kaynakMesh = window.KuantumKafesi.getObjectByName(`${mevcutOdaVerisi.renk.toUpperCase()}_ENERJI_ODASI`) || 
                               window.KuantumKafesi.getObjectByName(`${mevcutOdaVerisi.renk.toUpperCase()}_ITICI_ODA`) ||
                               window.KuantumKafesi.getObjectByName(`${mevcutOdaVerisi.renk.toUpperCase()}_KALKAN_ODASI`) ||
                               window.KuantumKafesi.getObjectByName(`${mevcutOdaVerisi.renk.toUpperCase()}_KABUK_ODASI`);

            const hedefMesh = window.KuantumKafesi.getObjectByName(`${sonrakiOdaVerisi.renk.toUpperCase()}_ENERJI_ODASI`) || 
                              window.KuantumKafesi.getObjectByName(`${sonrakiOdaVerisi.renk.toUpperCase()}_ITICI_ODA`) ||
                              window.KuantumKafesi.getObjectByName(`${sonrakiOdaVerisi.renk.toUpperCase()}_KALKAN_ODASI`) ||
                              window.KuantumKafesi.getObjectByName(`${sonrakiOdaVerisi.renk.toUpperCase()}_KABUK_ODASI`);

           if (kaynakMesh && hedefMesh) {
                // 🎯 DÜZELTME 1: Statik sabitleme kaldırıldı! 
                // Odanın ışığını pat diye eşitlemek yerine, mevcuttaki parlama değerinin üzerine 
                // odanın milivolt/altın oran gücüne göre anlık bir uyarılma enerjisi (+darbe) ekliyoruz.
                if (kaynakMesh.material) {
                    let darbeGucu = mevcutOdaVerisi.mv > 0 ? 3 : 3;
                    kaynakMesh.material.emissiveIntensity += darbeGucu; 
                }

                // Altın Oranlı Gluon Bölünmesi: Hız katsayısını doğrudan spektrumdaki fKatsayi ve altın oranla çarpıyoruz
                let hizKatsayisi = 0.2; // Taban hızı sabitledik
                
                // Senin şaşmaz altın oranlı tırmanma ve sönümlenme kuralların:
                if (mevcutOdaVerisi.mv > 0) hizKatsayisi *= 1.618; // 🚀 Sarı/Turuncu: Çarpılarak hızlanır
                if (mevcutOdaVerisi.mv === 0) hizKatsayisi *= 1.0; // 🟢 Yeşil: Dengelenir
                if (mevcutOdaVerisi.mv < 0) hizKatsayisi *= 0.618; // 🧊 Kırmızı/Mavi/Mor: Bölünerek yavaşlar

                // 🎯 DÜZELTME 2: Parçacığın rengini odanın o anki (değişmiş olabilecek) renginden değil,
                // doğrudan window.RENK_TAYFI_SPEKTRUMU sözlüğündeki akademinin mutlak ham renginden çekiyoruz!
                let orijinalOdaRengi = 0xffffff;
                if (mevcutOdaVerisi && mevcutOdaVerisi.renk) {
                    // Sözlükteki renk ismine göre hex kodunu eşleştir
                    const renkHaritasi = {
                        "Kırmızı": 0xff1100, "Turuncu": 0xff5500, "Sarı": 0xffee00,
                        "Yeşil": 0x00ff00, "Mavi": 0x0000ff, "Mor": 0x660099
                    };
                    orijinalOdaRengi = renkHaritasi[mevcutOdaVerisi.renk] || 0xffffff;
                }

                // Mantıksal kuantum paketini oluştur ve diziye fırlat
                window.paketSayaci++;
                window.aktifPaketler.push({
                    id: window.paketSayaci,
                    kaynak: kaynakMesh.position.clone(),
                    hedef: hedefMesh.position.clone(),
                    ilerleme: 0,
                    hiz: hizKatsayisi,
                    renkHex: orijinalOdaRengi, // Temiz, mutlak akademik renk kodlandı!
                    hedefId: sonrakiOdaVerisi.id // Alt döngülerin hedefi doğru bulması için ID mühürlendi
                });
            }

            // Bir sonraki odaya pürüzsüz doğrusal geçiş yap (Saniyede 6 odalı renk tayfı)
            window.mevcutOdaSirasi = (window.mevcutOdaSirasi + 1) % 6;        }
    }

    
// 🌀 KUVANTA BÜKÜMÜ: Sol taraf Ateş (Genişleyen), Sağ taraf Su (İçe Çekilen)
// ============================================================================

for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
    let p = window.aktifPaketler[i];
    p.ilerleme += p.hiz;


// 🪐 BINARY PLANETS RETROGRADE YÖRÜNGE MOTORU
if (p.mesh) {
    const geciciPozisyon = new THREE.Vector3();
    // Odalar arası ana taşıyıcı kuantum koridoru
    geciciPozisyon.lerpVectors(p.kaynak, p.hedef, p.ilerleme);

    // 🔑 GEZEGENSEL FAZ KİLİDİ: Eş merkezli ikili gezegenlerin (Binary) ortak kütleçekim dönüşü
    // Frekansı 3 katına çıkartarak şemadaki o iç içe geçen daire yaylarını (ilmekleri) çizdiriyoruz
    let binaryAci = p.ilerleme * Math.PI * 3; 
    
    // Yolun ortasında ve odaya giriş/çıkış anlarında sönümlenen pürüzsüz retrograde genliği
    let retroGenlik = Math.sin(p.ilerleme * Math.PI) * 0.20;

    // 🔄 ŞEMADAKİ KARŞILIKLI EŞ MERKEZLİ DÖNÜŞ (Eril ve Dişil Kilitli Yörünge)
    // Parçacığın kimliğine veya kaynak odasına göre (Tek/Çift ID) ikili gezegen simetrisini kuruyoruz
    if (p.id % 2 === 0) {
        // 🪐 1. GEZEGEN (Eril Aks - Saat Yönü): Odada geriye bükülerek dış yörünge yayı çizer
        geciciPozisyon.x += Math.cos(binaryAci) * retroGenlik;
        geciciPozisyon.y += Math.sin(binaryAci) * retroGenlik;
        geciciPozisyon.z += Math.sin(binaryAci) * retroGenlik * 0.5;
    } else {
        // 🪐 2. GEZEGEN (Dişil Aks - Anti-Saat Yönü): Tam karşıt fazda iç yörünge yayını (retrograde) tamamlar
        geciciPozisyon.x -= Math.cos(binaryAci) * retroGenlik;
        geciciPozisyon.y -= Math.sin(binaryAci) * retroGenlik;
        geciciPozisyon.z -= Math.sin(binaryAci) * retroGenlik * 0.5;
    }

    // Parçacığın 3D konumunu Binary Kutsal Geometri hattına mühürle
    p.mesh.position.copy(geciciPozisyon);
}
// ============================================================================
// 🌈 SPEKTRAL REZONANS: FRENLENMİŞ HIZ BAZLI RENK EŞİKLERİ
// ============================================================================
if (p.mesh && p.mesh.material) {
    
    // Parçacık en kısa yolu seçip hızlandığı için, yüksek enerji renk sınırını yukarı çekiyoruz!
    if (p.hiz > 0.035) {
        // 🔮 KUVANTUM MORU / ULTRA FREKANS: Sadece en çılgın hız patlamalarında mor/turkuaz yansısın
        p.mesh.material.color.setHex(0x660099); 
    } else if (p.hiz > 0.022) {
        // 🔥 ELEKTRİK MAVİSİ / DEPOLARIZASYON: Sarı odanın o meşhur yıldırım çakma anı
        p.mesh.material.color.setHex(0x00ffff); 
    } else if (p.hiz < 0.015) {
        // 🚨 KOZMİK REDSHIFT / KIZILÖTESİ: Yavaşlayıp Kırmızı dinlenmeye girerken kor kırmızısı
        p.mesh.material.color.setHex(0xff1100); 
    } else {
        // 🧬 DENGE FAZI KİLİDİ: p.id yerine doğrudan hedef odanın kimliğine göre cinsiyet tayini!
        // Eğer gluon Eril koridora (Kırmızı, Sarı, Turuncu) akıyorsa Turkuaz, diğer durumlarda Pembe!
        if (p.hedefId === 1 || p.hedefId === 4 || p.hedefId === 2) {
            //p.mesh.material.color.setHex(0x00f5ff); // 🪐 ERİL: Kuantum Turkuaz koridoru
        } else {
            //p.mesh.material.color.setHex(0xff00bb); // 🪐 DİŞİL: Kozmik Pembe koridoru
        }
    }
}

    // Hedefe ulaştıysa imha et
    if (p.ilerleme >= 1.0) {
        if (p.mesh) {
            window.KuantumKafesi.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
        }
        window.aktifPaketler.splice(i, 1);
    }
}

  
 // ============================================================================
    // ❄️ DOUBLE VORTEX DOĞAL SÖNÜMLENME VE ARINMA MOTORU
    // ============================================================================
    window.spheres.forEach(s => {
        const node = window.KuantumKafesi.children.find(c => c.name === `ID_${s.id}`);
        
        if (node?.material) {
            if (window.akademikKalpAktif) {
                // Her karede ışığı pürüzsüzce sıfıra doğru altın oran tümleyeni ile erit
                node.material.emissiveIntensity = THREE.MathUtils.lerp(node.material.emissiveIntensity, 0.0, 0.382);
                
                // Renkleri anında orijinal haline kilitle, kayma olmasın
                node.material.color.setHex(s.color);
                node.material.emissive.setHex(s.color);
            } else {
                // İlk açılışta ve kapanışta mat şasi temizliği
                node.material.emissiveIntensity = THREE.MathUtils.lerp(node.material.emissiveIntensity, 0.0, 0.382);
                if (node.material.emissiveIntensity < 0.01) {
                    node.material.emissiveIntensity = 0.0;
                    node.material.color.setHex(0x111111);
                    node.material.emissive.setHex(0x111111);
                }
            }
        }
    });

    // Canlı gluonlar hedefe yaklaştıkça odayı uyarır
    window.aktifPaketler.forEach(p => {
        if (p.ilerleme > 0.85 && p.ilerleme < 1.0) {
            const aktifOda = window.KuantumKafesi.children.find(c => c.name === `ID_${p.hedefId}`);
            if (aktifOda?.material && window.akademikKalpAktif) {
                let tavanGucu = (p.hedefId === 2 || p.hedefId === 4) ? 4.5 : 2.0;
                aktifOda.material.emissiveIntensity = THREE.MathUtils.lerp(aktifOda.material.emissiveIntensity, tavanGucu, 0.618);
            }
        }
    });

  // ============================================================================
    // 🔥 GLUON AKIMI ODAYA ULAŞTIĞINDA ANI YAKMA TETİĞİ (Milimetrik Çarpışma)
    // ============================================================================
    window.aktifPaketler.forEach(p => {
        // 🎯 DÜZELTME: Tam çarpmadan hemen önce (%90 ilerlemede) odayı patlat!
        if (p.ilerleme > 0.90 && p.ilerleme < 1.0) {
            const aktifOda = window.KuantumKafesi.children.find(c => c.name === `ID_${p.hedefId}`);
            if (aktifOda?.material && window.akademikKalpAktif) {
                aktifOda.material.color.setHex(p.renkHex || 0xffffff);
                aktifOda.material.emissive.setHex(p.renkHex || 0xffffff);
                
                // Senin o meşhur uyarılma çarpanın devrede
                //aktifOda.material.emissiveIntensity = THREE.MathUtils.lerp(aktifOda.material.emissiveIntensity, 4.5, 0.618);
            }
        }
    });

    // 🖥 Ekrana Çizim Motoru
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
// SİMÜLASYON ÜST BAKIŞ (TOP VIEW) KADRAJ KİLİTLEME MOTORU (KESİN ÇÖZÜM)
// ============================================================================
window.setTopView = function() {
    if (!window.camera) return;

    // 🔑 KESİN ÇÖZÜM: Kamerayı tam tepeden (Y ekseninden) aşağıya (0,0,0 merkezine) baktırıyoruz!
    // Üstteki Orthographic matrisin kilitlenmemesi için pozisyonu tam tepeye dikiyoruz.
    window.camera.position.set(0, 15, 0); 
    
    // Kameranın üst yön (up) vektörünü Z eksenine eşitlemeliyiz ki tepe bakışında kamera baş aşağı dönmesin!
    window.camera.up.set(0, 0, -1);
    
    // Tam merkezdeki 5-Fold ve plazma şelalesinin kalbine baksın
    window.camera.lookAt(0, 0, 0);

    // OrbitControls kollarının hedefini tam merkeze çivile ve güncelleyerek fare hareketini buraya kilitle!
    if (window.controls) {
        window.controls.target.set(0, 0, 0);
        window.controls.update();
    }
    
    console.log("[CORE OPTICS] Kamera Tam Üst Bakış (Kuzey Işığı Hattı) Nizamına Çivilendi. 👁️");
};

// ============================================================================
// FPS LİMİTLEYİCİ VE ANİMASYON DÖNGÜSÜ (TAM VE SIZINTISIZ SÜRÜM)
// ============================================================================
// 🔑 COUPLING DIRECTLY TO WINDOW CONTEXT: Time variables and the animate loop 
// are anchored globally to prevent frame-skipping and temporal desync inside the browser engine.

window.globalDönüşHızı = 0.005; 
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
// 🌀 BACKSTAGE QUANTUM INFINITY: BERNOULLI LEMNISCATE SIS ÇİZGİSİ (ZIRHLI SÜRÜM)
// ============================================================================
window.sonsuzlukCizgisi = null;
window.sonsuzlukZamani = 0;

window.createDseedInfinityBackground = function() {
    // 🛡️ MUTLAK GÜVENLİK BARİYERİ: Eğer Kuantum Kafesi henüz hafızada yoksa çökme, kibarca geri dön!
    if (!window.KuantumKafesi) {
        console.log("[CORE OPTICS] Kuantum Kafesi henüz hazır değil, çizgi güvenliğe alındı. 🛡️");
        return;
    }

    // Varsa eski çizgiyi sahneden uçur ki hafıza şişmesin
    if (window.sonsuzlukCizgisi) {
        window.KuantumKafesi.remove(window.sonsuzlukCizgisi);
        if (window.sonsuzlukCizgisi.geometry) window.sonsuzlukCizgisi.geometry.dispose();
        if (window.sonsuzlukCizgisi.material) window.sonsuzlukCizgisi.material.dispose();
    }

    const curvePoints = [];
    const segments = 144; // Altın oran bölümlendirmesi
    
    // Sonsuzluk (∞) matematiksel Bernoulli Lemniscate döngüsü
    for (let i = 0; i <= segments; i++) {
        let t = (i / segments) * Math.PI * 2;
        let scale = 1.35; // 5-Fold çemberlerinin tam arkasını kaplayacak altın ölçek
        
        let x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
        let y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
        
        // Z ekseninde parçacıkların ve kürelerin hafifçe arkasına (-0.25) itiyoruz
        curvePoints.push(new THREE.Vector3(x, y, -0.25));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const material = new THREE.LineBasicMaterial({
        color: 0xff00ff,          // Kuantum Pembesi
        transparent: true,
        opacity: 0.12,            // Gözü yormayacak hafif bir gizli sis tabanı
        blending: THREE.AdditiveBlending,
        linewidth: 1.5
    });

    window.sonsuzlukCizgisi = new THREE.Line(geometry, material);
    window.sonsuzlukCizgisi.name = "DSEED_INFINITY_LINE";
    
    // Çizgiyi iskelet grubuna bağlıyoruz
    window.KuantumKafesi.add(window.sonsuzlukCizgisi);
    console.log("[CORE GEOMETRY] Sonsuzluk (∞) Sis Çizgisi 5-Fold Arkasına Mühürlendi. 🌀");
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
// 📢 THE NATIVE MASTER IFRAME RECEIVER (METATRON.JS - KALP ATALET ŞALTERİ)
// ============================================================================
// ============================================================================
// 📢 CONTROL DECK RECEIVER BRIDGE (HARİCİ KARE BUTONLARDAN GELEN EMİR MOTORU)
// ============================================================================
window.addEventListener("message", (event) => {
    if (!event.data) return;

    
    // ============================================================================
    // 📢 MASTER RECEIVER BRIDGE - EMİR 4: KUZEY IŞIĞI TEPEDEN BAKIŞ AKTİFLEYİCİ
    // ============================================================================
    if (event.data.komut === "SET_TOP_VIEW") {
        if (typeof window.setTopView === "function") {
            window.setTopView();
            console.log("[OPTICAL BRIDGE] Kamera Kuzey Işığı Kutup Aksına Sabitlendi: TOP_VIEW 👁️");
        }
    }

    // 🔴 1. Eksen Milleri Aç/Kapat Tetiği (Senin init içinde bilerek uyanık açtığın miller)
    if (event.data.komut === "EKSEN_DURUMU_DEGISTIR") {
        let butonGelenDurum = event.data.durum; // true veya false sinyali gelir
        if (window.createMetatronAxes) {
            window.createMetatronAxes(butonGelenDurum); 
        }
    }

    // 🟡 2. İskelet Görünürlük Tetiği (Toggle Switch)
    if (event.data.komut === "SKELETON_TOGGLE") {
        if (window.KuantumKafesi) {
            window.KuantumKafesi.visible = !window.KuantumKafesi.visible;
            // Eksen milleri iskeletle senkronize hareket etsin kafa karışmasın
            if (window.currentAxisX) window.currentAxisX.visible = window.KuantumKafesi.visible;
            if (window.currentAxisY) window.currentAxisY.visible = window.KuantumKafesi.visible;
            if (window.currentAxisZ) window.currentAxisZ.visible = window.KuantumKafesi.visible;
            console.log(`[DECK PROTOCOL] Skeleton Visible Toggled To: ${window.KuantumKafesi.visible}`);
        }
    }

     // 🛑 EMİR: Kuantum Kalp Atış Şalteri (Double Vortex Başlatıcı)
    if (event.data.komut === "HEART_TOGGLE") {
        window.akademikKalpAktif = event.data.durum;
        // Akımı başlat veya durdur
        event.data.durum ? window.startVortexFlux() : window.stopVortexFlux();
    }
});

