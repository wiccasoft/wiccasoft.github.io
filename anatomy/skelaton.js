// ============================================================================
// 🪐 METATRON CORE ENGINE - METABOLIC PATHWAY & PURE HEART CORE (432hz)
// ============================================================================

const M_UP   = [1,4,7]   // 3 
const M_DOWN = [2,8,5]   // 6 

const SPINE = [2,7]
const METATRON = {RIGHT:[1,2,4],LEFT:[8,7,5],UP:2,BOTTOM:7}

const M_direction= [{east:1},{west:8}]

const colorspectrum = [1, 2, 4, 8, 7, 5]; 
const solfeggio = [1, 4, 7, 2, 5, 8];

//SOLFEGGIO 1-4-7-2-5-8 (RED YELLOW BLUE MODEL) subtractive
solfeggio = {core:{y:174,b:285,r:369},middle:{y:417,b:528,r:936},shell:{y:741,b:852,r:693}}; //  3,6,9 YBR-(147285)

// stilness actually yellowness in RYB solfeggio model
//  (174 285 (369)) RYB -  528 is solar plexus  // 3(-)(beyaz)sarı <-> magenta 6(+)(siyah)

//solfegio.core.r/solfegio.core.y = 1.63
//solfegio.middle.r/solfegio.niddle.y = 1.26
//solfegio.shell.r/solfegio.shell.y = 1.1

//174,285,396  R 1. core             // orange  :  6, 12, 24, 48,   96,  (3-6)       
//417,528,639  G 2. cytoplasm        // green   :  8, 16, 32, 64,  256,  
//741,852,963  B 3. shell            // magenta :  9, 45, 90, 180, 360   (9)

// The universe is built on vibrations. Even objects that appear to be stationary are in fact vibrating, 
// oscillating, and resonating at various frequencies. 64/24 = 2.6 (33*16) ; 4 turuncu - 7 mavi (below 9)

//9*4 cyan     36  72 144 288                                //magenta =    0   0    100    
//9*5 magenta  45  90 180 360                                //yellow  =  100  100     0 
//9*6 orange   54 108 216 432               
//9*7 green    63 7*9  (7*6 - 7*3 ) 

const ELEMENTS = {earth:8,air:2,water:7,fire:1}

//colorspectrum dizisi, COLOR_SPECTRUM_MODEL.e verisi ni sn de metatronu yakar COLOR_SPECTRUM_MODEL.hz verisiyle ms de söner

window.COLOR_SPECTRUM_MODEL = [
//  777 breath in
// 🔥 YÜKSELEN AKS (Isınma / Genleşme / Sistol): Çarpılarak Katlanır (* 1.618)
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    e: 1.000, frequency: 174, oid: "8" }, // (Phi^0)
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", e: 1.618, frequency: 285, oid: "7" }, // (Phi^1)
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", e: 2.618, frequency: 417, oid: "5" }, // (Phi^2)

    // 🤍🖤 THE SACRED HANDS MATRIX (Jesus' Hand Gestures & Orb Placement)
    { id: 3, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  e: 3.141, frequency: 936, oid: "6"}, // Left hand: blessing the air
    { id: 6, name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  e: 0.000, frequency:   0, oid: "3"}, // Right hand: holding the earthly orb
// 222 breath out
    // 💧 DECAYING AXIS (Contraction / Diastole / Absolute Calm)
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  e: 1.618, frequency: 528, oid: "1" }, // (Phi^2)/(Phi)   
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   e: 1.000, frequency: 741, oid: "2" }, // ((Phi)/(Phi))
    { id: 5, name: "VIOLET_SHELL_CHAMBER",  mv: -90, color: "Violet", e: 0.618, frequency: 852, oid: "4" }  // fire starter (1.0 / 1.618) +0.6 
];

window.chambers = {core:[174,285,396],cytoplasm:[417,528,639],shell:[741,852,963]}; 

// 🧬 PURE LOGICAL TELEMETRY CARRIER (0% CPU OVERHEAD)
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
        // Pure mathematical scale entirely independent from PC clock/refresh cycles
        const baseSpeed = this.frequency * 0.01;
        this.progress += baseSpeed * this.dirMultiplier * fixedDelta;
        if (this.progress >= 1.0) {
            this.progress = 1.0;
            this.isActive = false;
        }
    }
};

// 🫀 INJECTING CHAMBERS ONTO SKELETON'S QUANTUM CAGE
function injectMetatronMetabolism() {
    // 📯 Önce skeleton.js içindeki büyük amiral gemisi sahneyi ve iskeleti kurar
    window.initMetatronEngine(); //

    const colorHexMap = {
        "Red": 0xff0000, "Orange": 0xff7f00, "Yellow": 0xffff00,
        "Green": 0x00ff00, "Blue": 0x0000ff, "Pink": 0xffc0cb, 
        "White": 0xffffff, "Black": 0x111111, "Violet": 0x8b00ff
    };

    // 🔮 Solid translucent chambers reading spatial metrics directly from model
    window.COLOR_SPECTRUM_MODEL.forEach((chamber) => {
        const geometry = new THREE.SphereGeometry(0.22, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: colorHexMap[chamber.color],
            transparent: true,
            opacity: 0.35,
            wireframe: false // Solid translucent lock
        });
        
        const chamberMesh = new THREE.Mesh(geometry, material);
        
        // 📐 Direct coordinate injection from global matrix data
        chamberMesh.position.set(chamber.x, chamber.y, chamber.z);

        // Kilit Adres: skeleton.js'in yarattığı window.KuantumKafesi'ne kenetlenme
        if (window.KuantumKafesi) {
            window.KuantumKafesi.add(chamberMesh);
        }
        
        window.chambers[chamber.id] = chamberMesh;
    });

    // Ana animasyon döngüsünü tetikle
    MetatronPipeline();
}

function MetatronPipeline() {
    requestAnimationFrame(runMetatronPipeline);
    
    // Direct routing to your mathematical counter-current calculations
    window.MetatronEngine();

    if (window.renderer && window.scene && window.camera) {
        window.renderer.render(window.scene, window.camera);
    }
}

// ============================================================================
// 🌊 RESERVED METABOLIC CORE (YOUR LIVE VECTOR FLOWS GO HERE)
// ============================================================================
window.MetatronEngine = function() {
    // Structural cage and skeleton data are isolated safely inside skeleton.js.
    // Chambers are perfectly injected onto the matrix vectors from model metadata.
    
    // Ready for your exact 20-line pure polarity loop:
    // 1. Red ↔ Blue meeting at Yellow with Phi multiplier acceleration.
    // 2. Red ↔ Green meeting at Yellow to instantiate electromagnetic pole.
};

// Start the core engine
//injectMetatronMetabolism();


// 📯 MASTER CORE TRIGGER: Metatron executes the skeleton engine right upon loading
if (typeof window.initSkelaton === "function") window.initSkelaton()
