console.log("hi");

const tg_token = "780094019:AAHosBJLc3JIUeGyNIKsz3KMy8tVerrmLYo";

const Telegraf = require('telegraf');
let storage = require("/Users/Sonya/Documents/LMHack/storage");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

let article_links = [];
let video_links = [];


const bot = new Telegraf(tg_token);
bot.start((ctx) => {
    storage.setUser(ctx.from.id, ctx.from.first_name, ctx.from.username);
    console.log(storage.getUsername(ctx.from.id));
    return ctx.reply('Здравствуйте, ' + ctx.from.first_name + '! Вы уже определились со стилем?', Markup
        .keyboard(['Да', 'Нет'])
        .oneTime()
        .resize()
        .extra()
    );
});

bot.hears('Да', ({ reply }) =>
    reply ("Круто!", Markup
        .keyboard(['Составить план ремонта', 'Советы', 'В начало'])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Составить план ремонта', ({ reply }) =>
    reply ("", Markup
        .keyboard([])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Советы', ({ reply }) =>
    reply ("", Markup
        .keyboard([])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Нет', ({ reply }) =>
    reply ("Готовы вдохновиться?", Markup
        .keyboard(["Вдохновение", "Передумал вдохновляться"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("Передумал вдохновляться", ({ reply }) =>
    reply("Главное меню", Markup
        .keyboard(["Вдохновение", "Moodboard", "Избранное", "План ремонта"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Вдохновение', ({ reply }) =>
    reply('Выберите комнату', Markup
        .keyboard(['Кухня', 'Детская', "Передумал вдохновляться"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Детская', ({ reply }) =>
    reply('Какой стиль вам нравится?', Markup
        .keyboard(['🌸 Нежный', '🎪 Яркий', '🔙 К выбору комнаты'])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('🔙 К выбору комнаты', ({ reply }) =>
        reply('Выберите комнату', Markup
            .keyboard(['Кухня', 'Детская'])
            .oneTime()
            .resize()
            .extra()
        )
);

bot.hears('🌸 Нежный', ( ctx ) => {
    return ctx.replyWithPhoto({ source: 'pics/children/pink/room.jpg' },
        Extra.load({ caption: "Идеальный порядок в детской"})
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('➕ Moodboard', 'moodboard', storage.addMoodboardPic(ctx.from.id, 'Dream-Детская', 'pics/children/pink/room.jpg')),
                    m.urlButton("🛍 Товары", 'https://kazan.leroymerlin.ru/proekty/idealnyy-poryadok-v-detskoy/'),
                    m.callbackButton("🔙 Назад", 'return_to_rooms_mood')
                ])
            )
    )
});

bot.hears('🎪 Яркий', ( ctx ) => {
    return ctx.replyWithPhoto({source: 'pics/children/fun/room.jpg'},
        Extra.load({caption: "Чем старше становится ребёнок, тем важнее правильно зонировать детскую комнату с учётом его интересов и распорядка дня."})
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('➕ Moodboard', 'moodboard', storage.addMoodboardPic(ctx.from.id, 'Dream-Детская', 'pics/children/fun/room.jpg')),
                    m.urlButton("🛍 Товары", 'https://kazan.leroymerlin.ru/proekty/detskaya-v-yarkih-tonah/'),
                    m.callbackButton("🔙 Назад", 'return_to_rooms_mood')
                ])
            )
    )
});

bot.action('return_to_rooms_mood', ({ reply }) => {
    reply('Какой стиль вам нравится?', Markup
        .keyboard(['🌸 Нежный', '🎪 Яркий', "Передумал вдохновляться"])
        .oneTime()
        .resize()
        .extra()
    )
});

bot.action("moodboard", (ctx, fn) => {
    ctx.answerCbQuery('Добавлено!').then(() => fn());
    console.log(storage.getUsername(ctx.from.id));
});

bot.hears("Moodboard", (ctx) => {
    existing_room_names = storage.getMoodboardRoomNames(ctx.from.id);
    console.log(existing_room_names);
    button_names = existing_room_names.push("Передумал вдохновляться");
    return ctx.reply("Выберите комнату", Markup
        .keyboard(existing_room_names)
        .oneTime()
        .resize()
        .extra()
    )}
);


bot.startPolling();

