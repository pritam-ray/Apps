export default {
  expo: {
    name: 'Travel Planner 2',
    slug: 'Travel-Planner-2',
    version: '1.0.5',
    orientation: 'portrait',
    icon: './assets/logo.jpg',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/logo.jpg',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    android: {
      package: 'com.yourcompany.travelplanner',
      adaptiveIcon: {
        foregroundImage: './assets/logo.jpg',
        backgroundColor: '#ffffff'
      },
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'CAMERA',
        'WRITE_EXTERNAL_STORAGE'
      ]
    },
    extra: {
      eas: {
        projectId: "d73b7983-b133-455a-8007-c2d14808b9d0"
      }
    },
    plugins: [

    ]
  }
};