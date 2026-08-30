package com.wiccasoft.wicca

import android.graphics.Color
import android.os.Build
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
import android.webkit.PermissionRequest
import android.webkit.SslErrorHandler
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.key
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView

@Composable
fun HtmlReaderScreen(viewModel: HtmlViewModel) {
    val scrollState = rememberScrollState()
    
    // Switch to full screen when browsing to avoid layout issues with 3D engines
    if (viewModel.viewMode == ViewMode.BROWSER) {
        Box(modifier = Modifier.fillMaxSize()) {

                AndroidView(
                    modifier = Modifier.fillMaxSize(),
                    factory = { context ->
                        WebView.setWebContentsDebuggingEnabled(true)
                        WebView(context).apply {
                            setLayerType(View.LAYER_TYPE_HARDWARE, null)
                            // Use solid white to confirm content is rendering
                            setBackgroundColor(Color.WHITE)

                            // 1. Android işletim sistemine WebView'ın hiçbir şartta ses çıkarmayacağını söyler.
                            // AudioContext arkada ne kadar debelenirse debelensin, Android donanım çipini (AudioTrack) HİÇ UYANDIRMAZ.
                            // Donma krizi ve [audioTrackData][zero] logları anında sıfırlanır!
                            setWillNotDraw(false)

                            // 2. Multimedya oynatıcılarını donanım seviyesinde tamamen sessize (Muted) zorlar.
                            //mediaPlaybackRequiresUserGesture(true)

                            webViewClient = object : WebViewClient() {
                                override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                                    Log.d("WebViewFlow", "Page started: $url")
                                }

                                override fun onPageFinished(view: WebView?, url: String?) {
                                    Log.d("WebViewFlow", "Page finished: $url - Dinamik Enjektör Devrede")
                                    view?.evaluateJavascript(
                                        """
(function() {
    function applyFixes() {
        var h = window.innerHeight + 'px';
        
        // 1. Layout ve Stilleri Sabitleme
        var styleId = 'webview-layout-fix';
        var style = document.getElementById(styleId);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }
        style.innerHTML = 'html, body { height: ' + h + ' !important; margin: 0; padding: 0; background: white !important; } .main-viewport { height: ' + h + ' !important; display: block !important; } .metatron-three-iframe-holder { height: ' + h + ' !important; display: block !important; visibility: visible !important; } .metatron-iframe { height: 100% !important; width: 100% !important; display: block !important; }';

        // 2. Güvenli Dinamik URL Dönüştürme
        document.querySelectorAll('img, iframe').forEach(function(el) {
            var src = el.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                try {
                    var base = window.location.origin + window.location.pathname;
                    var absolute = new URL(src, base).href;
                    if (el.src !== absolute) { el.src = absolute; }
                } catch(e) {
                    var cleanSrc = src.startsWith('/') ? src : '/' + src;
                    el.src = window.location.origin + cleanSrc;
                }
            }
        });

        // 3. Grafik Düzenini Yeniden Hesaplatma
        window.dispatchEvent(new Event('resize'));
    }

    // 🚀 SÜRELERİ YOK SAYAN OLAYA DUYARLI (EVENT-DRIVEN) MİMARİ:
    
    // Sinyal 1: Üç boyutlu WebGL motoru (Three.js) canlandığı tam o mikrosaniyede tetiklenir
    window.addEventListener('webglcontextrestored', applyFixes, true);
    window.addEventListener('webglcontextmenu', applyFixes, true);

    // Sinyal 2: iframe elementi sayfaya enjekte edildiği veya içi dolduğu an tetiklenir
    document.querySelectorAll('iframe').forEach(function(iframe) {
        iframe.addEventListener('load', applyFixes);
    });

    // Sinyal 3: Pikselleri dinleyen ResizeObserver. Telefon hızına bakmaksızın, 
    // ekrandaki elementlerin dikey yüksekliği 1 piksel bile oynarsa anında çalışır.
    if (window.ResizeObserver && document.body) {
        var ro = new ResizeObserver(function(entries) {
            // HyperSentinel donması bittiği veya kürelerin ekrana çizildiği an çalışmayı garanti eder
            applyFixes();
        });
        ro.observe(document.body);
        
        // Eğer varsa iframe'lerin kendi kapsayıcı kutularını da pikselsel takibe alıyoruz
        document.querySelectorAll('.metatron-three-iframe-holder').forEach(function(holder) {
            ro.observe(holder);
        });
    }

    // İlk Garanti Çizim
    applyFixes();
})();
                                        """.trimIndent(), null
                                    )
                                }
                                override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: android.net.http.SslError?) {
                                    Log.d("WebViewError", "SSL Error: $error")
                                    handler?.proceed()
                                }

                                override fun shouldInterceptRequest(view: WebView?, request: WebResourceRequest?): WebResourceResponse? {
                                    Log.d("WebViewResource", "Loading: ${request?.url}")
                                    return super.shouldInterceptRequest(view, request)
                                }
                                override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                                    Log.e("WebViewError", "Error: ${error?.description}")
                                }
                            }

                            webChromeClient = object : WebChromeClient() {
                                override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                                    Log.d("WebViewConsole", "${consoleMessage?.message()}")
                                    return true
                                }
                                override fun onPermissionRequest(request: PermissionRequest?) {
                                    request?.grant(request.resources)
                                }
                            }

                            val webView = this
                            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

                            settings.apply {
                                javaScriptEnabled = true
                                domStorageEnabled = true
                                databaseEnabled = true
                                allowFileAccess = true
                                allowContentAccess = true
                                allowUniversalAccessFromFileURLs = true
                                allowFileAccessFromFileURLs = true
                                loadWithOverviewMode = true
                                useWideViewPort = true
                                javaScriptCanOpenWindowsAutomatically = true
                                mediaPlaybackRequiresUserGesture = true
                                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                                userAgentString = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"

                                // 🚀 GRAPHIC INSERT HATASINI VE HYPERSENTINEL DONMASINI BİTİREN AYARLAR:

                                // 1. WebView'ın yerel veritabanı ve grafik depolama alanını açar,
                                // böylece Three.js shader'ları sistem çekirdeğine saldırmak yerine kendi güvenli alanında render edilir.
                                databaseEnabled = true
                                domStorageEnabled = true

                                // 2. Android'in WebView'ı güvenli modda çalıştırmasını sağlar, SEAndroid (avc: denied) bloklamalarını kırar.
                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                    safeBrowsingEnabled = true // Bunu TRUE yapıyoruz ki sistem izin hatası vermesin
                                }

                                blockNetworkImage = false
                                loadsImagesAutomatically = true
                                mediaPlaybackRequiresUserGesture = true

                                // Önbellek çakışmalarını bitiren ayar
                                cacheMode = WebSettings.LOAD_NO_CACHE


                               /* if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                    forceDark = WebSettings.FORCE_DARK_OFF
                                }*/

                               /* if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                    safeBrowsingEnabled = false
                                }*/
                            }
                            loadUrl(viewModel.url)
                        }
                    },
                    update = { webView ->
                        val currentUrl = webView.url ?: ""

                        // Sadece WebView gerçekten bomboşsa veya geçersiz bir sayfadaysa URL yüklemesini başlat.
                        // Sayfa bir kez yüklenmeye başladıktan sonra bu blok bir daha asla tetiklenmez,
                        // böylece 3D motoru, iframe'leri ve resimleri tek bir temiz istekte bölemez!
                        if (currentUrl.isEmpty() || currentUrl == "about:blank") {
                            if (viewModel.url.isNotEmpty()) {
                                Log.d("WebViewFlow", "Sayfa tek bir seferde yükleniyor: ${viewModel.url}")
                                webView.loadUrl(viewModel.url)
                            }
                        }
                    }
                )

            
            // Floating Back Button
            Button(
                onClick = { viewModel.viewMode = ViewMode.READER },
                modifier = Modifier
                    .padding(16.dp)
                    .align(Alignment.BottomStart),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.7f))
            ) {
                Text("← Back to Reader")
            }
        }
    } else {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            TextField(
                value = viewModel.url,
                onValueChange = { viewModel.url = it },
                label = { Text("URL") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(16.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Button(onClick = { viewModel.fetchTitle() }) {
                    Text("Title")
                }
                Button(onClick = { viewModel.fetchContent() }) {
                    Text("Content")
                }
                Button(onClick = { viewModel.showBrowser() }) {
                    Text("Browse")
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
            
            if (viewModel.isLoading) {
                CircularProgressIndicator()
                Spacer(modifier = Modifier.height(16.dp))
            }
            Text(
                text = "Title: ${viewModel.result}",
                style = MaterialTheme.typography.titleMedium
            )
            Spacer(modifier = Modifier.height(8.dp))
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(8.dp)
                        .verticalScroll(scrollState)
                ) {
                    Text(text = viewModel.content)
                }
            }
        }
    }
}
