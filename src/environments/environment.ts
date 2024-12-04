interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const environment: { production: boolean; firebaseConfig: FirebaseConfig } = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAAK9dtAudwSTpAAQDUw6J8dIWQabySuPE",
    authDomain: "pawfeast-f5239.firebaseapp.com",
    projectId: "pawfeast-f5239",
    storageBucket: "pawfeast-f5239.appspot.com",
    messagingSenderId: "355936949784",
    appId: "1:355936949784:web:18d4b02367d492a74d956d",
  },
};
