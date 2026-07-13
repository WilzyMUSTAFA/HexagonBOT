const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Render'ın botu kapatmaması için gereken sahte web sunucusu Portu
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('Bot aktif! Sunucu acik tutuluyor.')
})
app.listen(PORT, () => {
    console.log(`Web sunucusu ${PORT} portunda dinleniyor...`)
})

function createBot() {
    const bot = mineflayer.createBot({
        host: 'HexagonTR.mcsh.io', // <--- BURAYA MCSH.IO IP'SINI YAZ (Tırnakları kaldırma)
        port: 25565,                         // <--- BURAYA SUNUCU PORTUNU YAZ (Sadece sayı)
        username: '724_Aktif_Bot',           // <--- Botun oyundaki adı
        version: '1.20.1'                    // <--- Sunucunun Minecraft sürümü
    })

    bot.on('spawn', () => {
        console.log('Bot basariyla sunucuya girdi! Sunucu artık kapanmayacak.')
    })

    bot.on('end', () => {
        console.log('Botun sunucuyla baglantisi koptu. 10 saniye sonra tekrar denenecek...')
        setTimeout(createBot, 10000)
    })

    bot.on('error', (err) => {
        console.log('Bir hata olustu: ', err.message)
    })
}

// Botu baslat
createBot()
  
