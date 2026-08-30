package com.wiccasoft.wicca

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

enum class ViewMode {
    READER, BROWSER
}

class HtmlViewModel(private val repo: HtmlRepo = HtmlRepo()) : ViewModel() {
    var url by mutableStateOf("https://www.wiccasoft.xyz")
    var result by mutableStateOf("")
    var content by mutableStateOf("")
    var isLoading by mutableStateOf(false)
    var viewMode by mutableStateOf(ViewMode.READER)

    fun fetchTitle() {
        viewMode = ViewMode.READER
        viewModelScope.launch {
            isLoading = true
            result = repo.fetchHtmlTitle(url)
            isLoading = false
        }
    }

    fun fetchContent() {
        viewMode = ViewMode.READER
        viewModelScope.launch {
            isLoading = true
            content = repo.fetchHtmlContent(url)
            isLoading = false
        }
    }

    fun showBrowser() {
        viewMode = ViewMode.BROWSER
    }
}
