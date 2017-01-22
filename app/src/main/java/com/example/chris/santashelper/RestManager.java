package com.example.chris.santashelper;

/**
 * Created by chris on 1/21/2017.
 */
import android.os.AsyncTask;
import android.util.Log;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class RestManager extends AsyncTask<String,String,String>{

    private static final String TAG ="RestManager";
    URL url;
    public RestManager(String url)
    {
        try {
            this.url = new URL(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected String doInBackground(String... params) {
        String responseString = null;
        try {
            URL url = new URL("www.google.com");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            if(conn.getResponseCode() == HttpsURLConnection.HTTP_OK){
                // Do normal input or output stream reading
                Log.i(TAG,"Success");
            }
            else {
                responseString = "FAILED"; // See documentation for more info on response handling
            }
        } catch (IOException e) {
            //TODO Handle problems..
        }
        return responseString;
    }
}
