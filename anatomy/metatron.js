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

window.vortexPointer = 0;
window.akimZamanlayici = null;
const MATTER_SEQUENCE = [1,2,4,8,7,5];

// 🚀 Sadece buton tetiklendiğinde çalışan bağımsız akım üreteci
window.startVortexFlux = function() {
    if (window.akimZamanlayici) clearInterval(window.akimZamanlayici);

    window.akimZamanlayici = setInterval(() => {
        if (!window.akademikKalpAktif) return;

        // 🌟 KESİN ÇÖZÜM: Akademik milivolt durumunu en başta çekiyoruz ki tüm fonksiyon görebilsin!
        const odaVerisi = window.getMetatronFrequencyState(window.vortexPointer);

        let mevcutId = MATTER_SEQUENCE[window.vortexPointer];
        let sonrakiId = MATTER_SEQUENCE[(window.vortexPointer + 1) % MATTER_SEQUENCE.length];

        // 🔑 1. VİDA: Frenlenmiş taban hız katsayısı (Yukarı alınan odaVerisi ile sarsılmaz uyumda)
        let hizKatsayisi = 0.018; 
        if (odaVerisi.mv > 0) hizKatsayisi *= 1.618; // Sarı odada ivmelenme çarpanı
        if (odaVerisi.mv < 0) hizKatsayisi *= 0.618; // Dinlenme odalarında yavaşlama

        // Odaların isim eşleşmelerine göre mesh nesnelerini hafızadan direkt çek
        const kaynakMesh = window.KuantumKafesi.children.find(c => c.name && c.name.includes(`ID_${mevcutId}`));
        const hedefMesh = window.KuantumKafesi.children.find(c => c.name && c.name.includes(`ID_${sonrakiId}`));

        if (kaynakMesh && hedefMesh) {
            
            // ============================================================================
            // 🔥 ODA ATEŞLEME VE VOLTAJ PARLAMASI
            // ============================================================================
            if (kaynakMesh.material) {
                // 💡 Sarı oda (+20 mV Depolarizasyon) ise 3.5 katı devasa bir patlama yarat!
                kaynakMesh.material.emissiveIntensity = odaVerisi.mv > 0 ? 3.5 : 1.5;
                
                // Kürenin rengini karartılmış mat halinden kendi saf enerjisel rengine geri döndür!
                const orijinalRenk = window.spheres.find(s => `ID_${s.id}` === kaynakMesh.name)?.color || 0xffffff;
                kaynakMesh.material.color.setHex(orijinalRenk);
                kaynakMesh.material.emissive.setHex(orijinalRenk);
            }

            // 🔴 PARÇACIK GÖRSEL KATMANI: Ekranda görünecek pembe akım küresi
            const paketGeometri = new THREE.SphereGeometry(0.04, 8, 8); // Küçük hafif bir gluon
            const paketMateryal = new THREE.MeshBasicMaterial({
                color: 0xff00ff, // Pembe Akım Rengi
                transparent: true,
                opacity: 0.9
            });
            const meshParcacik = new THREE.Mesh(paketGeometri, paketMateryal);
            meshParcacik.position.copy(kaynakMesh.position);

            // Fiziksel parçacığı ana gruba ekle ki ekranda gözüksün!
            window.KuantumKafesi.add(meshParcacik);

            // 🔑 MÜKERRER HIZ TANIMI KALDIRILDI: Yukarıda hesaplanan dinamik hizKatsayisi direkt kullanılıyor!

            // Parçacığı canlı listeye ekle
            window.paketSayaci++;
            window.aktifPaketler.push({
                id: window.paketSayaci,
                kaynak: kaynakMesh.position.clone(),
                hedef: hedefMesh.position.clone(),
                ilerleme: 0,
                hiz: hizKatsayisi,
                mesh: meshParcacik
            });
        }
        
        window.vortexPointer = (window.vortexPointer + 1) % MATTER_SEQUENCE.length;
    }, 480); // 🔑 2. VİDA: 480ms sakin biyolojik ritim kilidi
};

// 🛑 Akımı ve zamanlayıcıyı tamamen kapatan fonksiyon
window.stopVortexFlux = function() {
    if (window.akimZamanlayici) {
        clearInterval(window.akimZamanlayici);
        window.akimZamanlayici = null;
    }
    // Havadaki tüm paketleri anında ve temizce bellekten uçur
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

// 🌀 Aktif paketleri güncelle, fiziksel olarak yürüt ve hedefe ulaşanları sil
// 🌀 Sahnede uçan pembe küreleri KAVİSLİ/YAY şeklinde yürüt
for (let i = window.aktifPaketler.length - 1; i >= 0; i--) {
    let p = window.aktifPaketler[i];
    p.ilerleme += p.hiz;

// 🌀 KUVANTA BÜKÜMÜ: Sol taraf Ateş (Genişleyen), Sağ taraf Su (İçe Çekilen)
// ============================================================================
// 🌀 MONA LISA AYNALI KUVANTA BÜKÜMÜ (MÜHÜRLENDİ)
// ============================================================================
// ============================================================================
// 🌌 KOZMİK REDSHIFT: MAVİDEN KIRMIZIYA KIZILÖTESİ KAYMA MOTORU
// ============================================================================
// ============================================================================
// 🌀 REZONANS KİLİDİ: FAZ KARŞITLIĞI VE TERS SİNÜS DALGASI MOTORU
// ============================================================================
// 🌀 ŞEMAYA UYGUN ASİMETRİK TORUS AKIŞ MOTORU (Görseldeki sarmal yapı)
// ⚡ REKTEFE EDİLMİŞ KIRMIZI-SARI KUVANTUM MOTORU
if (p.mesh) {
    const geciciPozisyon = new THREE.Vector3();
    let efektifIlerleme = p.ilerleme;

    // 🚀 KIRMIZIDA DELİ GİBİ HIZLANMA KİLİDİ
    // Eğer hedef Sarı Oda (ID 4) ise, parçacık Kırmızı'dan (ID 1) çıkıp 
    // Sarı'ya doğru yaklaşırken hızı (ilerlemesi) üstel olarak katlanır!
    if (p.hedefId === 4) {
        // İlerleme hızını baştan dikleştirip sonuna doğru ivmelendiriyoruz
        efektifIlerleme = Math.sin(p.ilerleme * Math.PI * 0.5); 
    }

    // Odalar arası hattı güncellenmiş ivme eğrisiyle hesapla
    geciciPozisyon.lerpVectors(p.kaynak, p.hedef, efektifIlerleme);

    // 🌀 SARI ODA ZİRVE DÖNGÜ VE SPIN FREKANSI (En Sıcak Merkez)
    // Parçacık Sarı oda (ID 4) hedefine kilitlendiyse 16 kat çılgın bir spin atar!
    let tepeFrekans = p.hedefId === 4 ? 16.0 : 3.0;
    let spinAci = efektifIlerleme * Math.PI * tepeFrekans; 
    let spinGenlik = Math.sin(efektifIlerleme * Math.PI) * 0.38;

    // Binary Planets (Kutsal Şemadaki İkili Gezegen Dengesi)
    if (p.id % 2 === 0) {
        geciciPozisyon.x += Math.cos(spinAci) * spinGenlik;
        geciciPozisyon.y += Math.sin(spinAci) * spinGenlik;
        geciciPozisyon.z += Math.sin(spinAci) * spinGenlik * 0.5;
    } else {
        geciciPozisyon.x -= Math.cos(spinAci) * spinGenlik;
        geciciPozisyon.y -= Math.sin(spinAci) * spinGenlik;
        geciciPozisyon.z -= Math.sin(spinAci) * spinGenlik * 0.5;
    }

    // 🔥 SARI ODA "ANLIK YAKMA" VE PLAZMA EFEKTİ
    if (p.hedefId === 4 && p.ilerleme > 0.3) {
        const sariOdaMesh = window.metatronOdalar ? window.metatronOdalar : null;
        if (sariOdaMesh) {
            // Sarı oda, içine giren gluonların çılgın dönüşüyle parlar ve ısınır
            let isiParlamasi = Math.sin(p.ilerleme * Math.PI * 8) * 3.0;
            sariOdaMesh.material.color.setHex(0xffaa00).multiplyScalar(2.0 + isiParlamasi);
            sariOdaMesh.scale.setScalar(1.0 + isiParlamasi * 0.1); // Isı genleşmesi/titremesi
        }
    }

    p.mesh.position.copy(geciciPozisyon);
}
// ============================================================================
// 🌈 SPEKTRAL REZONANS: FRENLENMİŞ HIZ BAZLI RENK EŞİKLERİ
// ============================================================================
if (p.mesh && p.mesh.material) {
    
    // Parçacık en kısa yolu seçip hızlandığı için, yüksek enerji renk sınırını (0.02'den 0.035'e) yukarı çekiyoruz!
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
        // 💧 ZÜMRÜT YEŞİLİ / DENGE FAZI: Çarkın sağındaki pürüzsüz su topraklaması
        p.mesh.material.color.setHex(0x00ff00); 
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
    // 🌬️ INFINITY PULSE: RİTMİK NEFES ALMA VE PARLAMA SİMÜLASYONU
    // ============================================================================
    if (window.sonsuzlukCizgisi && window.sonsuzlukCizgisi.material) {
        window.sonsuzlukZamani += 0.03; // Nefes hızı katsayısı
        
        if (window.akademikKalpAktif) {
            // Kalp aktifken akımla senkronize dalgalanan parıltı (0.08 ile 0.35 arası)
            window.sonsuzlukCizgisi.material.opacity = 0.12 + Math.sin(window.sonsuzlukZamani) * 0.18;
        } else {
            // Kalp kapatıldığında pürüzsüzce sönerek baz loşluğuna (`0.05`) geri çekilsin
            if (window.sonsuzlukCizgisi.material.opacity > 0.05) {
                window.sonsuzlukCizgisi.material.opacity -= 0.01;
            }
        }
    }

  // ============================================================================
    // ❄️ ODALARIN AKIM SONRASI KADEMELİ SOĞUMA VE KARARMA KALKANI
    // ============================================================================
    window.spheres.forEach(s => {
        const node = window.KuantumKafesi.getObjectByName(`ID_${s.id}`);
        if (node?.material) {
            // Eğer oda hala parlaksa her karede hafifçe parlaklığını azalt
            if (node.material.emissiveIntensity > 0.3) {
                node.material.emissiveIntensity -= 0.04; // Soğuma/Sönme hızı
            } else if (!window.akademikKalpAktif) {
                // 🖤 Kalp kapatıldıysa odaları tamamen 0x111111 mat şasisine geri göm!
                node.material.emissiveIntensity = 0.0;
                node.material.color.setHex(0x111111);
                node.material.emissive.setHex(0x111111);
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
        new THREE.MeshPhongMaterial({
            color: s.color, emissive: s.color, emissiveIntensity: 0.5,
            transparent: true, opacity: 0.85
        })
    );
    sphere.position.copy(s.pos);
    sphere.name = `ID_${s.id}`; // 🔑 KESİN ÇÖZÜM: ID'leri mühürledik!
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

