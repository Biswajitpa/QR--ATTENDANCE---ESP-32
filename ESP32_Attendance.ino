#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>

// Replace with your Wi-Fi credentials
const char* ssid = "Raj";
const char* password = "12345678";

// Replace with your PC's local IP running backend
const char* backendURL = "http://192.168.1.100:5000";

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected! IP: ");
  Serial.println(WiFi.localIP());

  // Mount LittleFS
  if(!LittleFS.begin(true)){
    Serial.println("Error mounting LittleFS");
    return;
  }

  // Serve static files from LittleFS
  server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

  // Example API endpoint for ESP32 (optional)
  server.on("/ping", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "ESP32 online!");
  });

  // Start server
  server.begin();
  Serial.println("ESP32 Web Server started");
}

void loop() {
  // Nothing required; AsyncWebServer handles everything
}
