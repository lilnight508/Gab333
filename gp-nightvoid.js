

```js
import fs from 'fs'

async function handler(m, { isBotAdmin, isOwner, text, conn }) {
  if (!isBotAdmin) return m.reply('ⓘ Devo essere admin per poter funzionare.')

  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  if (!mention) return m.reply('ⓘ Menziona la persona da rimuovere.')

  const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
  if ([ownerBot, conn.user.jid, m.sender].includes(mention)) return m.reply('❌ Operazione non consentita.')

  const groupMetadata = conn.chats[m.chat].metadata
  const participants = groupMetadata.participants
  const utente = participants.find(u => conn.decodeJid(u.id) === mention)
  if (utente?.admin) return m.reply('⚠️ L\'utente è admin o owner.')

  await m.reply('🌑 NightVoid si sta aprendo...')
  await conn.sendMessage(m.chat, { text: '☁️ Oscurità in arrivo...' }, { quoted: m })

  const fake = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: '𝐍𝐢𝐠𝐡𝐭𝐕𝐨𝐢𝐝 𝐢𝐧 𝐚𝐳𝐢𝐨𝐧𝐞...',
        jpegThumbnail: await (await fetch('https://telegra.ph/file/ed97f8c272e8e88f77cc0.png')).buffer(),
      }
    },
