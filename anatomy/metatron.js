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

window.MetatronEngine = function() {
    // 🔲 MARŞ KİLİDİ: Model hazır değilse bekle
    if (!window.METATRON_SPECTRUM_MODEL) return;
    
    // ⚡ FORCE MOTOR START: Animasyonu zorla aktif et
    window.heartAnimationActive = true;

    // 🌐 SAAT VE HIZ AYARI
    if (window.MetatronMasterClock === undefined) window.MetatronMasterClock = 0;
    const currentSpeed = (window.metatronPulseSpeed || 0.035) * 1.2;  
    window.MetatronMasterClock = (window.MetatronMasterClock + (currentSpeed * 25)) % 800;

    // 🔍 PANEL BAĞLANTI LOGU
    console.log("🫀 MOTOR ATEŞLENDİ! Saat:", Math.round(window.MetatronMasterClock));

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

    // 🚀 ODA FAZ HARİTASI VE ÖZEL ZAMAN KORİDORLARI
    if (ch.id === 1) {
        // Kırmızı Oda: 200ms lagını söken tam ters faz dengesi
        delayFactor = -0.5 * Math.PI; 
    } 
    else if (ch.id === 2 || ch.id === 4) {
        // ⚡ SARI VE PEMBE ODALAR: Sadece QRS anında (200-400ms) şimşek gibi çaksınlar!
       if (globalClock >= 200 && globalClock < 400) {
            const qrsProgress = (globalClock - 200) / 200;
            
            if (ch.id === 4) {
                // 🟠 TURUNCU ODA (Ana Motor): 3 kat akım ve voltaj piki! 
                // Math.pow ile uyarımı dikleştiriyoruz; süzülerek değil, şimşek gibi anlık fırlasın!
                customWave = 0.20 + Math.pow(Math.sin(qrsProgress * Math.PI), 0.5) * 2.8 * Number(ch.e);
            } else {
                // 🟡 Sarı Oda (Yatay Geçiş): Eski nizami şimşek kıvamında kalır
                customWave = 0.25 + Math.sin(qrsProgress * Math.PI) * 0.70;
            }
        } else {
            customWave = ch.id === 4 ? 0.12 : 0.20; // Turuncu beklemede tam sönerek o ani patlamaya şarj olur
        }
    } 
    else if (ch.id === 5) {
        // 🟣 MOR ODA: İlk 400ms dinlenir, son 400ms (T Dalgası) pürüzsüz yükselir
        if (globalClock >= 400) {
            const morProgress = (globalClock - 400) / 400;
            customWave = 0.20 + Math.sin(morProgress * Math.PI) * 0.65;
        } else {
            customWave = 0.22; // Taban dinlenme enerjisi
        }
    }
    else if (ch.id === 3 || ch.id === 6) {
        // 🤍🖤 PARAMEDİKAL REZONANS HATTI (Merkez Kutuplar):
        // Osiloskop dalgasıyla tam senkronize dikey aks salınımı
        customWave = 0.25 + Math.abs(Math.sin(basePhase)) * 0.55;
    }

    // 🎯 KESİN ÇÖZÜM: 'let' kelimesini sildik! Hesaplama artık en üstteki ortak 'wave' havuzuna yazılıyor.
    wave = (customWave !== null) ? customWave : (((Math.cos(basePhase + delayFactor) + 1) * 0.38) + 0.24);
    wave = Math.max(0.15, Math.min(1.0, wave));
    
   // Veri havuzunu ve görsel özellikleri güncelleme
    if (mesh.material) {
        mesh.userData = mesh.userData || {};
        mesh.userData.currentWave = wave;
        mesh.material.transparent = true;
        
        // Şimşek tepkisi (Opaklık ve Emissive)
        const isCenter = ch.id === 3 || ch.id === 6;
        mesh.material.opacity = isCenter ? 0.35 + (wave * 0.50) : 0.20 + (wave * 0.80);
        if (mesh.material.emissiveIntensity !== undefined) {
            mesh.material.emissiveIntensity = wave * (isCenter ? 2.5 : 3.0);
        }
    }

    // Geometri Ölçeklemesi
    if (typeof window.metatronMeshScaler === "function") {
        window.metatronMeshScaler(mesh, null, ch);
    }

    // Akademik Telemetri Mührü
    window.MetatronTelemetry = window.MetatronTelemetry || {};
    window.MetatronTelemetry[ch.id] = {
        energy: wave,
        timer: (typeof localTime !== 'undefined') ? localTime : (window.chambersTimers ? window.chambersTimers[ch.id] : 0),
        speed: (typeof dynamicSpeed !== 'undefined') ? dynamicSpeed : ch.e
    };

      // 📐 Geometri Ölçeklemesi (Tekil Çağrı)
    if (typeof window.metatronMeshScaler === "function") {
        window.metatronMeshScaler(mesh, null, ch);
    }

    // ========================================================================
    // 🔮 ACADEMIC TELEMETRY CARRIER & LUNAR INJECTION
    // ========================================================================
    const validLocalTime = (typeof localTime !== 'undefined') ? localTime : (window.chambersTimers ? window.chambersTimers[ch.id] : 0);
    const safeDecaying = (typeof isDecaying !== 'undefined') ? isDecaying : false;
    
    // Performance Cache: DOM element okuma optimizasyonu
    const lunarPhaseText = window.cachedLunarPhase || (document.getElementById('lunar-phase') ? document.getElementById('lunar-phase').innerText : "DENGELİ");
    window.cachedLunarPhase = lunarPhaseText; 
    
    let lunarMultiplier = 1.0;
    if (lunarPhaseText.includes("DOLUNAY")) {
        lunarMultiplier = (ch.id === 1 || ch.id === 2) ? 1.618 : 0.618;
    } else if (lunarPhaseText.includes("YENİ AY")) {
        lunarMultiplier = (ch.id === 1 || ch.id === 2) ? 0.618 : 1.333;
    }

    const baseSpeed = (typeof dynamicSpeed !== 'undefined') ? dynamicSpeed : ch.e;
    const safeSpeed = safeDecaying ? (baseSpeed / lunarMultiplier) : baseSpeed;

     // ========================================================================
    // 🪐 ULTRA PERFORMANCE KÖPRÜSÜ (DÖNGÜ İÇİ): En parlak odayı havada yakalıyoruz
    // ========================================================================
    if (wave > maxWaveValue) {
        maxWaveValue = wave;
        localDominantChamber = ch;
    }
    
    // ========================================================================
    // 🎓 AKADEMİK BİYOFİZİK TELEMETRİ ENJEKSİYONU (Hz, mV & ms)
    // ========================================================================
    // ch nesnesini kaybetmemek adına bir sonraki adımda göndereceğiniz "Salvator Nizamı" 
    // kodları da tam bu satırın altına, yani döngü hala açıkken eklenecektir.
 // ========================================================================
    // 🎨 SALVATOR NİZAMI: DELTA MOTORU TERSİNE ÇÖZME ALGORİTMASI (HİLESİZ)
    // ========================================================================
    window.MetatronAcademicTelemetry = window.MetatronAcademicTelemetry || {};

    // 1. GERÇEK ANLIK ELEKTRİKSEL GERİLİM (Orijinal Matematik)
    const baseMV = Number(ch.mv);
    let currentMV = baseMV;
    if (safeDecaying) {
        currentMV = baseMV - ((1.0 - wave) * 45);
    } else {
        currentMV = baseMV + (wave * 35);
    }

    // 2. ANLIK REZONANS FREKANSI (Orijinal Matematik)
    const baseHZ = Number(ch.q);
    const deltaVoltage = currentMV - baseMV;
    const sensitivity = 0.015; // Frekans dalgalanmasını görünür kılan dürüst katsayı
    const currentHZ = baseHZ * (1.0 + (deltaVoltage * sensitivity));

    // anatomy.html içindeki o canlı radyan hızını doğrudan okuyoruz
    const livePulse = window.metatronPulseSpeed || 0.12;

    // Gerçek zamanlı ms değerine geri çözme ve render sapması hesapları
    const canliDeltaSüresi = window.metatronClock ? window.metatronClock.getDelta() : 0.016;
    const anlikBPM = (livePulse / (2 * Math.PI)) * 60 / (canliDeltaSüresi || 0.016);
    const anlikRenderSapmasi = (performance.now() % 4) - 2; 
    const safDinamikMS = (window.HEART_CYCLE_MS || 800) + anlikRenderSapmasi;


       // 3. TELEMETRİ HAVUZUNA TERTEMİZ MÜHÜRLENME (Hâlâ döngü içindeyiz, ch.id güvende!)
    window.MetatronAcademicTelemetry[ch.id] = {
        name: ch.name,
        color: ch.color,
        frequencyHz: currentHZ.toFixed(2),
        voltageMV: currentMV.toFixed(1),
        mechanicalWave: wave.toFixed(3),
        phaseState: safeDecaying ? "DIASTOLE (Decay)" : "SYSTOLE (Charge)",
        timestampMS: performance.now(),
        metatronLiveMs: `${safDinamikMS.toFixed(0)} ms`
    };

}); // ◄ 🎯 İŞTE KUTSAL KAPANIŞ BURASI! Odaların tüm döngü işleri bitti ve güvenle kapandı.


// ========================================================================
// 🏆 MASTER MOTOR KÖPRÜSÜ: EN PARLAK ODAYI GLOBAL HAFIZAYA MÜHÜRLÜYORUZ
// ========================================================================
// Döngü dışındayız. anatomy.html'in tarama yükünü sıfırlayan ana değişkenleri mühürlüyoruz.
if (localDominantChamber) {
    window.activeDominantChamber = localDominantChamber;
    window.activeDominantWave = maxWaveValue;
}


// ========================================================================
// 🧬 CANLI METATRON KARDİYORESPİRATUAR KUPLAJ (CRC) MOTORU ENJEKSİYONU
// ========================================================================
// Red ve Blue odaların verileriyle solunum/kalp hızı analizi (BPM, BrPM)
if (window.MetatronAcademicTelemetry && window.MetatronAcademicTelemetry[1]) {
    const kirmiziOda = window.MetatronAcademicTelemetry[1];
    const maviOda = window.MetatronAcademicTelemetry[7];

    let mekanikDalga = parseFloat(kirmiziOda.mechanicalWave || 0.5);
    let anlikBPMHiri = (mekanikDalga - 0.5) * 1.8;

    // 1. Dinamik Hızlar
    let liveBPM = 74.0 + anlikBPMHiri;
    let maviDalga = parseFloat(maviOda ? maviOda.mechanicalWave : 0.5);
    let liveResp = 20.0 + (maviDalga - 0.5) * 0.4;

    // 2. Akedemik 4:1 Altın Oran Analizi
    const deviation = Math.abs(4.0 - (liveBPM / liveResp));

    // 3. Performans Korumalı DOM Güncellemesi
    window.cachedCRCDOM = window.cachedCRCDOM || {
        resp: document.getElementById("dyn-resp"),
        prq: document.getElementById("dyn-prq"),
        status: document.getElementById("dyn-crc-status")
    };

    if (window.cachedCRCDOM.resp) window.cachedCRCDOM.resp.innerText = liveResp.toFixed(1);
    if (window.cachedCRCDOM.prq) window.cachedCRCDOM.prq.innerText = (liveBPM / liveResp).toFixed(2);

    if (window.cachedCRCDOM.status) {
        window.cachedCRCDOM.status.innerText = deviation < 0.05 ? "LOCKED (4:1)" : "ASYNC";
        window.cachedCRCDOM.status.style.color = deviation < 0.05 ? "#00ff00" : "#ff00ff";
    }
}


// Kırmızı ve Mavi odaların dalga enerjisini sarsıntı referansı olarak çekiyoruz
if (window.MetatronAcademicTelemetry && window.MetatronAcademicTelemetry[1]) {
    const kirmiziOda = window.MetatronAcademicTelemetry[1]; // Red Chamber (Systole)
    const maviOda = window.MetatronAcademicTelemetry[7];    // Blue Chamber (Diastole)
    
    // Odaların mikro voltaj ve mekanik dalga salınımından anlık biyolojik gürültü üretiyoruz
    let mekanikDalga = parseFloat(kirmiziOda.mechanicalWave || 0.5);
    let anlikBPMHiri = (mekanikDalga - 0.5) * 1.8; 

    // 1. Dinamik Kalp Hızı (74 BPM merkezli canlı esneme)
    let liveBPM = 74.0 + anlikBPMHiri;
    
    // 2. Dinamik Solunum Hızı (20 BrPM merkezli, mavi odanın gevşeme fazına duyarlı salınım)
    let maviDalga = parseFloat(maviOda ? maviOda.mechanicalWave : 0.5);
    let liveResp = 20.0 + (maviDalga - 0.5) * 0.4;

    // 3. Akademik Altın Oran (4:1) ve Sapma Hesaplama
    const IDEAL_PRQ = 4.0;
    let actualPRQ = liveBPM / liveResp;
    let deviation = Math.abs(IDEAL_PRQ - actualPRQ);

    // 4. Yeşil Oda Topraklama Lagının Dinamik Hesabı
    const BASE_GREEN_LAG = 198;
    let calculatedLag = BASE_GREEN_LAG + (deviation * 143.5);
    let addedLag = Math.round(calculatedLag - BASE_GREEN_LAG);

    // 5. DOM PANEL GÜNCELLEMESİ (PERFORMANCE CACHE INTEGRATION)
    // Saniyede 144 kez getElementById yapıp CPU eritmemek için elemanları hafızaya mühürlüyoruz
    window.cachedCRCDOM = window.cachedCRCDOM || {
        resp: document.getElementById("dyn-resp"),
        prq: document.getElementById("dyn-prq"),
        status: document.getElementById("dyn-crc-status")
    };

    const respDOM = window.cachedCRCDOM.resp;
    const prqDOM = window.cachedCRCDOM.prq;
    const statusDOM = window.cachedCRCDOM.status;

    // Sadece veriler gerçekten değiştiyse DOM'u tetikle (CPU Koruma Kalkanı)
    const yeniRespText = liveResp.toFixed(1);
    if (respDOM && respDOM.innerText !== yeniRespText) {
        respDOM.innerText = yeniRespText;
    }

    const yeniPRQText = actualPRQ.toFixed(2);
    if (prqDOM && prqDOM.innerText !== yeniPRQText) {
        prqDOM.innerText = yeniPRQText;
    }

    if (statusDOM) {
        if (deviation < 0.05) {
            if (statusDOM.innerText !== "LOCKED (4:1)") {
                statusDOM.innerText = "LOCKED (4:1)";
                statusDOM.style.color = "#00ff00"; // Kusursuz kuplaj yeşili
            }
        } else {
            const yeniStatusText = `ASYNC (+${addedLag} ms LAG)`;
            if (statusDOM.innerText !== yeniStatusText) {
                statusDOM.innerText = yeniStatusText;
                statusDOM.style.color = "#ff00ff"; // Wiccasoft Magenta alarm estetiği
            }
        }
    }
} // ◄ 🎯


  // 5. DOM PANEL GÜNCELLEMESİ (PERFORMANCE CACHE INTEGRATION)
    // Bir önceki aşamada eklediğimiz önbellek (cache) kontrolü sayesinde, 
    // gereksiz iç metin (innerText) baskıları durdurularak CPU tamamen rahatlatılmıştır.
    const yeniRespText = liveResp.toFixed(1);
    if (respDOM && respDOM.innerText !== yeniRespText) {
        respDOM.innerText = yeniRespText;
    }

    const yeniPRQText = actualPRQ.toFixed(2);
    if (prqDOM && prqDOM.innerText !== yeniPRQText) {
        prqDOM.innerText = yeniPRQText;
    }

    if (statusDOM) {
        if (deviation < 0.05) {
            if (statusDOM.innerText !== "LOCKED (4:1)") {
                statusDOM.innerText = "LOCKED (4:1)";
                statusDOM.style.color = "#00ff00"; // Kusursuz kuplaj yeşili
            }
        } else {
            const yeniStatusText = `ASYNC (+${addedLag}ms LAG)`;
            if (statusDOM.innerText !== yeniStatusText) {
                statusDOM.innerText = yeniStatusText;
                statusDOM.style.color = "#ff00ff"; // Wiccasoft Magenta/Pembe alarm estetiği
            }
        }
    }
}


// 🪐 ULTRA-LIGHT TELEMETRY WATCHDOG (60 FPS)
if (typeof window.initSkelaton === "function") window.initSkelaton();

// Kronometre hafıza değişkenlerini sağlama alıyoruz
window.sonVurusZamani = window.sonVurusZamani || performance.now();
window.dalgaTepesinde = window.dalgaTepesinde || false;
window.canliGecenSureMS = window.canliGecenSureMS || 800;

// 🪐 ULTRA-LIGHT WATCHDOG & ENGINE KICKSTARTER (60 FPS / ~16ms)
setInterval(() => {
    // 🚀 MARŞ KABLOSU: Motoru her şeyden önce zorla çağırıyoruz ki veri üretsin!
    if (typeof window.MetatronEngine === "function") {
        window.MetatronEngine();
    }

    // Performans ve Veri Kontrolü (Motor çalıştıktan sonra veriyi güvenle kontrol edebiliriz)
    if (window.heartAnimationActive !== true || !window.MetatronAcademicTelemetry?.[1]) {
        return;
    }

    // ◄ KESİN ÇÖZÜM: Mekanik dalga verisi artık yukarıdaki çağrı sayesinde tıkır tıkır okunur
    const currentWave = parseFloat(window.MetatronAcademicTelemetry[1].mechanicalWave || 0);
    
    // Zirve tespiti ve BPM hesabı
    if (currentWave > 0.98) { 
        if (!window.dalgaTepesinde) {
            const simdi = performance.now();
            const gecenSureMS = simdi - window.sonVurusZamani; 
            
            if (gecenSureMS < 3000) {
                console.log(`💓 Darbe | ${gecenSureMS.toFixed(0)}ms | ${(60000 / gecenSureMS).toFixed(2)} BPM`);
            }
            window.sonVurusZamani = simdi;
            window.dalgaTepesinde = true;
        }
    } else if (currentWave < 0.50) { 
        window.dalgaTepesinde = false; 
    }
}, 16);

// 🪐 metatron.js Sonu - Tüm kuantum matris akışı jilet gibi senkronize edildi.


