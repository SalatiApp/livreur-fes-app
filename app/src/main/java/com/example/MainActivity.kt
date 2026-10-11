package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Color as AndroidColor
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
  private var activeWebView: WebView? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    try {
      enableEdgeToEdge()
    } catch (e: Throwable) {
      Log.w("LIVLINK_MA", "enableEdgeToEdge failed gracefully: ${e.message}")
    }

    try {
      setContent {
        MyApplicationTheme(dynamicColor = false) {
          HybridAppScreen(onWebViewReady = { webView ->
            activeWebView = webView
          })
        }
      }
    } catch (composeError: Throwable) {
      Log.e("LIVLINK_MA", "Compose setup error, falling back to direct WebView", composeError)
      try {
        val fallbackWebView = createConfiguredWebView(this)
        activeWebView = fallbackWebView
        setContentView(fallbackWebView)
      } catch (fatalError: Throwable) {
        Log.e("LIVLINK_MA", "Fatal WebView initialization error", fatalError)
      }
    }

    onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
      override fun handleOnBackPressed() {
        if (activeWebView?.canGoBack() == true) {
          activeWebView?.goBack()
        } else {
          isEnabled = false
          onBackPressedDispatcher.onBackPressed()
        }
      }
    })
  }

  override fun onDestroy() {
    try {
      activeWebView?.destroy()
    } catch (_: Throwable) {}
    activeWebView = null
    super.onDestroy()
  }
}

@SuppressLint("SetJavaScriptEnabled")
fun createConfiguredWebView(context: Context): WebView {
  return WebView(context).apply {
    setLayerType(View.LAYER_TYPE_HARDWARE, null)
    setBackgroundColor(AndroidColor.rgb(2, 6, 23))

    settings.apply {
      javaScriptEnabled = true
      domStorageEnabled = true
      databaseEnabled = true
      allowFileAccess = true
      allowContentAccess = true
      @Suppress("DEPRECATION")
      allowFileAccessFromFileURLs = true
      @Suppress("DEPRECATION")
      allowUniversalAccessFromFileURLs = true
      cacheMode = WebSettings.LOAD_DEFAULT
      useWideViewPort = true
      loadWithOverviewMode = true
      displayZoomControls = false
      builtInZoomControls = false
      textZoom = 100
      setGeolocationEnabled(true)
    }

    webChromeClient = object : WebChromeClient() {
      override fun onGeolocationPermissionsShowPrompt(
        origin: String?,
        callback: GeolocationPermissions.Callback?
      ) {
        callback?.invoke(origin, true, false)
      }

      override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        return true
      }
    }

    webViewClient = object : WebViewClient() {
      override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?
      ): Boolean {
        val url = request?.url?.toString() ?: return false
        return handleAppUrls(context, url)
      }

      @Deprecated("Deprecated in Java")
      override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        if (url == null) return false
        return handleAppUrls(context, url)
      }
    }

    loadUrl("file:///android_asset/index.html")
  }
}

private fun handleAppUrls(context: Context, url: String): Boolean {
  return when {
    url.startsWith("tel:") -> {
      try {
        val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
        context.startActivity(intent)
      } catch (_: Throwable) {}
      true
    }
    url.startsWith("mailto:") -> {
      try {
        val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
        context.startActivity(intent)
      } catch (_: Throwable) {}
      true
    }
    url.startsWith("https://wa.me") || url.startsWith("whatsapp://") || url.contains("whatsapp") -> {
      try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        context.startActivity(intent)
      } catch (_: Throwable) {
        try {
          val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
          context.startActivity(browserIntent)
        } catch (_: Throwable) {}
      }
      true
    }
    url.startsWith("http://") || url.startsWith("https://") -> {
      if (!url.contains("localhost") && !url.contains("127.0.0.1")) {
        try {
          val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
          context.startActivity(intent)
          true
        } catch (_: Throwable) {
          false
        }
      } else {
        false
      }
    }
    else -> false
  }
}

@Composable
fun HybridAppScreen(onWebViewReady: (WebView) -> Unit) {
  val isDark = isSystemInDarkTheme()
  var localWebView by remember { mutableStateOf<WebView?>(null) }

  BackHandler(enabled = localWebView?.canGoBack() == true) {
    localWebView?.goBack()
  }

  Box(
    modifier = Modifier
      .fillMaxSize()
      .statusBarsPadding()
      .background(if (isDark) Color(0xFF020617) else Color(0xFFF8FAFC))
  ) {
    AndroidView(
      modifier = Modifier.fillMaxSize(),
      factory = { context ->
        createConfiguredWebView(context).also { wv ->
          wv.setBackgroundColor(
            if (isDark) AndroidColor.rgb(2, 6, 23)
            else AndroidColor.rgb(248, 250, 252)
          )
          localWebView = wv
          onWebViewReady(wv)
        }
      },
      update = { wv ->
        localWebView = wv
        onWebViewReady(wv)
      }
    )
  }
}
