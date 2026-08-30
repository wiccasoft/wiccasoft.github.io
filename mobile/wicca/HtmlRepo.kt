package com.wiccasoft.wicca

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.jsoup.Jsoup

class HtmlRepo {
    private val client = OkHttpClient()

    suspend fun fetchHtmlTitle(url: String): String = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder().url(url).build()
            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) return@withContext "Error: ${response.code}"
                val body = response.body?.string() ?: return@withContext "Empty body"
                val doc = Jsoup.parse(body)
                doc.title()
            }
        } catch (e: Exception) {
            "Exception: ${e.message}"
        }
    }

    suspend fun fetchHtmlContent(url: String): String = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder().url(url).build()
            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) return@withContext "Error: ${response.code}"
                val body = response.body?.string() ?: return@withContext "Empty body"
                val doc = Jsoup.parse(body)
                doc.body()?.text() ?: "No body content"
            }
        } catch (e: Exception) {
            "Exception: ${e.message}"
        }
    }
}
