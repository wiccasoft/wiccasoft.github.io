package com.wiccasoft.wicca.network

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.jsoup.Jsoup

class HtmlRepository {
    private val client = OkHttpClient()

    suspend fun fetchHtmlTitle(url: String): String = withContext(Dispatchers.IO) {
        val request = Request.Builder()
            .url(url)
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) return@withContext "Error: ${response.code}"
            val html = response.body?.string() ?: return@withContext "Empty response"
            val doc = Jsoup.parse(html)
            doc.title()
        }
    }
}
