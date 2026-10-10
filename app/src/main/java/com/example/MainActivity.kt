package com.example

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this).apply {
            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            setBackgroundColor(Color.parseColor("#020617"))

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                allowFileAccess = true
                allowContentAccess = true
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
            }

            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?
                ): Boolean {
                    val url = request?.url?.toString() ?: return false
                    return handleExternalUrl(url)
                }

                @Deprecated("Deprecated in Java")
                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                    if (url == null) return false
                    return handleExternalUrl(url)
                }

                private fun handleExternalUrl(url: String): Boolean {
                    return when {
                        url.startsWith("tel:") -> {
                            val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                            startActivity(intent)
                            true
                        }
                        url.startsWith("mailto:") -> {
                            val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
                            startActivity(intent)
                            true
                        }
                        url.contains("wa.me") || url.startsWith("whatsapp:") -> {
                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                            startActivity(intent)
                            true
                        }
                        url.startsWith("http://") || url.startsWith("https://") -> {
                            // If external domain, open in browser if not local
                            if (!url.contains("localhost") && !url.contains("127.0.0.1")) {
                                try {
                                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                    startActivity(intent)
                                    true
                                } catch (e: Exception) {
                                    false
                                }
                            } else {
                                false
                            }
                        }
                        else -> false
                    }
                }
            }
        }

        setContentView(webView)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
