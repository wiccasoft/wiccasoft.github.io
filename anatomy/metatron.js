// ==========================================================================================
// 🪐 METATRON CORE ENGINE - METABOLIC PATHWAY & PURE HEART CORE (432hz)  (c) 2026 wiccasoft
// ==========================================================================================

const M_UP   = [1,4,7]   // UP 
const M_DOWN = [2,8,5]   // DOWN

const SPINE = [2,7]
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
// 🔥 YÜKSELEN AKS (Isınma / Genleşme / Sistol): Çarpılarak Katlanır (* 1.618)     777        
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    e: 1.000, q: 174, oid: "8" }, // (Phi^0)
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", e: 1.618, q: 285, oid: "7" }, // (Phi^1)
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", e: 2.618, q: 417, oid: "5" }, // (Phi^2)
  //                                                                              -396- 
    // 🤍🖤 THE SACRED HANDS MATRIX (Jesus' Hand Gestures & Orb Placement)        666 fire in the midddle
    { id: 3, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  e: 3.141, q: 936, oid: "6"}, // Left hand: blessing the air
    { id: 6, name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  e: 2.618, q: 639, oid: "3"}, // Right hand: holding the earthly orb
// 222 breath out                                                                 -369-                     
    // 💧 DECAYING AXIS (Contraction / Diastole / Absolute Calm)                   222 
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  e: 1.618, q: 528, oid: "1" }, // (Phi^2)/(Phi)   
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   e: 1.000, q: 741, oid: "2" }, // ((Phi)/(Phi))
    { id: 5, name: "VIOLET_SHELL_CHAMBER",  mv: -90, color: "Violet", e: 0.618, q: 852, oid: "4" }  // fire starter (1.0 / 1.618) + 0.6 
];
*/

// ============================================================================
// 🔮 METATRON CORE SPECTRUM MODEL & QUANTUM CHAMBERS
// ============================================================================
window.METATRON_SPECTRUM_MODEL = [
    { id: 1, name: "RED_ENERGY_CHAMBER", mv: -90, color: "Red", e: 1.000, q: 174, oid: "8" },
    { id: 2, name: "ORANGE_VORTEX", mv: -45, color: "Orange", e: 1.125, q: 285, oid: "9" },
    { id: 3, name: "WHITE_LIGHT_KNOT", mv: 0, color: "White", e: 1.200, q: 396, oid: "1" },
    { id: 4, name: "YELLOW_RESONATOR", mv: 45, color: "Yellow", e: 1.350, q: 417, oid: "2" },
    { id: 5, name: "GREEN_BALANCE_POINT", mv: 90, color: "Green", e: 1.500, q: 528, oid: "3" },
    { id: 6, name: "BLACK_VOID_CENTER", mv: 135, color: "Black", e: 1.618, q: 639, oid: "4" },
    { id: 7, name: "BLUE_ETHER_CHAMBER", mv: 180, color: "Blue", e: 1.800, q: 741, oid: "5" },
    { id: 8, name: "VIOLET_CROWN_NODE", mv: 225, color: "Violet", e: 2.000, q: 852, oid: "6" }
];

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
        opacity: 0.35,
        wireframe: false // Solid translucent lock
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
    
window.MetatronEngine = function() {
    // 🛡️ GÜVENLİK KALKANI: Giriş kontrolleri
    if (!window.METATRON_SPECTRUM_MODEL || !window.KuantumKafesi) return;
    
    const now = Date.now(), Phi = 1.61803398875;
    
    // 🎨 COLOR SPECTRUM (1-2-4-8-7-5) KUTSAL AKIŞ SIRALAMASI
    // Odalar artık senin belirttiğin bu sıra nizamına göre ardışık parlayacak!
    const spectrumOrder = window.colorspectrum;
    
    // 🔮 ODALARIN DÖNGÜ İÇİ ENERJİ METABOLİZMASI
    window.METATRON_SPECTRUM_MODEL.forEach((ch) => {
        const mesh = window.chambers ? window.chambers[ch.id] : null; 
        if (!mesh) return; 

        // 🌊 SPEKTRUM DALGASI (YAKMA MEKANİZMASI)
        let wave = 0;
        
        if (spectrumOrder.includes(ch.id)) {
            const orderIndex = spectrumOrder.indexOf(ch.id);
            // Renk spektrumu sırasına göre aralarına altın oran (0.618) faz kayması ekliyoruz.
            // Bu sayede ışık 1'den başlayıp sırayla 2, 4, 8, 7, 5 yönünde bir nehir gibi akacak.
            wave = Math.sin((now * 0.0025) - (orderIndex * 0.618));
        }

        // Opaklık Ayarı (Beyaz ve Siyah eksen odaları parlar, diğerleri renk sırasına göre söner/yanar)
        if (mesh.material) {
            if (ch.id === 3 || ch.id === 6) {
                mesh.material.opacity = 0.85; // Kutup milleri kalıcı aydınlık kalır
            } else {
                // Taban loşluğu 0.20, dalga parıltısı zirvesi 0.85 olacak şekilde yumuşak geçiş
                mesh.material.opacity = 0.20 + (Math.max(0, wave) * 0.65); 
            }
        }

        // 🫀 KALP ATIŞI VE ÖLÇEKLENDİRME (KÖPRÜ ENJEKSİYONU)
        if (typeof window.metatronMeshScaler === "function") {
            window.metatronMeshScaler(mesh, now, ch);
        }
    });

    // 🌪️ Altın oran ivmesiyle iskelet rotasyonu
    window.KuantumKafesi.rotation.y += 0.003 * Phi;

      // 🖥️ WebGL Render Tetikleyicisi - 🎯 İSKELETİ GERİ GETİREN KİLİT SATIRLAR!
    // Bu kalkan, ekranın donmasını engeller ve iskelet ile odaları senkronize çizer.
    if (window.renderer && window.scene && window.camera) {
        window.renderer.render(window.scene, window.camera);
    }
};

// Start the core engine
//injectMetatronMetabolism();


//if (!window.METATRON_SPECTRUM_MODEL || !window.KuantumKafesi) return;

    // 📯 MASTER CORE TRIGGER
// Önce iskelet ve küreler kurulur, ardından animasyon döngüsü (updateMetatronLoop) motoru ileriye sürer.
if (typeof window.initSkelaton === "function") {
    window.initSkelaton();
}
