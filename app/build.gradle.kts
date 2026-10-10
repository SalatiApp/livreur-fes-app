import com.google.gms.googleservices.GoogleServicesPlugin.MissingGoogleServicesStrategy

plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.kotlin.compose)
  alias(libs.plugins.google.devtools.ksp)
  alias(libs.plugins.secrets)
  alias(libs.plugins.google.services)
}

android {
  namespace = "com.example"
  compileSdk = 35

  defaultConfig {
    applicationId = "com.aistudio.livrerfes.kxvd"
    minSdk = 24
    targetSdk = 35
    versionCode = 1
    versionName = "1.0"

    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }

  signingConfigs {
    create("release") {
      val kPath = (project.findProperty("RELEASE_STORE_FILE") as? String)
        ?: (project.findProperty("KEYSTORE_PATH") as? String)
        ?: System.getenv("KEYSTORE_PATH")
        ?: "${rootDir}/my-upload-key.jks"

      if (!kPath.isNullOrEmpty()) {
        val kFile = file(kPath)
        if (kFile.exists()) {
          val storePass = (project.findProperty("RELEASE_STORE_PASSWORD") as? String)
            ?: (project.findProperty("STORE_PASSWORD") as? String)
            ?: System.getenv("STORE_PASSWORD") ?: ""

          val keyPass = (project.findProperty("RELEASE_KEY_PASSWORD") as? String)
            ?: (project.findProperty("KEY_PASSWORD") as? String)
            ?: System.getenv("KEY_PASSWORD") ?: storePass

          val sType = (project.findProperty("RELEASE_STORE_TYPE") as? String)
            ?: (project.findProperty("STORE_TYPE") as? String)
            ?: System.getenv("STORE_TYPE")

          val kAlias = (project.findProperty("RELEASE_KEY_ALIAS") as? String)
            ?: (project.findProperty("KEY_ALIAS") as? String)
            ?: System.getenv("KEY_ALIAS")
            ?: "upload"

          storeFile = kFile
          storePassword = storePass.trim()
          keyAlias = kAlias.trim()
          keyPassword = if (keyPass.trim().isNotEmpty()) {
            keyPass.trim()
          } else {
            storePass.trim()
          }

          if (!sType.isNullOrEmpty()) {
            storeType = sType.trim()
          }
        }
      }
    }
    create("debugConfig") {
      storeFile = file("${rootDir}/debug.keystore")
      storePassword = "android"
      keyAlias = "androiddebugkey"
      keyPassword = "android"
    }
  }

  buildTypes {
    release {
      isCrunchPngs = false
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
      val releaseSigning = signingConfigs.getByName("release")
      if (releaseSigning.storeFile != null && releaseSigning.storeFile!!.exists()) {
        signingConfig = releaseSigning
      } else {
        signingConfig = signingConfigs.getByName("debugConfig")
      }
    }
    debug { signingConfig = signingConfigs.getByName("debugConfig") }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
  }

  buildFeatures {
    compose = true
    buildConfig = true
  }

  testOptions { unitTests { isIncludeAndroidResources = true } }

  dependenciesInfo {
    includeInApk = false
    includeInBundle = true
  }
}

// Configure the Secrets Gradle Plugin to use .env and .env.example files
// to match the convention used in Web projects.
secrets {
  propertiesFileName = ".env"
  defaultPropertiesFileName = ".env.example"
  ignoreList.add("FIREBASE_APPCHECK_DEBUG_TOKEN")
}

googleServices { missingGoogleServicesStrategy = MissingGoogleServicesStrategy.WARN }

dependencies {
  implementation(platform(libs.androidx.compose.bom))
  implementation(platform(libs.firebase.bom))
  implementation(libs.androidx.activity.compose)
  implementation(libs.androidx.compose.material.icons.core)
  implementation(libs.androidx.compose.material.icons.extended)
  implementation(libs.androidx.compose.material3)
  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.graphics)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.lifecycle.runtime.compose)
  implementation(libs.androidx.lifecycle.runtime.ktx)
  implementation(libs.androidx.lifecycle.viewmodel.compose)
  implementation(libs.androidx.room.ktx)
  implementation(libs.androidx.room.runtime)
  implementation(libs.converter.moshi)
  implementation(libs.firebase.ai)
  implementation(libs.firebase.appcheck.recaptcha)
  implementation(libs.firebase.appcheck.debug)
  implementation(libs.kotlinx.coroutines.android)
  implementation(libs.kotlinx.coroutines.core)
  implementation(libs.logging.interceptor)
  implementation(libs.moshi.kotlin)
  implementation(libs.okhttp)
  implementation(libs.retrofit)
  testImplementation(libs.androidx.compose.ui.test.junit4)
  testImplementation(libs.androidx.core)
  testImplementation(libs.androidx.junit)
  testImplementation(libs.junit)
  testImplementation(libs.kotlinx.coroutines.test)
  testImplementation(libs.robolectric)
  androidTestImplementation(platform(libs.androidx.compose.bom))
  androidTestImplementation(libs.androidx.compose.ui.test.junit4)
  androidTestImplementation(libs.androidx.espresso.core)
  androidTestImplementation(libs.androidx.junit)
  androidTestImplementation(libs.androidx.runner)
  debugImplementation(libs.androidx.compose.ui.test.manifest)
  debugImplementation(libs.androidx.compose.ui.tooling)
  "ksp"(libs.androidx.room.compiler)
  "ksp"(libs.moshi.kotlin.codegen)
}
