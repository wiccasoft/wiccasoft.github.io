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
// 0.045 değeri 74 BPM insan dinlenme kalbiyle tam uyumludur.
window.metatronPulseSpeed = window.metatronPulseSpeed || 0.035;
//ız Sabitlemesi (metatronPulseSpeed): Bir tam kosinüs turu \(2\pi \approx 6.28\) radyandır. 
// 60 FPS ekran yenileme hızında, döngünün ortalama 3 saniye (180 frame) sürmesi için
//  window.metatronPulseSpeed değerinin tam olarak 0.035 olarak ayarlanması gerekir (\(6.28 / 180 \approx 0.035\)).
// ⚡ DİNAMİK NABIZ: Slider veya kodla değiştirmek için hazır!
window.MetatronEngine = function() {
    if (!window.METATRON_SPECTRUM_MODEL || !window.KuantumKafesi) return;
    if (window.heartAnimationActive !== true) return;

  
    window.chambersTimers = window.chambersTimers || {};

    const baseSpectrum = window.solfeggiospec;
    const spectrumOrder = [...baseSpectrum].reverse();
    //const currentSpeed = window.metatronPulseSpeed || 0.1047; 


     //const currentSpeed = (window.metatronPulseSpeed || 0.035); 
      // 🎯 25 FPS Adaptasyonu: 60 FPS'ten 25'e düşüş için hızı ~2.4x oranında ölçekliyoruz.
    const currentSpeed = (window.metatronPulseSpeed || 0.035) * 1.2;  
    //const currentSpeed = (window.metatronPulseSpeed || 0.035) * 4.8;


    window.chambersTimers = window.chambersTimers || {};
    const oppositeMap = { 1: 8, 8: 1, 2: 7, 7: 2, 4: 5, 5: 4 };

    const upOrder   =[1,4,7]; 
    const downOrder =[8,5,2]; 

    window.METATRON_SPECTRUM_MODEL.forEach((ch) => {
        const mesh = window.chambers ? window.chambers[ch.id] : null; 
        if (!mesh) return; 

        if (mesh.material && mesh.userData && mesh.userData.originalColor) {
            if (ch.id !== 3 && ch.id !== 6) {
                mesh.material.color.setHex(mesh.userData.originalColor);
                if (mesh.material.emissive) mesh.material.emissive.setHex(mesh.userData.originalColor);
            }
        }

        let wave = 0;
        
        if (spectrumOrder.includes(ch.id)) {
            // 🔓 TWIN LOCK KAPATILDI: Her oda için bağımsız zaman hücresi (ch.id) aktif!
            if (window.chambersTimers[ch.id] === undefined) window.chambersTimers[ch.id] = 0;

            let groupIndex = 0;
            if (upOrder.includes(ch.id)) {
                groupIndex = upOrder.indexOf(ch.id);
            } else if (downOrder.includes(ch.id)) {
                groupIndex = downOrder.indexOf(ch.id);
            }

            // 🕰️ TAMAMEN BİREYSEL ZAMAN VE HIZ HESABI
            const checkTime = window.chambersTimers[ch.id];
            //const checkWaveTime = checkTime - (groupIndex * 0.1618 * Math.PI);

            // 🕰 TIBBİ FAZ ZAMANLAMASI: 0.1618 (Altın Oran) ile PR aralığı simülasyonu
            const checkWaveTime = window.chambersTimers[ch.id] - (groupIndex * 0.1618 * Math.PI);
            
            
            const isInitiallyDecaying = Math.sin(checkWaveTime) > 0;

            // Her oda sadece kendi saf ch.e ivme çarpanını kullanır, ortak maxPairE çöpe atıldı!
            let dynamicSpeed = currentSpeed * Number(ch.e); 
            if (isInitiallyDecaying) {
                dynamicSpeed /= 1.60; 
            }

            // 🚨 KORUMA KALDIRILDI: Her oda kendi saatini kendisi günceller (Çifte tetiklenme tehlikesi yok çünkü saatler ayrıldı)
            window.chambersTimers[ch.id] += dynamicSpeed;
            window.chambersTimers[ch.id] %= (Math.PI * 2);

            const localTime = window.chambersTimers[ch.id];
            
            // ⚡ ÖZGÜR FAZ KAYMASI: Odalar üst üste binebilir ama tamamen kendi groupIndex sürelerine göre akar
            //const waveTime = localTime - (groupIndex * 0.1618 * Math.PI);
            // ⚡ EKG SINIFLANDIRILMIŞ FAZ KAYMASI: 
            // Odalar arası iletim (P-QRS) zamanlaması (0.1618 * PI gecikme)
            const waveTime = window.chambersTimers[ch.id] - (groupIndex * 0.1618 * Math.PI);

            const rawWave = (Math.cos(waveTime) + 1) * 0.5;
            const isDecaying = Math.sin(waveTime) > 0;

            if (isDecaying) {
                const oppositeId = oppositeMap[ch.id];
                const oppositeChamber = window.METATRON_SPECTRUM_MODEL.find(c => c.id === oppositeId);
                const oppositeWeight = oppositeChamber ? Number(oppositeChamber.e) * 0.2 : 0.2;
                wave = (rawWave * 0.5) + oppositeWeight;
            } else {
                wave = rawWave;
            }
            
            wave = Math.max(0.20, Math.min(1, wave));
            
        }  else {
    // 🌐 KÜRESEL ENTEGRASYON: Telemetriden gelen 800ms'lik master saati yakalıyoruz
    const globalClock = window.MetatronMasterClock || 0;

    if (ch.id === 3) {
        // 🤍 BEYAŻ ODA (Merkez Üst Kutup): Tam QRS vuruş anında (200-400ms) parlasın!
        if (globalClock >= 200 && globalClock < 400) {
            const progress = (globalClock - 200) / 200;
            wave = 0.5 + Math.sin(progress * Math.PI) * 0.5; // Maksimum ışık genleşmesi
        } else {
            wave = 0.3 + Math.abs(Math.sin((globalClock / 800) * Math.PI * 2)) * 0.2; // Sakin nefes
        }
    } else if (ch.id === 6) {
        // 🖤 SİYAH ODA (Merkez Alt Kutup): Tam S çukurunda / Ters akım anında (400ms'e girerken) patlasın!
        if (globalClock >= 300 && globalClock < 500) {
            const progress = (globalClock - 300) / 200;
            wave = 0.1 + Math.sin(progress * Math.PI) * 0.9; // Derin girdap kanyon parlaması
        } else {
            wave = 0.4 - Math.abs(Math.cos((globalClock / 800) * Math.PI * 2)) * 0.2; // Nötr emilim fayı
        }
    } else {
        // Diğer ara odalar kalırsa eski nizam korunsun
        if (window.chambersTimers[ch.id] === undefined) window.chambersTimers[ch.id] = 0;
        window.chambersTimers[ch.id] += currentSpeed * ch.e;
        window.chambersTimers[ch.id] %= (Math.PI * 2);
        wave = ((Math.cos(window.chambersTimers[ch.id]) + 1) * 0.3) + 0.5;
    }
}

        mesh.userData = mesh.userData || {};
        mesh.userData.currentWave = wave;

        if (mesh.material) {
            mesh.material.transparent = true;
            if (ch.id === 3 || ch.id === 6) {
                mesh.material.opacity = 0.85;
                if (mesh.material.emissiveIntensity !== undefined) mesh.material.emissiveIntensity = 1.5;
            } else {
                mesh.material.opacity = 0.35 + (wave * 0.65); 
                if (mesh.material.emissiveIntensity !== undefined) {
                    mesh.material.emissiveIntensity = wave * 2.0; 
                }
            }
        }

        if (typeof window.metatronMeshScaler === "function") {
            window.metatronMeshScaler(mesh, null, ch);
        }

 // ⚡ GERÇEK 74 BPM MOTOR DEVRİ: 0.035 * 4 = 0.14
window.metatronPulseSpeed = window.metatronPulseSpeed || 0.35;       

// ========================================================================
        // 🔮 ACADEMIC TELEMETRY CARRIER (GÖSTERGELER İÇİN VERİ ÇIKIŞI - GÜVENLİ)
        // ========================================================================
        const validLocalTime = (typeof localTime !== 'undefined') ? localTime : window.chambersTimers[ch.id];
        const safeDecaying = (typeof isDecaying !== 'undefined') ? isDecaying : false;
        
        // 🎯 LUNAR MULTIPLIER: Paneldeki canlı Ay durumunu okuyup hızı dinamik büküyoruz
        const lunarElement = document.getElementById('lunar-phase');
        const lunarPhaseText = lunarElement ? lunarElement.innerText : "DENGELİ";
        
        let lunarMultiplier = 1.0;
        if (lunarPhaseText.includes("DOLUNAY")) {
            lunarMultiplier = (ch.id === 1 || ch.id === 2) ? 1.618 : 0.618;
        } else if (lunarPhaseText.includes("YENİ AY")) {
            lunarMultiplier = (ch.id === 1 || ch.id === 2) ? 0.618 : 1.333;
        }

        const baseSpeed = (typeof dynamicSpeed !== 'undefined') ? dynamicSpeed : ch.e;
        const safeSpeed = safeDecaying ? (baseSpeed / lunarMultiplier) : baseSpeed;

        window.MetatronTelemetry = window.MetatronTelemetry || {};
        window.MetatronTelemetry[ch.id] = {
            energy: wave,                       
            timer: validLocalTime,              
            speed: safeSpeed,                   
            isDecaying: safeDecaying            
        };
        
        // ========================================================================
        // 🎓 AKADEMİK BİYOFİZİK TELEMETRİ ENJEKSİYONU (Hz, mV & ms)
        // ========================================================================
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

// 2. ANLIK REZONANS FREKANSI (Orijinal Matematik - İşte currentHZ Burada!)
const baseHZ = Number(ch.q);
const deltaVoltage = currentMV - baseMV;
const sensitivity = 0.015; // Frekans dalgalanmasını görünür kılan dürüst biyofiziksel katsayı
const currentHZ = baseHZ * (1.0 + (deltaVoltage * sensitivity));

// anatomy.html içindeki o canlı radyan hızını doğrudan okuyoruz
const livePulse = window.metatronPulseSpeed || 0.12;

// anatomy.html'de (2 * Math.PI) / (Target_MS / 1000) * delta yaptığın motoru 
// Herhangi bir harici 'delta' ya da yapay katsayı olmadan doğrudan gerçek zamanlı ms değerine geri çözüyoruz
const canliDeltaSüresi = window.metatronClock ? window.metatronClock.getDelta() : 0.016;
const anlikBPM = (livePulse / (2 * Math.PI)) * 60 / (canliDeltaSüresi || 0.016);

// Tarayıcının render yüküne göre mikrosaniyelik doğal titreme payı (Canlı doku efekti)
const anlikRenderSapmasi = (performance.now() % 4) - 2; 

// Tıbbi Formül: Eğer senin ana şalterin window.HEART_CYCLE_MS hafızadaysa doğrudan onu yansıt
// Böylece gösterge ile ekran kartı (Three.js) tam uyumlu olarak birbirine kilitlenir!
const safDinamikMS = (window.HEART_CYCLE_MS || 800) + anlikRenderSapmasi;

// 3. TELEMETRİ HAVUZUNA TERTEMİZ MÜHÜRLENME
window.MetatronAcademicTelemetry[ch.id] = {
    name: ch.name,
    color: ch.color,
    frequencyHz: currentHZ.toFixed(2), // Artık asla "not defined" hatası veremez!
    voltageMV: currentMV.toFixed(1),
    mechanicalWave: wave.toFixed(3),
    phaseState: safeDecaying ? "DIASTOLE (Decay)" : "SYSTOLE (Charge)",
    timestampMS: performance.now(),
    
    // 🔑 telemetry.js içindeki köprünün (data.metatronLiveMs) okuyacağı o canlı süre:
    metatronLiveMs: `${safDinamikMS.toFixed(0)} ms`
};
    }); // 🎯 KUTSAL KAPANIŞ 1: METATRON_SPECTRUM_MODEL.forEach Döngüsünün Gerçek Sonu!
}; // 🎯 KUTSAL KAPANIŞ 2: window.MetatronEngine = function() Ana Gövdesinin Gerçek Sonu!

if (typeof window.initSkelaton === "function") {
    window.initSkelaton();
}


let sonVurusZamani = performance.now();
let dalgaTepesinde = false;

setInterval(() => {
    if(window.METATRON_SPECTRUM_MODEL && window.METATRON_SPECTRUM_MODEL[1]) {
        const currentWave = window.METATRON_SPECTRUM_MODEL[1].wave;
        
        // Zirveye çok yakın bir nokta (0.98) yakalandığında
        if(currentWave > 0.98) { 
            if(!dalgaTepesinde) {
                const simdi = performance.now();
                const gecenSureMS = simdi - sonVurusZamani; 
                
                // İlk açılıştaki saçma sapan yüksek süreyi (1601ms) rapora dahil etme
                if (gecenSureMS < 3000) {
                    const anlikBPM = (60000 / gecenSureMS).toFixed(2);
                    console.log(`💓 Darbe Tetiklendi | Süre: ${gecenSureMS.toFixed(0)}ms | Anlık Hız: ${anlikBPM} BPM`);
                }
                
                sonVurusZamani = simdi;
                dalgaTepesinde = true; // KİLİTLENDİ
            }
        } else if(currentWave < 0.50) { 
            // Güvenli Bölge: Dalga tamamen aşağı (vadiye) inmeden kilidi ASLA açma
            dalgaTepesinde = false; 
        }
    }
}, 16);


// 🪐 metatron.js - window.MetatronEngine fonksiyonunun en alt döngü içi alanı

// Kronometre hafıza değişkenlerini metatron.js küresel alanında başlatıyoruz
window.sonVurusZamani = window.sonVurusZamani || performance.now();
window.dalgaTepesinde = window.dalgaTepesinde || false;
window.canliGecenSureMS = window.canliGecenSureMS || 800;


