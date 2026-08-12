// ============================================================================
// 🔮 GEMINI QUANTUM ORACLE - ENGINE CORE FULL PRODUCTION SUITE (ORACLE.JS)
// ============================================================================
// 🔑 COUPLING DIRECTLY TO WINDOW CONTEXT: Tüm fonksiyonlar pencere düzeyine
// bağlanarak HTML klik tetikleyicilerinden gelebilecek ReferenceError hatalarını kökten bitirir.

window.luiniPanelAcikMi = false;

window.toggleLuiniOracle = function() {
    const panel = document.getElementById("luiniOraclePanel");
    const dock = document.getElementById("luiniControlDock");
    const buton = document.getElementById("luiniTabButon");
    if (!panel) return;

    if (!window.luiniPanelAcikMi) {
        // 🚀 SLIDE AÇILIŞ: Panel ekranda tam yerine oturuyor
        panel.style.bottom = "20px";
        panel.style.position = "fixed"; // Ekranı çiviliyoruz, kayma yapamaz!
        window.luiniPanelAcikMi = true;
        
        // 🔑 KATMAN GEÇİRGENLİĞİ VE HİZALAMA KORUMASI:
        // Alt rıhtım saklanırken fiziksel boyutu sıfırlansın ki kalbe giden tıklamaları kesmesin!
        if (dock) {
            dock.style.bottom = "-100px";
            dock.style.opacity = "0";
            dock.style.pointerEvents = "none"; 
        }
        if (buton) buton.innerHTML = "▼ CLOSE";
        
        console.log("[ORACLE DECK] Fixed Panel Deployed. Alt rıhtım engeli kaldırıldı.");
    } else {
        // 📉 SLIDE KAPANIŞ: Yuvasına geri dönüyor
        panel.style.bottom = "-600px";
        window.luiniPanelAcikMi = false;
        
        // Kare ikonlar ve kalp rıhtımı tertemiz en tepe katmanda geri geliyor
        if (dock) {
            dock.style.bottom = "0";
            dock.style.opacity = "1";
            dock.style.pointerEvents = "auto";
            dock.style.zIndex = "1000002"; // Kare kalbin tıklanabilirliğini garantiye alıyoruz
        }
        if (buton) buton.innerHTML = "▲ ASK ORACLE";
    }
};

// ============================================================================
// 🛡️ AKILLI KAPANMA VANASI: SOL TARAF TIKLANDIĞINDA ALT MENÜLERİ KAPAT
// ============================================================================
window.closeOraclePanelDirectly = function() {
    const panel = document.getElementById("luiniOraclePanel");
    const dock = document.getElementById("luiniControlDock");
    const buton = document.getElementById("luiniTabButon");
    
    // Üst panel açıksa kapat
    if (panel) {
        panel.style.bottom = "-600px";
    }
    window.luiniPanelAcikMi = false;

    // Alt rıhtımı da ekranın altına tamamen gizle ki sol slide menü alanı ferahlasın!
    if (dock) {
        dock.style.bottom = "-100px";
        dock.style.opacity = "0";
        dock.style.pointerEvents = "none";
    }
    if (buton) buton.innerHTML = "▲ ASK ORACLE";
    console.log("[ORACLE CONTROLLER] Sol menü aksı uyandırıldı, alt paneller tamamen temizlendi. 📉");
};


// ============================================================================
// 🛡️ AKILLI KAPANMA VANASI: SOL TARAF TIKLANDIĞINDA ALT MENÜLERİ KAPAT (DÜZELTİLDİ)
// ============================================================================
window.closeOraclePanelDirectly = function() {
    const panel = document.getElementById("luiniOraclePanel");
    const dock = document.getElementById("luiniControlDock");
    const buton = document.getElementById("luiniTabButon");
    
    // Üst panel açıksa pürüzsüzce kapat (-600px yuvasına çek)
    if (panel) {
        panel.style.bottom = "-600px";
    }
    window.luiniPanelAcikMi = false;

    // 🔑 KRİTİK RECOVRY: Sol menü tıklandığında alt kare ikon rıhtımı yok olmasın!
    // Sadece üstteki büyük panel kapansın, alt rıhtım (`0px`) konumunda parlamaya devam etsin!
    if (dock) {
        dock.style.bottom = "0";
        dock.style.opacity = "1";
        dock.style.pointerEvents = "auto";
    }
    if (buton) buton.innerHTML = "▲ ASK ORACLE";
    console.log("[ORACLE CONTROLLER] Sol menü aksı uyandırıldı, üst panel kapatıldı, alt rıhtım korundu. 📐");
};

// ============================================================================
// 📡 MESAJA GÖRE COGNITIVE CEVAP MOTORU
// ============================================================================
window.fırlatOracleSoruyu = function() {
    const soruInput = document.getElementById("oracleSoruInput");
    const dock = document.getElementById("luiniControlDock");
    const buton = document.getElementById("luiniTabButon");
    if (!soruInput || !soruInput.value.trim()) return;

    const kullanıcıSorusu = soruInput.value.trim().toLowerCase();
    
    // 🔑 KESİN İSABET TARAYICISI: Ekrandaki üst sol mor kutuyu yakalamak için tüm alternatif yolları dene
    let oracleKutusu = document.getElementById("academicOracleId") || 
                        document.querySelector(".academic-oracle") ||
                        document.querySelector('[text*="ACADEMIC ORACLE"]')?.parentElement;

    // Tarayıcı lokalde (localhost) elementleri ıskalarsa DOM üzerinde derin tarama yap
    if (!oracleKutusu) {
        const tumDivler = document.getElementsByTagName("div");
        for (let div of tumDivler) {
            if (div.innerText && div.innerText.includes("ACADEMIC ORACLE")) {
                oracleKutusu = div;
                break;
            }
        }
    }

    if (oracleKutusu) {
        // 🧠 1. AŞAMA: Kuantum Düşünme Aşaması Tetikleniyor
        oracleKutusu.innerHTML = `
            <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #ff00ff; text-align: left; padding: 8px; line-height: 1.4;">
                <span style="color: #00ffff; font-weight: bold; display: block; border-bottom: 1px solid #ff00ff; padding-bottom: 4px; margin-bottom: 6px;">🧠 GEMINI COGNITIVE PROCESSING GATEWAY</span>
                <b style="color: #ffcc00;">📥 INBOUND QUERY:</b> <span style="color: #fff;">"${soruInput.value}"</span><br><br>
                <b style="color: #00ff00;">🔬 PLAZMA ANALİZİ:</b> İyonize plazma akışı ve kuantum rezonans verileri işleniyor...
            </div>
        `;

        // 🧠 2. AŞAMA: 1.2 saniye içinde tıp akademisine uygun net kuantum yanıtı fırlat!
        setTimeout(() => {
            let zekaYanıtı = "";

            if (kullanıcıSorusu.includes("mavi") || kullanıcıSorusu.includes("blue") || kullanıcıSorusu.includes("su")) {
                zekaYanıtı = `
                    <b style="color: #00ffff;">💧 SU VE REPOLARİZASYON FAZI (741 Hz):</b><br>
                    Mavi akım, kardiyak şasinin manyetik kalkanıdır aga. Sağ el kuralıyla içe bükülerek yüksek +20 mV voltajı sönümler ve pankreas homeostazisini dengeler. Luini tablosunun sağındaki bilge doktorlar bu sönümlenmeyi gözlemliyor!
                `;
            } else if (kullanıcıSorusu.includes("kırmızı") || kullanıcıSorusu.includes("red") || kullanıcıSorusu.includes("ateş")) {
                zekaYanıtı = `
                    <b style="color: #ff3300;">🔥 ATEŞ VE ELEKTRİKSEL AKS (174 Hz):</b><br>
                    Kırmızı koridor, sistemin jeneratörüdür. Sol el kuralıyla dışa savrulan iyonize plazma, -90 mV potansiyelden karaciğer metabolik yollarını (metabolic pathways) ateşler. Burası sönse kuantum motoru çöker!
                `;
            } else if (kullanıcıSorusu.includes("sarı") || kullanıcıSorusu.includes("yıldırım") || kullanıcıSorusu.includes("hava")) {
                zekaYanıtı = `
                    <b style="color: #ffff00;">🌬️ HAVA VE PLAZMA FÜZYON FAZI (396 Hz):</b><br>
                    +20 mV düzeyindeki aks patlamasıdır. En kısa yol ilkesini (Geodezik) seçen gluonlar aniden ivmelenir, yüksek enerji yayarak Doppler kaymasıyla mor spektruma fırlar.
                `;
            } else {
                zekaYanıtı = `
                    <b style="color: #ff00ff;">🪐 QUANTUM COGNITIVE FIELD:</b><br>
                    Sorduğun soru 5-Fold şasisindeki 4 element dengesini doğrulamaktadır. Sol çeper (Ateş) metabolik iyonizasyon patlaması, sağ çeper (Su) ise manyetik topraklama hattıdır.
                `;
            }

            oracleKutusu.innerHTML = `
                <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #fff; text-align: left; padding: 8px; line-height: 1.4;">
                    <span style="color: #00ffff; font-weight: bold; display: block; border-bottom: 1px solid #ff00ff; padding-bottom: 4px; margin-bottom: 6px;">🔮 GEMINI COGNITIVE ANSWER</span>
                    ${zekaYanıtı}
                </div>
            `;
        }, 1200);
    } else {
        console.log("[ORACLE CRITICAL] Dikkat: Üst sol kısımdaki mor kutu DOM üzerinde bulunamadı! 🛡️");
    }

    // 📉 3. AŞAMA: Girişi temizle ve slide menüyü pürüzsüzce kapat (-600px)
    soruInput.value = "";
    
    const panel = document.getElementById("luiniOraclePanel");
    if (panel) panel.style.bottom = "-600px";
    window.luiniPanelAcikMi = false;
    
    // Alt rıhtımı ve amiral gemisi butonunu asilce eski yerine oturt
    if (dock) {
        dock.style.bottom = "0";
        dock.style.opacity = "1";
        dock.style.pointerEvents = "auto";
    }
    if (buton) buton.innerHTML = "▲ ASK ORACLE";
};


// ============================================================================
// 🔓 MUTLAK AÇILIŞ KİLİDİ: SAYFA YÜKLENDİĞİ AN ALT RIHTIMI ZORLA GÖSTER!
// ============================================================================
// Sayfa localhost'ta veya yayında ilk açıldığı saniyede, CSS'teki tüm gizlilikleri
// ezip alt kare ikon rıhtımını tam merkez nizamında ekrana çiviler.

function altRihtimiZorlaUyandir() {
    const dock = document.getElementById("luiniControlDock");
    const buton = document.getElementById("luiniTabButon");
    
    if (dock) {
        dock.style.bottom = "0px";
        dock.style.opacity = "1";
        dock.style.display = "flex"; // Eğer display none yapıldıysa es geçmesin
        dock.style.pointerEvents = "auto";
        dock.style.zIndex = "999999";
        console.log("[ORACLE ENGINE] Alt kare ikon rıhtımı açılışta zorla görünür kılındı. 🚀");
    }
    if (buton) {
        buton.innerHTML = "▲ ASK ORACLE";
    }
}

// Tarayıcı DOM ağacını bitirdiği an ilk bu tetiği çekecek:
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", altRihtimiZorlaUyandir);
} else {
    altRihtimiZorlaUyandir();
}

console.log("[ORACLE ENGINE] Module 'oracle.js' Full Structure Restored. 🔮⚡");