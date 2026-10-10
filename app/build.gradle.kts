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
            val kPath = (project.findProperty("RELEASE_STORE_FILE") as? String)
                ?: (project.findProperty("KEYSTORE_PATH") as? String)
                ?: System.getenv("KEYSTORE_PATH")

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

                    val isPkcs12 = sType?.trim()?.equals("pkcs12", ignoreCase = true) == true

                    storeFile = kFile
                    storePassword = storePass.trim()
                    keyAlias = kAlias.trim()
                    // In PKCS12, the key password must match the store password.
                    keyPassword = if (isPkcs12 || keyPass.trim().isEmpty()) {
                        storePass.trim()
                    } else {
                        keyPass.trim()
                    }

                    if (!sType.isNullOrEmpty()) {
                        storeType = sType.trim()
                    }
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
