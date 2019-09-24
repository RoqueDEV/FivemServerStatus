resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'
description "Queue for FiveM FX Servers"
version "1.1.0"

ui_page 'NUI/index.html'

server_scripts {
"Newtonsoft.Json.dll",
"Server_Queue.net.dll"
}

client_scripts {
"Client_Queue.net.dll"
}

files {
'NUI/index.html',
'NUI/main.css',
'NUI/main.js',
"Newtonsoft.Json.dll"
}