package com.example.chris.santashelper;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

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
        if (data != null) {
            s = data.getPathSegments();
            String sum = "";
            for (String e : s) {
                sum += e + "\n";
            }
            ((TextView) findViewById(R.id.textView)).setText(sum);
        } else {
            ((TextView) findViewById(R.id.textView)).setText("No data was found in the intent");
        }
    }

    public void goToCreateGroup(View view)
    {
        username = (EditText) findViewById(R.id.usernameInput);
        Intent intent = new Intent(this,CreateGroup.class);
        intent.putExtra("username",username.getText().toString());
        startActivity(intent);
    }


}
