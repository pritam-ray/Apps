export default {
  expo: {
    name: "MIKA",
    slug: "MIKA",
    version: "1.0.5",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    android: {
      package: "com.pritam.mika",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    extra: {
      eas: {
        projectId: "c9707979-f9d3-48d8-ad2d-d105c8b64f63y" 
      }
    },
    owner: "pritamray",
    cli: {
      appVersionSource: "remote"
    }
  }
}