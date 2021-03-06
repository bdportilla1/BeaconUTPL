package com.example.BeaconUtpl.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;


@Service
public class FirebaseInitialize {
	
	@PostConstruct
	public void initialize() throws IOException {
		
		FileInputStream serviceAccount = new FileInputStream("./service.json");
		FirebaseOptions options = new FirebaseOptions.Builder()
				  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
				  .setDatabaseUrl("https://beaconinformation-aed2b.firebaseio.com")
				  //.setStorageBucket("beaconinformation-aed2b.appspot.com/")
				  .build();

		FirebaseApp.initializeApp(options);
	
	}
	
}
