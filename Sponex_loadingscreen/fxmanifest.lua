fx_version 'cerulean'
description "Loadingscreen script Sponex"
games { 'gta5' }
lua54 "yes"

author 'Sponex(digitalranger)'
description 'Discord : https://discord.gg/cDqft7nw43'
version '1.1.1'

loadscreen 'index.html'
loadscreen_manual_shutdown 'no'
client_script 'client.lua'
server_script 'server.lua'
loadscreen_cursor 'yes'

files {
    'index.html',
    'css/style.css',
    'script/main.js',
    'logo/logo.png',
    'song/*',
    'img/*',
    'video/*'
}
