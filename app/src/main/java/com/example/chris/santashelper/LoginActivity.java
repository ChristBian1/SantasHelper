package com.example.chris.santashelper;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.HashMap;
import java.util.List;

public class LoginActivity extends AppCompatActivity {

    EditText username;
    List<String> s;
    RestService myService;
    Boolean isBound=false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Intent intent = getIntent();
            String action = intent.getAction();
            Uri data = intent.getData();
        if(data!=null) {
            s = data.getPathSegments();
            String sum = "";
            for (String e : s) {
                sum += e + "\n";
            }
            ((TextView) findViewById(R.id.textView)).setText(sum);
        }
        Intent i =new Intent(this, RestService.class);
        bindService(i,myConnection, Context.BIND_AUTO_CREATE);
    }

    public void goToCreateGroup(View view)
    {
        username = (EditText) findViewById(R.id.usernameInput);
        String s = myService.performPostCall("http://ec2-54-186-119-141.us-west-2.compute.amazonaws.com:8080/generateSession",null);
        Log.i("postResponse",s);
        Intent intent = new Intent(this,CreateGroup.class);
        intent.putExtra("username",username.getText().toString());
        startActivity(intent);
    }

    private ServiceConnection myConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {

            RestService.MyLocalBinder binder = (RestService.MyLocalBinder) service;
            myService= binder.getService();
            isBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            isBound = false;
        }
    };
}
