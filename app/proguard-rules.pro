# Proguard rules for LIVLINK MA Android hybrid app
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
