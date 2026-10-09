package com.example

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color as AndroidColor
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  private var pendingOrigin: String? = null
  private var pendingCallback: GeolocationPermissions.Callback? = null
  private val LOCATION_PERMISSION_REQUEST_CODE = 100

  fun requestLocationPermission(origin: String?, callback: GeolocationPermissions.Callback?) {
    pendingOrigin = origin
    pendingCallback = callback
    ActivityCompat.requestPermissions(
      this,
      arrayOf(
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.ACCESS_COARSE_LOCATION
      ),
      LOCATION_PERMISSION_REQUEST_CODE
    )
  }

  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
  ) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
      val granted = grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED
      pendingCallback?.invoke(pendingOrigin, granted, false)
      pendingOrigin = null
      pendingCallback = null
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        HybridAppScreen()
      }
    }
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun HybridAppScreen() {
  val isDark = isSystemInDarkTheme()
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }

  BackHandler(enabled = webViewInstance?.canGoBack() == true) {
    webViewInstance?.goBack()
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
        WebView(context).apply {
          setLayerType(View.LAYER_TYPE_HARDWARE, null)

          setBackgroundColor(
            if (isDark) AndroidColor.rgb(2, 6, 23)
            else AndroidColor.rgb(248, 250, 252)
          )

          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            setGeolocationEnabled(true)
            cacheMode = WebSettings.LOAD_DEFAULT
            useWideViewPort = true
            loadWithOverviewMode = true
            displayZoomControls = false
            builtInZoomControls = false
            textZoom = 100
          }

          webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
              return true
            }

            override fun onGeolocationPermissionsShowPrompt(
              origin: String?,
              callback: GeolocationPermissions.Callback?
            ) {
              val activity = context as? MainActivity
              if (activity != null) {
                if (ContextCompat.checkSelfPermission(
                    activity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                  ) == PackageManager.PERMISSION_GRANTED
                ) {
                  callback?.invoke(origin, true, false)
                } else {
                  activity.requestLocationPermission(origin, callback)
                }
              } else {
                callback?.invoke(origin, false, false)
              }
            }
          }

          webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
              view: WebView?,
              request: WebResourceRequest?
            ): Boolean {
              val url = request?.url?.toString() ?: return false

              if (url.startsWith("tel:")) {
                try {
                  val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                  context.startActivity(intent)
                } catch (_: Exception) {}
                return true
              }

              if (url.startsWith("https://wa.me") || url.startsWith("whatsapp://")) {
                try {
                  val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                  context.startActivity(intent)
                } catch (_: Exception) {
                  try {
                    val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    context.startActivity(browserIntent)
                  } catch (_: Exception) {}
                }
                return true
              }

              return false
            }
          }

          loadUrl("file:///android_asset/index.html")
          webViewInstance = this
        }
      },
      update = { webView ->
        webViewInstance = webView
      }
    )
  }

  DisposableEffect(Unit) {
    onDispose {
      webViewInstance?.destroy()
    }
  }
}
