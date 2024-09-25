const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Замените на ваш токен
const TOKEN = 'YOUR_DISCORD_BOT_TOKEN';

// Обработчик события готовности бота
client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Обработчик события, когда пользователь присоединяется к серверу
client.on(Events.GuildMemberAdd, async (member) => {
    const channel = member.guild.channels.cache.get('1288344364946428016');
    if (!channel) return;

    // Первое сообщение с тегом пользователя
    await channel.send(`Приветствую, ${member}! Прочитай правила: https://rulesvodyateli.netlify.app/`);

    // Устанавливаем таймер на 25 секунд
    setTimeout(async () => {
        // Отправка второго сообщения о получении роли
        const role = member.guild.roles.cache.get('1288535464839479307');
        if (role) {
            await member.roles.add(role);
            await channel.send(`Пользователь ${member} ознакомился с правилами и получил роль <@&1288535464839479307>`);
        }
    }, 30000); // 25 секунд
});

// Запускаем Express сервер
app.get('/track-visit', (req, res) => {
    // Логика обработки перехода по ссылке
    console.log('Пользователь перешел по ссылке');
    res.sendStatus(200); // Ответ 200 OK
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Вход в Discord
client.login('MTI4ODUxMjcyNTE1MTkxMTkzNg.GDEcyG.rFUiaN4CAigYm03b5FoQCASGVVL1vP85_C3Cm0');