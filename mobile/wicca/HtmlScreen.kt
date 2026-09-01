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
        Box(
            modifier = Modifier
                .fillMaxSize()

                .windowInsetsPadding(WindowInsets(0, 0, 0, 0))
        ) {
            AndroidView(

                modifier = Modifier,
                factory = { context ->
                    WebView.setWebContentsDebuggingEnabled(true)
                    WebView(context).apply {

                        layoutParams = android.view.ViewGroup.LayoutParams(
                            android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                            android.view.ViewGroup.LayoutParams.MATCH_PARENT
                        )

                        // Saf donanım ivmesi açık kalmalı, ağır 3D motoru için şart
                        setLayerType(View.LAYER_TYPE_HARDWARE, null)
                        setBackgroundColor(Color.TRANSPARENT)

                        isVerticalScrollBarEnabled = true
                        isHorizontalScrollBarEnabled = false

                        webViewClient = object : WebViewClient() {
                            // JavaScript enjeksiyonları, style.innerHTML hileleri TAMAMEN SİLİNDİ.
                            // Sadece saf uzak site yükleniyor.
                        }

                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            databaseEnabled = true

                            // Ekran koordinatlarının uzak sitenin Viewport (100vh) kurallarıyla birebir eşleşmesini sağlar
                            loadWithOverviewMode = true
                            useWideViewPort = true

                            // Chromium motorunun asenkron iframe'leri lazy-load ile doğal sırayla işlemesini sağlar
                            cacheMode = WebSettings.LOAD_DEFAULT
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        }

                        loadUrl(viewModel.url)
                    }
                },
                update = { webView ->
                    // Güvenli tek seferlik yükleme döngüsü
                    val currentUrl = webView.url ?: ""
                    if (currentUrl.isEmpty() || currentUrl == "about:blank") {
                        if (viewModel.url.isNotEmpty()) {
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
