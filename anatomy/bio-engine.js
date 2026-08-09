biyolojik-motor.js// =========================================================================
// bip-engine.js - MERKEZİ KARDİYAK ELEKTROFİZYOLOJİ İŞLEMCİSİ (WORKER)
// =========================================================================

// --- 🌐 GLOBAL SİSTEM PARAMETRELERİ ---
let SISTEM_MODU = "HOMEOSTASIS"; // HOMEOSTASIS, CRITICAL_SHOCK, VAGAL_HOLD
let amygdalaCharge = 0.0;        // 0.0 (Sakin) -> 1.0 (Akut Korku/Şok)
let vagalBrakeEffort = 0.0;      // Vagus sinirinin (Parasempatik) frenleme gücü
let gecenSure = 0;               // Hücresel zaman döngüsü sayacı

// --- 🩻 TIBBİ AKSIYON POTANSİYELİ VE RENK MATRİSİ (6 ODA) ---
const KARDİYAK_ODALAR = [
    { ad: "FAZ 4: Diastolik Dinlenme", renk: "Kırmızı",  tabanMv: -90.0, frekansGosterge: "174 Hz" },
    { ad: "EŞİK FAZI: İyon Kanalları", renk: "Turuncu",  tabanMv: -70.0, frekansGosterge: "285 Hz" },
    { ad: "FAZ 0: Hızlı Depolarizasyon",renk: "Sarı",     tabanMv:  20.0, frekansGosterge: "396 Hz" },
    { ad: "FAZ 2: Kasılma Plato Fazı",  renk: "Yeşil",    tabanMv:   0.0, frekansGosterge: "528 Hz" },
    { ad: "FAZ 3: Repolarizasyon",     renk: "Mavi",     tabanMv: -60.0, frekansGosterge: "741 Hz" },
    { ad: "FAZ 4: Hiperpolarizasyon",   renk: "Mor",      tabanMv: -90.0, frekansGosterge: "852 Hz" }
];

// --- 🧠 1. NÖRAL VALİ MOTORU (Beyin - Amigdala & Vagus Dengesi) ---
function simuleEtBeyin() {
    if (SISTEM_MODU === "CRITICAL_SHOCK") {
        // Savaş ya da Kaç: Amigdala saniyeler içinde maksimum deşarja fırlar
        amygdalaCharge = Math.min(1.0, amygdalaCharge + 0.08);
        vagalBrakeEffort = Math.min(1.2, vagalBrakeEffort + 0.03); // Vagus arkadan yetişmeye çalışır
    } else {
        // Homeostaz: Sistem sakinleşir, denge aranır
        amygdalaCharge = Math.max(0.0, amygdalaCharge - 0.02);
        vagalBrakeEffort = Math.max(0.1, vagalBrakeEffort - 0.02);
    }
}

// --- 🫀 2. KARDİYAK ELEKTRİK MOTORU (Kalp - Odalar & Milivolt Hesaplama) ---
function simuleEtKalp() {
    let anlikOdaIndex = 0;
    let döngüHizi = 6; // Normalde saniyede 6 oda gezen dalga (6 Hz Taşıyıcı Ritm)

    // 🚨 Kriz anında kalp hızı (BPM) ve odalar arası geçiş sürati fırlar (Taşikardi)
    if (SISTEM_MODU === "CRITICAL_SHOCK" && vagalBrakeEffort < 0.8) {
        döngüHizi = 15; // Saniyede 15 oda tarayacak kadar hızlı elektrik dalgası
    }

    // Zaman akışına göre aktif odayı buluyoruz
    anlikOdaIndex = Math.floor(gecenSure * döngüHizi) % KARDİYAK_ODALAR.length;
    let aktifOda = KARDİYAK_ODALAR[anlikOdaIndex];
    let anlikMv = aktifOda.tabanMv;

    // --- SİNYAL MODÜLASYON ŞARTLARI ---
    if (vagalBrakeEffort >= 0.8) {
        // 📉 MÜKEMMEL TOPRAKLAMA: Vagus tam frene bastığında kalp durup patlamaz!
        // Tüm odalar en derin dinlenme potansiyeline kilitlenir. Geriye sadece pürüzsüz -90 mV can çizgisi kalır.
        anlikMv = -90.0; 
        SISTEM_MODU = "VAGAL_HOLD";
    } 
    else if (SISTEM_MODU === "CRITICAL_SHOCK" && aktifOda.renk === "Sarı") {
        // 🔥 ADRENALİN ETKİSİ: Faz 0 (Sarı odadaki patlama) hücresel aşırı yükten dolayı +20 mV yerine +35 mV'a fırlar.
        anlikMv = 35.0; 
    }

    // Dinamik hesaplanan BPM (Kalp Atış Hızı) simülasyonu
    let anlikBpm = 74;
    if (SISTEM_MODU === "CRITICAL_SHOCK") anlikBpm = 142;
    else if (SISTEM_MODU === "VAGAL_HOLD") anlikBpm = 45; // Derin vagal meditasyon/şok ritmi

    return {
        mv: anlikMv,
        bpm: anlikBpm,
        odaAdi: aktifOda.ad,
        renk: aktifOda.renk,
        frekans: aktifOda.frekansGosterge
    };
}

// --- 🥩 3. METABOLİK ENERJİ MOTORU (Karaciğer - Glikoz/Glikojen Akışı) ---
let karacigerGlikoz = 100.0;
let metabolikYuk = 10.0;

function simuleEtKaraciger(kalpData) {
    if (SISTEM_MODU === "CRITICAL_SHOCK" && karacigerGlikoz > 5.0) {
        // Kalpteki Sarı oda (Patlama) ve Yeşil oda (Kasılma) her tetiklendiğinde karaciğer acil yakıt basar
        if (kalpData.renk === "Sarı" || kalpData.renk === "Yeşil") {
            karacigerGlikoz -= 0.8 * amygdalaCharge;
            metabolikYuk = 92.0; // Karaciğer hücreleri tam kapasite çalışıyor
        }
    } else {
        // Normal faza geri dönüşte karaciğer glikojeni yavaşça sentezler (Yenilenme)
        if (karacigerGlikoz < 100.0) karacigerGlikoz += 0.05;
        metabolikYuk = Math.max(10.0, metabolikYuk - 0.5);
    }

    return {
        glikozDeposu: karacigerGlikoz,
        yuk: metabolikYuk
    };
}

// --- 🔄 4. ANA BİYOLOJİK ASENKRON DÖNGÜ (Loop) ---
setInterval(() => {
    gecenSure += 0.03; // ~30ms örnekleme adımı

    // Motorları sırayla koşturup birbirine bağlıyoruz
    simuleEtBeyin();
    let kalpSonuc = simuleEtKalp();
    let karacigerSonuc = simuleEtKaraciger(kalpSonuc);

    // Ön yüzde (Three.js ve HTML'de) öğrencilerin göreceği tüm pürüzsüz verileri gönder
    postMessage({
        komut: "BİYOLOJİK_TELEMETRİ",
        sistemModu: SISTEM_MODU,
        amigdala: amygdalaCharge,
        vagusEffort: vagalBrakeEffort,
        kalp: kalpSonuc,
        karaciger: karacigerSonuc
    });
}, 30);

// Ana sayfadan gelen kullanıcı emirlerini (Buton tıklamaları, Savaş/Kaç tetikleyicisi) dinle
onmessage = function(e) {
    if (e.data.komut === "MOD_DEGISTIR") {
        SISTEM_MODU = e.data.yeniMod;
        // Eğer şoktan homeostaza dönülüyorsa kilitleri gevşet
        if (e.data.yeniMod === "HOMEOSTASIS" && SISTEM_MODU === "VAGAL_HOLD") {
            vagalBrakeEffort = 0.1;
            amygdalaCharge = 0.0;
        }
    }
};