package com.example.chris.santashelper;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import org.w3c.dom.Text;

public class CreateGroup extends AppCompatActivity {

    TextView usernameText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_group);

        usernameText = (TextView) findViewById(R.id.usernameText);
        Intent loginIntent = getIntent();
        usernameText.setText("Welcome, "+loginIntent.getStringExtra("username"));
    }
}
