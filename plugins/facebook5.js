//Dont delete this credit!!!
//Script by ShirokamiRyzen

import fetch from 'node-fetch'
import { fbdown } from '../lib/scrape.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw 'تحميل فيديوهات الفيسبوك بجودات متعددة مثال \n\n*.facebook5* (رابط الفيديو) ';
    const sender = m.sender.split(`@`)[0];

    m.reply(wait)

    try {
        const url = args[0];
        const result = await fbdown(url);

        if (!result) {
            throw '*وقع مشكل اثناء استيراد معلومات الفيديو*';
        }

        const videoBuffer = await fetch(result.hdLink).then(res => res.buffer());

        const caption = `
*عنوان الفيديو*: ${result.title}

${result.description}

*جودة متوسطة*:\n ${result.sdLink}
*جودة عالية*:\n ${result.hdLink}
`;

        await conn.sendMessage(
            m.chat, {
            video: videoBuffer,
            mimetype: "video/mp4",
            fileName: `video.mp4`,
            caption: `هذا هو الفيديو الذي طلبته  @${sender} \n${caption}`,
            mentions: [m.sender],
        }, {
            quoted: m
        },
        );
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `وقعت مشكلة راسل \ninstagram.com/matrix__tv5`, m);
    }
};

handler.help = ['facebook5']
handler.tags = ['downloader']
handler.command = /^(facebook5)$/i


export default handler
