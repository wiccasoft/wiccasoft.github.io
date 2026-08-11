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
// ☯️ FIVE-FOLD ELEMENTAL CORE ENGINE (5-FOLD ÇEMBER VE VEKTÖR MOTORU)
// ============================================================================
window.createFiveFoldCore = function(isCoreVisible) {
    // 🛠️ Eski 5-Fold kalıntıları varsa bellekten pürüzsüzce temizle
    if (window.FiveFoldGrubu) {
        if (window.KuantumKafesi) window.KuantumKafesi.remove(window.FiveFoldGrubu);
        window.scene.remove(window.FiveFoldGrubu);
        window.FiveFoldGrubu.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        });
        window.FiveFoldGrubu = null;
    }

    // Eğer buton kapalıysa (false) çizim yapmadan direkt çık
    if (!isCoreVisible) return;

    window.FiveFoldGrubu = new THREE.Group();
    window.FiveFoldGrubu.name = "FIVE_FOLD_CORE_GROUP";

    window.FiveFoldGrubu.rotation.z = 90 * (Math.PI / 180); 

    const cemberYaricapi = 0.25; // Altın oran ölçeğinde element halkaları çapı
    const segments = 64;         // Çemberlerin pürüzsüzlük kalitesi

    // 🌀 4 ANA ÇEMBERİN DOĞRU ÇAPRAZ KOORDİNAT MATRİSİ (45'er Derecelik Aks Kayması)
    // Şemadaki Beltane, Lughnasadh, Samhain ve Imbolc merkezleri
    const d = cemberYaricapi * 0.707; // Math.cos(45) veya Math.sin(45) çarpanı

    const dogruMerkezler = [
        { x:  d, y:  d, z: 0, name: "CEMBER_BELTANE" },     // ↗ (Beltane Açısı)
        { x:  d, y: -d, z: 0, name: "CEMBER_LUGHNASADH" },  // ↘ (Lughnasadh Açısı)
        { x: -d, y: -d, z: 0, name: "CEMBER_SAMHAIN" },    // ↙ (Samhain Açısı)
        { x: -d, y:  d, z: 0, name: "CEMBER_IMBOLC" }       // ↖ (Imbolc Açısı)
    ];

    // 🔑 KRİTİK DÜZELTME: Artık 'dogruMerkezler' dizisini dönüyoruz!
    dogruMerkezler.forEach(el => {
        const geom = new THREE.RingGeometry(cemberYaricapi - 0.005, cemberYaricapi + 0.005, segments);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        const cemberMesh = new THREE.Mesh(geom, mat);
        cemberMesh.position.set(el.x, el.y, el.z);
        cemberMesh.name = el.name;
        window.FiveFoldGrubu.add(cemberMesh);
    });

    // 🔴 4 KRİTİK KESİŞİM BİLYESİ (Şemadaki Litha, Yule, Ostara, Mabon noktaları)
    // Çemberler çaprazlara kayınca, birbirlerini tam olarak ana dikey ve yatay haç eksenlerinde keserler.
    const nodGeom = new THREE.SphereGeometry(0.012, 16, 16);
    const nodMat = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Saf Kırmızı Düğüm

    // Şemadaki tam kesişim noktalarının geometrik konumları:
    const semaDugumleri = [
        { x: 0,  y:  cemberYaricapi, z: 0, name: "NODE_LITHA" },   // ⬆ Gündönümü (Üst)
        { x: 0,  y: -cemberYaricapi, z: 0, name: "NODE_YULE" },    // ⬇ Gündönümü (Alt)
        { x: -cemberYaricapi, y: 0,  z: 0, name: "NODE_OSTARA" },  // ⬅ Ekinoks (Sol)
        { x:  cemberYaricapi, y: 0,  z: 0, name: "NODE_MABON" }   // ➡ Ekinoks (Sağ)
    ];

    semaDugumleri.forEach(nod => {
        const nodMesh = new THREE.Mesh(nodGeom, nodMat);
        nodMesh.position.set(nod.x, nod.y, nod.z);
        nodMesh.name = nod.name;
        window.FiveFoldGrubu.add(nodMesh);
    });

// 🔵 MAVİ ESİR ÇEMBERİ (Ether / Merkez Manyetik Kalkan Hattı)
    const maviGeom = new THREE.RingGeometry(cemberYaricapi * 1.414 - 0.006, cemberYaricapi * 1.414 + 0.006, segments);
    const maviMat = new THREE.MeshBasicMaterial({ color: 0x0077ff, side: THREE.DoubleSide });
    const maviCember = new THREE.Mesh(maviGeom, maviMat);
    maviCember.name = "CEMBER_ETHER_SHIELD";
    
    // 🔑 KİLİT: Görsel sadelik ve derinlik netliği için mavi kalkanı gizliyoruz
    maviCember.visible = false; 
    
    window.FiveFoldGrubu.add(maviCember);

    // ⚫ MUTLAK SIFIR NOKTASI FREKANSI (Merkez Kara Delik Düğümü)
    const merkezGeom = new THREE.SphereGeometry(0.018, 16, 16);
    const merkezMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const merkezMesh = new THREE.Mesh(merkezGeom, merkezMat);
    merkezMesh.name = "NODE_ETHER_SINGULARITY";
    window.FiveFoldGrubu.add(merkezMesh);

    // 🔑 5-Fold Yapısı Doğrudan İskelet Grubunun Göbeğine Kenetlenir!
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(window.FiveFoldGrubu);
    }
    console.log(`[FIVE-FOLD PROTOCOL] 5-Fold Çapraz Yıl Çarkı Düzeni İskelete Giydirildi.`);
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
window.RENK_TAYFI_SPEKTRUMU = [
    { id: 8, name: "YESIL_ENERJI_ODASI",   mv:   0, renk: "Yeşil",   frekans: "528 Hz" }, // Denge / Topraklama
    { id: 1, name: "KIRMIZI_ENERJI_ODASI", mv: -90, renk: "Kırmızı", frekans: "174 Hz" }, // İçe Çekilme / Dinlenme
    { id: 4, name: "SARI_ITICI_ODA",       mv:  20, renk: "Sarı",    frekans: "396 Hz" }, // Depolarizasyon / Genleşme
    { id: 5, name: "MOR_KABUK_ODASI",      mv: -90, renk: "Mor",     frekans: "852 Hz" }, // Hiperpolarizasyon
    { id: 2, name: "TURUNCU_EMICI_ODA",    mv: -70, renk: "Turuncu", frekans: "285 Hz" },
    { id: 7, name: "MAVI_KALKAN_ODASI",    mv: -60, renk: "Mavi",    frekans: "741 Hz" }
];



// 🎛 3. ŞALTERLER KİLİTLENİYOR
window.sonUretimZamani = 0;
window.mevcutOdaSirasi = 0;
window.frameSayaci = 0; 

/**
 * Milivolt (mV) ve Vagus sinyallerine göre parçacıkları ve Metatron'u günceller.
 * anatomy.html içindeki animate() döngüsünde tek satırda çağrılır.
 */

//const RENK_TAYFI_SPEKTRUMU = [1,2,4,8,7,5];


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
    //  sahnede anlık bir parlama patlaması yaratır ve gluon hızı Altın Oran katsayısıyla (1.618) katlanarak çevre çeperlere fırlar.
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
                // Enerji akışı başlarken kaynak odanın ışık yoğunluğunu (Aydınlanmasını) patlat
                if (kaynakMesh.material) {
                    kaynakMesh.material.emissiveIntensity = mevcutOdaVerisi.mv > 0 ? 2.5 : 1.2; 
                }

                // Altın Oranlı Gluon Bölünmesi: Sarı Odada (+20mV) enerji katlanır, hızı 1.618 ile çarpılır
                let hizKatsayisi = 0.05;
                if (mevcutOdaVerisi.mv > 0) hizKatsayisi *= 1.618; // Depolarizasyon Genleşmesi
                if (mevcutOdaVerisi.mv === 0) hizKatsayisi *= 1.0; // Topraklama Fazı
                if (mevcutOdaVerisi.mv < 0) hizKatsayisi *= 0.618; // Gevşeme ve Sönümlenme

                // Mantıksal kuantum paketini oluştur ve diziye fırlat
                window.paketSayaci++;
                window.aktifPaketler.push({
                    id: window.paketSayaci,
                    kaynak: kaynakMesh.position.clone(),
                    hedef: hedefMesh.position.clone(),
                    ilerleme: 0,
                    hiz: hizKatsayisi,
                    renkHex: kaynakMesh.material.color.getHex()
                });
            }

            // Bir sonraki odaya pürüzsüz doğrusal geçiş yap (Saniyede 6 odalı renk tayfı)
            window.mevcutOdaSirasi = (window.mevcutOdaSirasi + 1) % 6;
        }
    }

    // 🌀 2. SAHNEDEKİ PARÇACIKLARIN POZİSYONLARINI VE SOĞUMA EFEKTLERİNİ GÜNCELLE
    for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
        let p = window.aktifPaketler[i];
        p.ilerleme += p.hiz;

        // Eğer parçacık hedefe ulaştıysa bellekten pürüzsüzce imha et
        if (p.ilerleme >= 1.0) {
            window.aktifPaketler.splice(i, 1);
        }
    }

    // Odaların aşırı parlayıp patlamasını önleyen zaman bazlı pürüzsüz soğuma kalkanı
    window.spheres.forEach(s => {
        const nodeMesh = window.KuantumKafesi.getObjectByName(s.name);
        if (nodeMesh && nodeMesh.material && nodeMesh.material.emissiveIntensity > 0.5) {
            nodeMesh.material.emissiveIntensity -= 0.02; // Sönümlenme eğrisi
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
        new THREE.SphereGeometry(0.16, 32, 32),
        new THREE.MeshPhongMaterial({
            color: s.color, emissive: s.color, emissiveIntensity: 0.5,
            transparent: true, opacity: 0.85
        })
    );
    sphere.position.copy(s.pos);
    window.KuantumKafesi.add(sphere); // Doğrudan gruba ekle
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
// SİMÜLASYON ÜST BAKIŞ (TOP VIEW) KADRAJ KİLİTLEME MOTORU
// ============================================================================
// 🔑 DIŞ ERİŞİM KİLİDİ: Fonksiyon window katmanına bağlanarak dış ana HUD panelindeki 
// butondan tek bir tıkla uzaktan kamerayı 90 derece dikey eksene çiviler!

window.setTopView = function() {
    if (!window.camera) return;

    // Kamerayı tam üst dikey aksa (Kuzey Işığı Hattına) sabitle
    window.camera.position.set(0, 10, 0); 
    window.camera.lookAt(0, 0, 0);

    // OrbitControls kolları yukarıda global yapıldığı için doğrudan güncelleniyor
    if (window.controls) {
        window.controls.target.set(0, 0, 0);
        window.controls.update();
    }
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



function toggleSkeletonButton() {
    if (window.skeletonState === undefined) window.skeletonState = true;
    window.skeletonState = !window.skeletonState;
    
    console.log(`[DECK] Iskelet Butonu Tetiklendi. Yeni Sinyal: ${window.skeletonState}`);
    
    // 🔑 KESİN ÇÖZÜM: Başına window. ekleyerek parantez hapishanelerini tamamen delip geçiyoruz!
    // Böylece fonksiyon içeride hapsolmuş olsa bile tarayıcı global adresten bu vericiyi çalıştırır.
    if (typeof window.firlatSinyal === 'function') {
        window.firlatSinyal({ komut: "SKELETON_TOGGLE", durum: window.skeletonState });
    } else if (typeof firlatSinyal === 'function') {
        firlatSinyal({ komut: "SKELETON_TOGGLE", durum: window.skeletonState });
    } else {
        // 📡 Alternatif Kalkan: Eğer fonksiyon bir yerlere hapsolduysa, iframe'i doğrudan buradan uyar
        const metatronIframe = document.getElementById("metatronIframeId") || document.querySelector("iframe");
        if (metatronIframe && metatronIframe.contentWindow) {
            metatronIframe.contentWindow.postMessage({ komut: "SKELETON_TOGGLE", durum: window.skeletonState }, "*");
            console.log("[DECK BACKUP] İskelet emri doğrudan iframe'e fırlatıldı.");
        }
    }
}

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
// 📢 HARİCİ BUTON ŞALTER DİNLEYİCİSİ (AŞAĞIDAKİ GEOMETRİYİ ASLA ETKİLEMEZ)
// ============================================================================
window.addEventListener("message", (event) => {
    if (event.data && event.data.komut === "EKSEN_DURUMU_DEGISTIR") {
        let butonGelenDurum = event.data.durum; // true veya false sinyali gelir
        
        if (window.createMetatronAxes) {
            // init motoruna dokunmadan sadece harici fonksiyonu tetikler
            window.createMetatronAxes(butonGelenDurum); 
        }
    }
});


// ============================================================================
// 📢 CONTROL DECK RECEIVER BRIDGE (HARİCİ KARE BUTONLARDAN GELEN EMİR MOTORU)
// ============================================================================
window.addEventListener("message", (event) => {
    if (!event.data) return;

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

    // 🛑 3. Kuantum Kalp Atış Şalteri
    if (event.data.komut === "HEART_TOGGLE") {
        window.akademikKalpAktif = !window.akademikKalpAktif;
        if (window.metatronAydinlanmaAsamasi < 3) window.metatronAydinlanmaAsamasi = 3;
        console.log(`[DECK PROTOCOL] Kuantum Kalp Durumu Değiştirildi: ${window.akademikKalpAktif}`);
    }
});


// ============================================================================
// 📢 THE NATIVE MASTER IFRAME RECEIVER (METATRON.JS - TEK VE MUTLAK ALICI KAPISI)
// ============================================================================
window.addEventListener("message", (event) => {
    if (!event.data || !event.data.komut) return;

    // 🔴 EMİR 1: RGB Eksen Milleri (Mükerrer Çağrıları Bitiren Tek Merkez Kontrolü)
    if (event.data.komut === "EKSEN_DURUMU_DEGISTIR") {
        let gelenDurum = event.data.durum; // main.html'den gelen net true/false durumu
        
        // 🔑 KESİN ÇÖZÜM: Fonksiyonu sadece burada tek bir kez çağırıyoruz!
        if (window.createMetatronAxes) {
            window.createMetatronAxes(gelenDurum);
        }

        // Küresel pointer görünürlüklerini de direkt burada garanti altına alıyoruz
        if (window.currentAxisX) window.currentAxisX.visible = gelenDurum;
        if (window.currentAxisY) window.currentAxisY.visible = gelenDurum;
        if (window.currentAxisZ) window.currentAxisZ.visible = gelenDurum;

        console.log(`[CORE BRIDGE] RGB Kalibrasyon Milleri Doğrudan Tetiklendi. Görünürlük: ${gelenDurum}`);
    }

    // 🟡 EMİR 2: Büyük İskelet Kafesi (Toggle Kilit Çözümü)
    if (event.data.komut === "SKELETON_TOGGLE") {
        let gelenDurum = event.data.durum; // main.html'den gelen net true/false durumu
        
        // Büyük Kuantum Kafesi grubunu ve tüm çocuklarını tek tıkla kapat/aç
        if (window.KuantumKafesi) {
            window.KuantumKafesi.visible = gelenDurum;
            window.KuantumKafesi.children.forEach(child => {
                child.visible = gelenDurum;
            });
        }

        // RGB kalibrasyon millerini kendi bağımsız buton şalterinde (window.axesState) koru
        let eksenDurumu = window.axesState !== false;
        if (window.currentAxisX) window.currentAxisX.visible = eksenDurumu;
        if (window.currentAxisY) window.currentAxisY.visible = eksenDurumu;
        if (window.currentAxisZ) window.currentAxisZ.visible = eksenDurumu;

        console.log(`[CORE BRIDGE] Metatron Skeleton Visibility Moved To: ${gelenDurum}`);
    }

    // 🛑 EMİR 3: Kuantum Kalp Atış Şalteri (Double Vortex Jeneratörü)
    if (event.data.komut === "HEART_TOGGLE") {
        let gelenDurum = event.data.durum; 
        window.akademikKalpAktif = gelenDurum;
        window.metatronAydinlanmaAsamasi = gelenDurum ? 3 : 1;
        
        console.log(`[CORE BRIDGE] Kuantum Kalp Motoru Durumu: ${gelenDurum ? 'ACTIVE_FLUX' : 'STATIC_SKELETON'}`);

        // Eğer kalp kapatıldıysa havadaki tüm uçan gluon paketlerini anında imha et
        if (!gelenDurum) {
            for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
                window.KuantumKafesi.remove(window.aktifPaketler[i].mesh);
                window.aktifPaketler[i].mesh.geometry.dispose();
                window.aktifPaketler[i].mesh.material.dispose();
            }
            window.aktifPaketler = [];
/*
            // Tüm odaları karartarak o sönük mat 0x111111 şasisine geri kilitle
            window.RENK_TAYFI_SPEKTRUMU.forEach(oda => {
                let nodeMesh = window.KuantumKafesi.getObjectByName(oda.name);
                if (nodeMesh && nodeMesh.material) {
                    nodeMesh.material.emissiveIntensity = 0.0;
                    nodeMesh.material.color.setHex(0x111111);
                    nodeMesh.material.emissive.setHex(0x111111);
                }
            });*/
        }
    }
}); // 🔑 PARANTEZ KİLİDİ: Master dinleyicinin ucu burada hatasız mühürleniyor!
