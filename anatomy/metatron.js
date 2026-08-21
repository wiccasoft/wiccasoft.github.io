// ==========================================================================================
// 🪐 METATRON CORE ENGINE - METABOLIC PATHWAY & PURE HEART CORE (432hz)  (c) 2026 wiccasoft
// ==========================================================================================

const M_UP   = [1,4,7]   
const M_DOWN = [2,8,5]   

const SPINE = [2,7]
const ROOT_TWO = Math.sqrt(2); 
const METATRON = {RIGHT:[1,2,4],LEFT:[8,7,5],UP:2,BOTTOM:7}
const ELEMENTS = {earth:8,air:2,water:7,fire:1}

const M_direction= [{east:1},{west:8}]

window.colorspectrum = [1, 2, 4, 8, 7, 5]; 
window.solfeggiospec = [1, 7, 4, 2, 8, 5];

//SOLFEGGIO 1-7-4-2-8-5 (RED YELLOW BLUE MODEL) subtractive RAINBOW
//solfeggio = {core:{u:174,d:285,s:369},middle:{u:417,d:528,ss:936},shell:[{u:741,d:852,s:693}]}; //  3,6,9 

// 174-417-741 (RYB) 528hz is green (solar plexus)
// stilness actually yellowness in solfeggio model
// (174 285 (369)) RYB : 3(-)(beyaz)sarı <-> magenta 6(+)(siyah)

//solfegio.middle.d+solfegio.middle.u = mod9{solfegio.middle.d/solfegio.niddle.s}
//solfegio.middle.d/solfegio.middle.u = 1.26

//174,285,396  R 1. core             // orange  :  6, 12, 24, 48,   96,  (3-6)       
//417,528,636  G 2. cytoplasm        // green   :  8, 16, 32, 64,  256,  
//741,852,693  B 3. shell            // magenta :  9, 45, 90, 180, 360   (9)

// The universe is built on vibrations. Even objects that appear to be stationary are in fact vibrating, 
// oscillating, and resonating at various frequencies. 64/24 = 2.6 (33*16) ; 4 turuncu - 7 mavi (below 9)

//9*4 cyan     36  72 144 288                                //magenta =    0   0    100    
//9*5 magenta  45  90 180 360                                //yellow  =  100  100     0 
//9*6 orange   54 108 216 432                                
//9*7 green    63 7*9  (7*6 - 7*3 )


// colorspectrum dizisi, METATRON_SPECTRUM_MODEL.e verisi metatronu yakma sayısı/sn (999 - COLOR_SPECTRUM_MODEL.q) verisiyle ms de söner

/*
window.METATRON_SPECTRUM_MODEL = [
//  777 breath in                                                                         
// 🔥 YÜKSELEN AKS (Isınma / Genleşme / Sistol): eklenerek Katlanır (* 1.618)     777        
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    e: 1.000, q: 174, oid: "8" }, // (+Phi^0)
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", e: 1.618, q: 285, oid: "7" }, // (+Phi^1)
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", e: 2.238, q: 417, oid: "5" }, // (+Phi^1)
  //                                                                              -396- 
    // 🤍🖤 THE SACRED HANDS MATRIX (Jesus' Hand Gestures & Orb Placement)        666 fire in the midddle
    { id: 3, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  e: 2.856, q: 936, oid: "6"}, // Left hand: blessing the air
    { id: 6, name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  e: 2.256, q: 639, oid: "3"}, // Right hand: holding the earthly orb
// 222 breath out                                                                 -369-                     
    // 💧 DECAYING AXIS (Contraction / Diastole / Absolute Calm)                   222 
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  e: 1.618, q: 528, oid: "1" }, // (-Phi)   
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   e: 1.000, q: 741, oid: "2" }, // (-Phi)
    { id: 5, name: "VIOLET_SHELL_CHAMBER",  mv: -90, color: "Violet", e: 0.618, q: 852, oid: "4" }  // fire starter (1.0 / 1.618) + 0.6 
];
*/




window.METATRON_SPECTRUM_MODEL = [
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    e: 1.000, q: 174, oid: "8" },
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", e: 1.618, q: 285, oid: "7" },
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", e: 2.238, q: 417, oid: "5" },
    { id: 3, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  e: 2.856, q: 936, oid: "6" },
    { id: 6, name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  e: 2.256, q: 639, oid: "3" },
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  e: 1.618, q: 528, oid: "1" },
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   e: 1.000, q: 741, oid: "2" },
    { id: 5, name: "VIOLET_SHELL_CHAMBER",  mv: -90, color: "Violet", e: 0.618, q: 852, oid: "4" }
];


// ============================================================================ 
// 174,285,932,528,741,255                           2915
// 1.0,1.6,2.2,1.6,1.0,0,6    2673 Mhz WHITE  (+)    1391
// 174,461,933,854,741,511    1441 Mhz BLACK  (-)    1524
//   R  +   Y -  G  B   -   = 1232 Mhz energy flow    133 hz start
// ============================================================================
// 🔮 METATRON CORE SPECTRUM MODEL & QUANTUM CHAMBERS
// ============================================================================
/*
window.METATRON_SPECTRUM_MODEL = [
    { id: 1, name: "RED_ENERGY_CHAMBER", mv: -90, color: "Red", e: 1.000, q: 174, oid: "8" },
    { id: 2, name: "ORANGE_VORTEX", mv: -45, color: "Orange", e: 1.625, q: 285, oid: "9" },
    { id: 3, name: "WHITE_LIGHT_KNOT", mv: 0, color: "White", e: 1.200, q: 396, oid: "1" },
    { id: 4, name: "YELLOW_RESONATOR", mv: 45, color: "Yellow", e: 2.650, q: 417, oid: "2" },
    { id: 5, name: "GREEN_BALANCE_POINT", mv: 90, color: "Green", e: 1.500, q: 528, oid: "3" },
    { id: 6, name: "BLACK_VOID_CENTER", mv: 135, color: "Black", e: 1.618, q: 639, oid: "4" },
    { id: 7, name: "BLUE_ETHER_CHAMBER", mv: 180, color: "Blue", e: 1.800, q: 741, oid: "5" },
    { id: 8, name: "VIOLET_CROWN_NODE", mv: 225, color: "Violet", e: 2.000, q: 852, oid: "6" }
];
*/
//window.chambers = {core:[174,285,396],cytoplasm:[417,528,936],shell:[741,852,693]}; 


window.chambers = window.chambers || {};
window.activePackets = window.activePackets || [];

// 🧬 PURE LOGICAL TELEMETRY CARRIER (0% CPU OVERHEAD)
// 🧬 PURE LOGICAL TELEMETRY CARRIER (OPTIMIZED FOR VISUAL LASER TRACKS)
window.QuantumPacket = class QuantumPacket {
    constructor(sourceId, targetId, frequencyValue, directionMultiplier) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.frequency = frequencyValue;
        this.dirMultiplier = directionMultiplier;
        this.progress = 0;
        this.isActive = true;
    }
    update(fixedDelta) {
        if (!this.isActive) return;
        
        // 🎯 KESİN ÇÖZÜM: Devasa hız çarpanı (0.01) düşürüldü (0.00025)! 
        // Böylece paketler odalar arasında ışık hızıyla kaybolmayacak, 
        // çizgiler saniyeler boyunca ekranda süzülerek netçe görülebilecek.
        const baseSpeed = this.frequency * 0.00025;
        this.progress += baseSpeed * this.dirMultiplier * fixedDelta;
        
        if (this.progress >= 1.0) {
            this.progress = 1.0;
            this.isActive = false;
        }
    }
};
// 🫀 INJECTING CHAMBERS ONTO SKELETON'S QUANTUM CAGE
function injectMetatronMetabolism() {
    // 📯 Girişteki çökme tehlikesi yaratan hatalı window.MetatronEngine() çağrısı kaldırıldı!

    const colorHexMap = {
        "Red": 0xff0000, "Orange": 0xff7f00, "Yellow": 0xffff00,
        "Green": 0x00ff00, "Blue": 0x0000ff, "Pink": 0xffc0cb, 
        "White": 0xffffff, "Black": 0x111111, "Violet": 0x8b00ff
    };

    // Odaları dairesel/sekizgen düzende kutsal geometri nizamına oturtmak için yarıçap yarıçapı
    const radius = 0.5; 

    // 🔮 Solid translucent chambers reading spatial metrics directly from model
    let halkaIdx = 0; // 🎯 Çember üzerindeki 6 oda için bağımsız simetri sayacı

    // 🔮 Solid translucent chambers reading spatial metrics directly from model
    window.METATRON_SPECTRUM_MODEL.forEach((chamber) => {
    const geometry = new THREE.SphereGeometry(0.22, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: colorHexMap[chamber.color],
        transparent: true,
        opacity: 0.22,
        wireframe: true // Solid translucent lock
    });
    
    const chamberMesh = new THREE.Mesh(geometry, material);
    chamberMesh.name = `CHAMBER_${chamber.id}`; // İsme göre filtre mühürü

    let posX = 0, posY = 0, posZ = 0;
    
    if (chamber.id === 3) {
        // Beyaz oda üst merkez kutbuna yerleşir
        posX = 0; posY = 0.4; posZ = 0;
    } else if (chamber.id === 6) {
        // Siyah oda alt merkez kutbuna yerleşir
        posX = 0; posY = -0.4; posZ = 0;
    } else {
        // 📐 KUSURSUZ ARALIKLI ÇEMBER DİZİLİMİ: 
        // Toplam 6 oda halkaya gireceği için tam 6'ya bölerek 60 derecelik kusursuz açılar elde ediyoruz
        const angle = (halkaIdx / 6) * Math.PI * 2;
        posX = Math.cos(angle) * radius;
        posY = 0;
        posZ = Math.sin(angle) * radius;
        
        halkaIdx++; // Sadece halkaya oda yerleştikçe sayacı ilerlet!
    }
    
    // Güvenli pozisyon enjeksiyonu (Simetrik ve Stabil)
    chamberMesh.position.set(posX, posY, posZ);

    // Kilit Adres: skeleton.js'in yarattığı window.KuantumKafesi'ne kenetlenme
    if (window.KuantumKafesi) {
        window.KuantumKafesi.add(chamberMesh);
    }
    
    window.chambers[chamber.id] = chamberMesh;
});

}




/// ⚡ DİNAMİK NABIZ: Slider veya kodla değiştirmek için hazır!
window.metatronPulseSpeed = window.metatronPulseSpeed || 0.035;

/// ⚡ DİNAMİK NABIZ VE MOTOR BAŞLANGICI
window.metatronPulseSpeed = window.metatronPulseSpeed || 0.035;

// Gözcü zaman kontrol değişkenleri (Motor fonksiyonunun hemen dışına, üstüne yerleştirin)
window.lastMetatronFrameTime = window.lastMetatronFrameTime || 0;

window.MetatronEngine = function () {
    const simdi = performance.now();
    
    // HIZ KORUMA KALKANI: Eğer son çalışmanın üzerinden 15ms geçmediyse,
    // bu mükerrer bir tetiklemedir. Hesaplamayı es geç, CPU'yu koru!
    if (simdi - window.lastMetatronFrameTime < 15) {
        return; 
    }
    window.lastMetatronFrameTime = simdi;
    // 🔲 MARŞ KİLİDİ: Model hazır değilse bekle
    if (!window.METATRON_SPECTRUM_MODEL) return;
    
    // ⚡ FORCE MOTOR START: Animasyonu zorla aktif et
    window.heartAnimationActive = true;

    // 🌐 SAAT VE HIZ AYARI
    if (window.MetatronMasterClock === undefined) window.MetatronMasterClock = 0;
    const currentSpeed = (window.metatronPulseSpeed || 0.035) * 1.2;  
    window.MetatronMasterClock = (window.MetatronMasterClock + (currentSpeed * 25)) % 800;

    // 🔍 PANEL BAĞLANTI LOGU
    //console.log("🫀 MOTOR ATEŞLENDİ! Saat:", Math.round(window.MetatronMasterClock));

    // Odalar ve Spektrum ayarları
    window.chambersTimers = window.chambersTimers || {};
    const baseSpectrum = window.solfeggiospec;
    const spectrumOrder = [...baseSpectrum].reverse();
    const oppositeMap = { 1: 8, 8: 1, 2: 7, 7: 2, 4: 5, 5: 4 };

    const globalClock = window.MetatronMasterClock || 0;
    let wave = 0;
    let maxWaveValue = -1;
    let localDominantChamber = null;

// 🔲 MASTER KİLİT: TELEMETRİ KOPMA KORUMASI 
    if (window.MetatronMasterClock === undefined) {
        window.MetatronMasterClock = (Date.now()) % 800;
    }

    // ========================================================================
    // 🌐 KÜRESEL SAAT YAKALAYICI (Data her salise değiştikçe buradan taze akacak)
    // ========================================================================
    //const globalClock = window.MetatronMasterClock || 0;



window.METATRON_SPECTRUM_MODEL.forEach((ch) => {
    const mesh = window.chambers ? window.chambers[ch.id] : null;
    if (!mesh) return;

    // PERFORMANCE SENSÖRÜ: Statik renkleri her karede setHex ile sıfırlamayı bıraktık!
    // Sadece materyal ilk kez oluşturulduğunda veya boşsa bir kereliğine tetiklenir.
    if (mesh.material && mesh.userData && mesh.userData.originalColor && !mesh.userData.colorInitialized) {
        if (ch.id !== 3 && ch.id !== 6) {
            mesh.material.color.setHex(mesh.userData.originalColor);
            if (mesh.material.emissive) mesh.material.emissive.setHex(mesh.userData.originalColor);
        }
        mesh.userData.colorInitialized = true; // Renk mühürlendi, bir daha boşuna CPU harcama.
    }

    // 74 BPM / 800 ms nizamına kilitli ana radyan çarkı 
    // (globalClock verisi döngü dışındaki ana çatıdan miras alınıyor, mükerrer tanım silindi)
    const basePhase = (globalClock / 800) * Math.PI * 2;

    let delayFactor = 0;
    let customWave = null;

  // ========================================================================
    // 🚀 ODA FAZ HARİTASI VE HAFİF ZAMAN KORİDORLARI (CPU OPTİMİZELİ)
    // ========================================================================
    if (ch.id === 1) {
        delayFactor = -0.5 * Math.PI;
    }
    else if (ch.id === 2 || ch.id === 4) {
        if (globalClock >= 200 && globalClock < 400) {
            const qrsProgress = (globalClock - 200) * 0.005; // Bölme yerine çarpma (1/200 = 0.005)
            const sinWave = Math.sin(qrsProgress * Math.PI);
            
            if (ch.id === 4) {
                // Ağır Math.pow(x, 0.5) yerine yıldırım hızıyla çalışan Math.sqrt kullanıyoruz!
                // Her karede Number() çevirisi yapmamak için ch.e değerini önbelleğe alıyoruz.
                ch.cachedE = ch.cachedE || Number(ch.e || 2.238);
                customWave = 0.20 + Math.sqrt(sinWave) * 2.8 * ch.cachedE;
            } else {
                customWave = 0.25 + sinWave * 0.70;
            }
        } else {
            customWave = ch.id === 4 ? 0.12 : 0.20;
        }
    }
    else if (ch.id === 5) {
        if (globalClock >= 400) {
            const morProgress = (globalClock - 400) * 0.0025; // 1/400 = 0.0025
            customWave = 0.20 + Math.sin(morProgress * Math.PI) * 0.65;
        } else {
            customWave = 0.22;
        }
    }
    else if (ch.id === 3 || ch.id === 6) {
        customWave = 0.25 + Math.abs(Math.sin(basePhase)) * 0.55;
    }

    
     // 🎯 DALGA HESAPLAMA, EMISSIVE GÜNCELLEMELER (ULTRA CPU SAVER MODEL)
    wave = (customWave !== null) ? customWave : (((Math.cos(basePhase + delayFactor) + 1) * 0.38) + 0.24);
    wave = Math.max(0.15, Math.min(1.0, wave));

    if (mesh.material) {
        mesh.userData = mesh.userData || {};
        
        // KESİN ÇÖZÜM: Değişim eşiği (Threshold) kontrolü!
        // Eğer dalga değişimi 0.015'ten küçükse, boşuna WebGL ve GPU güncellemesi yapma!
        const prevWave = mesh.userData.currentWave || 0;
        if (Math.abs(wave - prevWave) > 0.015) {
            mesh.userData.currentWave = wave;
            mesh.material.transparent = true;
            
            const isCenter = ch.id === 3 || ch.id === 6;
            mesh.material.opacity = isCenter ? 0.35 + (wave * 0.50) : 0.20 + (wave * 0.80);
            
            if (mesh.material.emissiveIntensity !== undefined) {
                mesh.material.emissiveIntensity = wave * (isCenter ? 2.5 : 3.0);
            }
        }
    }

    if (typeof window.metatronMeshScaler === "function") window.metatronMeshScaler(mesh, null, ch);

    // 🪐 PERFORMANS KÖPRÜSÜ
    if (wave > maxWaveValue) {
        maxWaveValue = wave;
        localDominantChamber = ch;
    }

    // 🎨 BİYOFİZİK TELEMETRİ
    const safeDecaying = false;
    const baseMV = Number(ch.mv);
    let currentMV = safeDecaying ? baseMV - ((1.0 - wave) * 45) : baseMV + (wave * 35);
    const baseHZ = Number(ch.q);
    const currentHZ = baseHZ * (1.0 + ((currentMV - baseMV) * 0.015));

    window.MetatronTelemetry = window.MetatronTelemetry || {};
    window.MetatronTelemetry[ch.id] = {
        name: ch.name, color: ch.color, frequencyHz: currentHZ.toFixed(2),
        voltageMV: currentMV.toFixed(1), mechanicalWave: wave.toFixed(3),
        phaseState: safeDecaying ? "DIASTOLE" : "SYSTOLE", timestampMS: performance.now()
    };

   // ========================================================================
    // 🏆 MASTER MOTOR KÖPRÜSÜ (DÖNGÜ İÇİ)
    // ========================================================================
    if (wave > maxWaveValue) {
        maxWaveValue = wave;
        localDominantChamber = ch;
    }

    // ========================================================================
    // 🎨 BİYOFİZİK ACADEMIC TELEMETRY HESAPLAMALARI (TAM UYUM & SIFIR REFERANS HATASI)
    // ========================================================================
    window.MetatronAcademicTelemetry = window.MetatronAcademicTelemetry || {};
    window.MetatronTelemetry = window.MetatronTelemetry || {};
    
    // telemetry.js'in çökmesini engelleyen hafif statik string mühürleri
    const sabitMetinDurumu = (globalClock >= 400) ? "DIASTOLE (Decay)" : "SYSTOLE (Charge)";

    // 1. Yeni Akademik Telemetri Havuzunun Beslenmesi
    window.MetatronAcademicTelemetry[ch.id] = {
        name: ch.name,
        color: ch.color,
        frequencyHz: currentHZ,     // Saf sayı
        voltageMV: currentMV,       // Saf sayı
        mechanicalWave: wave,       // Saf sayı
        phaseState: sabitMetinDurumu, // telemetry.js:225 .includes() kontrolü için tam uyum
        timestampMS: performance.now()
    };

    // 2. Eski Telemetri Yapısının Senkronizasyonu (Çakışan kopyalar söküldü, temiz eşleme yapıldı)
    window.MetatronTelemetry[ch.id] = {
        energy: wave,
        phaseState: sabitMetinDurumu,
        frequencyHz: currentHZ,
        voltageMV: currentMV
    };
}); // ◄ 🎯 KUTSAL KAPANIŞ 1: window.METATRON_SPECTRUM_MODEL.forEach döngüsü başarıyla bitti.
// 🏆 MASTER MOTOR KÖPRÜSÜ & 🧬 CRC MOTORU (Tekil Kapanış)
// ========================================================================
if (localDominantChamber) {
    window.activeDominantChamber = localDominantChamber;
    window.activeDominantWave = maxWaveValue;
}

// Performans için sadece veri değiştiğinde DOM güncellemesi yapan CRC motoru
if (window.MetatronAcademicTelemetry?.[1] && window.MetatronAcademicTelemetry?.[7]) {
    const kirmizi = window.MetatronAcademicTelemetry[1];
    const mavi = window.MetatronAcademicTelemetry[7];
    
    const liveResp = 20.0 + (parseFloat(mavi.mechanicalWave || 0.5) - 0.5) * 0.4;
    const liveBPM = 74.0 + (parseFloat(kirmizi.mechanicalWave || 0.5) - 0.5) * 1.8;
    const ratio = liveBPM / liveResp;
    const deviation = Math.abs(4.0 - ratio);

    window.cachedCRCDOM = window.cachedCRCDOM || {
        resp: document.getElementById("dyn-resp"),
        prq: document.getElementById("dyn-prq"),
        status: document.getElementById("dyn-crc-status")
    };

  const dom = window.cachedCRCDOM;
    if (dom) {
        // Hesaplamaları ve basamakları sadece ekran çıktısı alırken mühürlüyoruz
        const txtResp = liveResp.toFixed(1);
        const txtRatio = ratio.toFixed(2);
        
        if (dom.resp && dom.resp.innerText !== txtResp) dom.resp.innerText = txtResp;
        if (dom.prq && dom.prq.innerText !== txtRatio) dom.prq.innerText = txtRatio;
        
        if (dom.status) {
            if (deviation < 0.05) {
                if (dom.status.innerText !== "LOCKED (4:1)") {
                    dom.status.innerText = "LOCKED (4:1)";
                    dom.status.style.color = "#00ff00";
                }
            } else {
                const txtStatus = `ASYNC (${txtRatio})`;
                if (dom.status.innerText !== txtStatus) {
                    dom.status.innerText = txtStatus;
                    dom.status.style.color = "#ff00ff";
                }
            }
        }
    }
}
}; // ◄ 🎯 TEKİL VE GÜVENLİ MOTOR KAPANIŞI

// ========================================================================
// 🪐 WATCHDOG & ENGINE KICKSTARTER (GERÇEK PANEL KİMLİĞİ BAĞLANTISI)
// ========================================================================
if (typeof window.initSkelaton === "function") window.initSkelaton();

window.sonVurusZamani = window.sonVurusZamani || performance.now();
window.dalgaTepesinde = window.dalgaTepesinde || false;

if (!window.metatronLoopActive) {
    window.metatronLoopActive = true;
    
    setInterval(() => {
        // GERÇEK KİMLİK: GitHub projesindeki asıl tablo id'si 'telemetryTable' mühürlendi!
        window.cachedTelemetryPanel = window.cachedTelemetryPanel || document.getElementById("telemetryTable");

        // 🛑 SLEEP MODE: Kalp durduysa veya ilk açılışsa paneli tamamen sakla
        if (window.heartAnimationActive !== true) {
            if (window.cachedTelemetryPanel && window.cachedTelemetryPanel.style.display !== "none") {
                window.cachedTelemetryPanel.style.display = "none";
            }
            return; 
        }

        // 🟢 AWAKE MODE: Kalp çalışıyorsa paneli görünür kıl (Görsel tablo nizamı için 'table')
        if (window.cachedTelemetryPanel && window.cachedTelemetryPanel.style.display === "none") {
            window.cachedTelemetryPanel.style.display = "table"; 
        }

        // Ana motoru ateşle
        if (typeof window.MetatronEngine === "function") {
            window.MetatronEngine();
        }
    }, 16);
}
