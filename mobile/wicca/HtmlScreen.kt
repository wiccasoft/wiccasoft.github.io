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
                            
                            webViewClient = object : WebViewClient() {
                                override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                                    Log.d("WebViewFlow", "Page started: $url")
                                }

                                override fun onPageFinished(view: WebView?, url: String?) {
                                    Log.d("WebViewFlow", "Page finished: $url - Injecting Path & Layout Fix")
                                    view?.evaluateJavascript(
                                        """
    (function() {
        // Stilleri ve Iframe yollarını düzelten ana fonksiyon
        function applyFixes() {
            var h = window.innerHeight + 'px';
            
            // 1. CSS Stillerini Enjekte Etme veya Güncelleme
            var styleId = 'webview-layout-fix';
            var style = document.getElementById(styleId);
            if (!style) {
                style = document.createElement('style');
                style.id = styleId;
                document.head.appendChild(style);
            }
            style.innerHTML = `
                html, body { height: ' + h + ' !important; margin: 0; padding: 0; background: white !important; }
                .main-viewport { height: ' + h + ' !important; display: block !important; }
                .metatron-three-iframe-holder { height: ' + h + ' !important; display: block !important; visibility: visible !important; }
                .metatron-iframe { height: 100% !important; width: 100% !important; display: block !important; border: 2px solid blue !important; }
            `;

            // 2. Iframe Linklerini Mutlak Değere Dönüştürme
            document.querySelectorAll('iframe').forEach(f => {
                if (f.src && !f.src.startsWith('http')) {
                    var absolute = new URL(f.getAttribute('src'), window.location.href).href;
                    if (f.src !== absolute) {
                        console.log("WebViewAssetDebug: Converting relative iframe src to: " + absolute);
                        f.src = absolute;
                    }
                }
            });

            // 3. WebGL ve Üç Boyutlu Motorları Uyandırmak İçin Resize Tetikleme
            window.dispatchEvent(new Event('resize'));
        }

        // Sayfa tamamen hazır olduğunda ilk çalıştırma
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyFixes);
        } else {
            applyFixes();
        }

        // EĞER ELEMENTLER GEÇ YÜKLENİYORSA: DOM değişikliklerini izleyip yakalama
        var observer = new MutationObserver(function(mutations) {
            applyFixes();
        });
        observer.observe(document.body || document.documentElement, { 
            childList: true, 
            subtree: true 
        });

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
                                mediaPlaybackRequiresUserGesture = false
                                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                                userAgentString = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
                                
                                blockNetworkImage = false
                                loadsImagesAutomatically = true

                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                    forceDark = WebSettings.FORCE_DARK_OFF
                                }

                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                    safeBrowsingEnabled = false
                                }
                            }
                            loadUrl(viewModel.url)
                        }
                    },
                    update = { webView ->
                        if (webView.url != viewModel.url && viewModel.url.isNotEmpty()) {
                            webView.loadUrl(viewModel.url)
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
