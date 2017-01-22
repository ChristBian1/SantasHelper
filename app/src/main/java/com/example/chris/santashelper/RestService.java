package com.example.chris.santashelper;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;

import javax.net.ssl.HttpsURLConnection;

public class RestService extends Service {
    private final IBinder myBinder = new MyLocalBinder();
    public RestService() {
    }

    public class MyLocalBinder extends Binder
    {
        RestService getService()
        {
            return RestService.this;
        }
    }

    public String  performPostCall(String requestURL,
                                   HashMap<String, String> postDataParams) {


    }

    private String getPostDataString(HashMap<String, String> params) throws UnsupportedEncodingException {
        if(params==null)
            return "";
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for(Map.Entry<String, String> entry : params.entrySet()){
            if (first)
                first = false;
            else
                result.append("&");

            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
        }

        return result.toString();
    }
    @Override
    public IBinder onBind(Intent intent) {
        return myBinder;
    }
}
