package com.farhan.atlas;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AtlasPhoneControlPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
