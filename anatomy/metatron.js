function updateMetatronLoop() {
    if (!window.scene || !window.camera || !window.renderer) return;

    const KuantumKafesi = window.scene.getObjectByName("MERKEZI_METATRON");
    if (!KuantumKafesi) return;

    const sabitDelta = 1 / 25; // 25 FPS taban zaman adımı

    // 🌊 KESİNTİSİZ ŞELALE AKIŞ MOTORU (Kutuplar Döndüğünde Ters Akabilen Sürüm)
    if (!window.vagusBrakeActive && (performance.now() - sonUretimZamani > 150)) {
        sonUretimZamani = performance.now();

        // Mavi odada (-60 mV) zamanı ve akış yönünü ters büküyoruz (Kutup Döngüsü)
        let akisYonu = (window.currentMv === -60) ? -1 : 1;

        let kaynakOdaVerisi = RENK_TAYFI_SPEKTRUMU[mevcutOdaSirasi];
        let sonrakiOdaIndex = (mevcutOdaSirasi + akisYonu + RENK_TAYFI_SPEKTRUMU.length) % RENK_TAYFI_SPEKTRUMU.length;
        let hedefOdaVerisi = RENK_TAYFI_SPEKTRUMU[sonrakiOdaIndex];

        let kaynakMesh = KuantumKafesi.getObjectByName(kaynakOdaVerisi.name);
        let hedefMesh = KuantumKafesi.getObjectByName(hedefOdaVerisi.name);

        if (kaynakMesh && hedefMesh) {
            // Şelale parçacığını odanın frekansıyla fırlat
            let yeniGluon = new KuantumPaketi(kaynakMesh, hedefMesh, kaynakOdaVerisi.frekans, KuantumKafesi);
            aktifPaketler.push(yeniGluon);
        }

        // Global pencereleri besleme
        window.currentMv = kaynakOdaVerisi.mv * akisYonu;
        window.currentOdaRengi = kaynakOdaVerisi.renk;

        mevcutOdaSirasi = sonrakiOdaIndex;
    }

    // Uçan canlı parçacıkların pürüzsüz yürütülmesi ve RAM temizliği
    for (let i = aktifPaketler.length - 1; i >= 0; i--) {
        aktifPaketler[i].guncelle(sabitDelta);

        if (aktifPaketler[i].ilerleme >= 1.0 || window.vagusBrakeActive) {
            aktifPaketler[i].yokEt();
            aktifPaketler.splice(i, 1);
        }
    }

    // Kutsal kafesi hafifçe evrensel eksende döndür (İsteğe bağlı)
    if (!window.vagusBrakeActive) KuantumKafesi.rotation.y += 0.005;

    // Siyah perdeyi ve her şeyi ekrana çizdir
    window.renderer.render(window.scene, window.camera);
}
