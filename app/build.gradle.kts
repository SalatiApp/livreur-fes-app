plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
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
            val keystorePath = (project.findProperty("KEYSTORE_PATH") as? String)
                ?: System.getenv("KEYSTORE_PATH")
            if (!keystorePath.isNullOrEmpty()) {
                val kFile = file(keystorePath)
                if (kFile.exists()) {
                    val storePass = (project.findProperty("STORE_PASSWORD") as? String)
                        ?: System.getenv("STORE_PASSWORD") ?: ""
                    val keyPass = (project.findProperty("KEY_PASSWORD") as? String)
                        ?: System.getenv("KEY_PASSWORD") ?: storePass

                    storeFile = kFile
                    storePassword = storePass
                    keyAlias = "upload"
                    keyPassword = if (keyPass.isNotEmpty()) keyPass else storePass
                }
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            val releaseSigning = signingConfigs.getByName("release")
            if (releaseSigning.storeFile != null && releaseSigning.storeFile!!.exists()) {
                signingConfig = releaseSigning
            } else {
                signingConfig = signingConfigs.getByName("debug")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    kotlinOptions {
        jvmTarget = "21"
    }

    buildFeatures {
        buildConfig = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.activity:activity-ktx:1.9.3")
    implementation("androidx.webkit:webkit:1.12.1")
}
