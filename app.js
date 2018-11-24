console.log("hi");

const tg_token = "780094019:AAHosBJLc3JIUeGyNIKsz3KMy8tVerrmLYo";

const Telegraf = require('telegraf');
let storage = require("/Users/Sonya/Documents/LMHack/storage");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

let general_articles = ['https://telegra.ph/Kak-sohranit-horoshie-otnosheniya-s-sosedyami-vo-vremya-remonta-11-24', 'https://telegra.ph/Plan-remonta-svoimi-rukami-11-24'];
let video_links = [];


const bot = new Telegraf(tg_token);
bot.start((ctx) => {
    storage.setUser(ctx.from.id, ctx.from.first_name, ctx.from.username);
    console.log(storage.getUsername(ctx.from.id));
    return ctx.reply('Здравствуйте, ' + ctx.from.first_name + '! Вы уже определились со стилем вашей новой квартиры?', Markup
        .keyboard(['Да', 'Нет'])
        .oneTime()
        .resize()
        .extra()
    );
});

bot.hears('Да', ({ reply }) =>
    reply ("Круто!", Markup
        .keyboard(['Составить план ремонта', 'Советы', 'Главное меню'])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Составить план ремонта', ({ reply }) =>
    reply ("С чего вам нужно начать?", Markup
        .keyboard(["⚫ Черновые работы", "⚪ Чистовые работы", "🖼 Декор", "🔙 Вернуться"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("🔙 Вернуться", ({ reply }) =>
    reply ("Готовы составить план ремонта?", Markup
        .keyboard(['Составить план ремонта', 'Советы', 'Главное меню'])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('⚫ Черновые работы', ({ reply }) =>
    reply ("Выберите тип", Markup
        .keyboard(["Штукатурка", "🔙 К началу планирования"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("Штукатурка", ({ reply }) =>
    reply('Штукатурка (итал. stuccatura, от stucco «гипс, известь, алебастр») — отделочный слой, образованный затвердевшей строительной смесью, а также сама эта смесь.',
        Extra.load({ caption: ''})
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.urlButton('Купить', 'https://m.leroymerlin.ru/search/?q=%D0%A8%D1%82%D1%83%D0%BA%D0%B0%D1%82%D1%83%D1%80%D0%BA%D0%B0'),
                    m.callbackButton('Советы', 'plaster_advice'),
                    m.urlButton('Школа ремонта', 'https://shkola-remonta.leroymerlin.ru/kak-shtukaturit-steny/?event=10405')
                ])
            )
    )
);

bot.action('plaster_advice', (ctx) =>
    ctx.reply('https://telegra.ph/Vyravnivanie-sten-11-24',
        Extra.load({ caption: '' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton("💚 Добавить в избранное", 'favourites', storage.addFavourite(ctx.from.id, 'Черновые работы', 'https://telegra.ph/Vyravnivanie-sten-11-24'))
                ])
            )
        )
);

bot.hears('⚪ Чистовые работы', ({ reply }) =>
    reply ("Выберите тип", Markup
        .keyboard(["Потолок", "🔙 К началу планирования"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("Потолок", ({ reply }) =>
    reply('Потолок — нижняя часть ограждающей конструкции, ограничивающей помещение сверху.',
        Extra.load({ caption: ''})
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.urlButton('Купить', 'https://m.leroymerlin.ru/search/?q=%D0%9F%D0%BE%D1%82%D0%BE%D0%BB%D0%BE%D0%BA'),
                    m.callbackButton('Советы', 'ceiling_advice'),
                    m.urlButton('Школа ремонта', 'https://shkola-remonta.leroymerlin.ru/kak-shtukaturit-steny/?event=10405')
                ])
            )
    )
);

bot.action('ceiling_advice', (ctx) =>
      ctx.reply('https://telegra.ph/Kak-kleit-potolochnuyu-plitku-11-24',
          Extra.load({ caption: '' })
              .markdown()
              .markup((m) =>
                  m.inlineKeyboard([
                      m.callbackButton("💚 Добавить в избранное", 'favourites', storage.addFavourite(ctx.from.id, 'Чистовые работы', 'https://telegra.ph/Kak-kleit-potolochnuyu-plitku-11-24'))
                  ])
              )
      )
);


bot.hears('🖼 Декор', ({ reply }) =>
    reply ("Выберите тип", Markup
        .keyboard(["Балкон", "🔙 К началу планирования"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("Балкон", ({ reply }) =>
    reply('Балко́н (фр. balcon, с древневерхненемецкого balko «балка») в архитектуре — разновидность террасы: площадка с перилами, укреплённая на выступающих из стены балках.',
        Extra.load({ caption: ''})
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.urlButton('Идеи', 'https://kazan.leroymerlin.ru/proekty/balkon/'),
                    m.callbackButton('Советы', 'balcony_advice'),
                ])
            )
    )
);

bot.action('balcony_advice', (ctx) =>
    ctx.reply('https://telegra.ph/Novaya-zhizn-balkona-11-24',
        Extra.load({ caption: '' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton("💚 Добавить в избранное", 'favourites', storage.addFavourite(ctx.from.id, 'Декор', 'https://telegra.ph/Novaya-zhizn-balkona-11-24'))
                ])
            )
    )
);

bot.hears("🔙 К началу планирования", ({ reply }) =>
    reply ("С чего вам нужно начать?", Markup
        .keyboard(['⚫ Черновые работы', '⚪ Чистовые работы', '🖼 Декор', "🔙 Вернуться"])
        .oneTime()
        .resize()
        .extra()
    )
);


bot.hears('Советы', (ctx) =>
    general_articles.forEach(function(link) {
        ctx.reply(link,
            Extra.load({ caption: ""})
                .markdown()
                .markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton("💚 Добавить в избранное", 'favourites', storage.addFavourite(ctx.from.id, 'Общие советы', link))
                    ])
                )
        );
    })
);

bot.action("favourites", (ctx, fn) => {
    ctx.answerCbQuery('Добавлено!').then(() => fn());
    console.log(storage.getUsername(ctx.from.id));
});

bot.hears('Главное меню', ({ reply }) =>
    reply("Главное меню", Markup
        .keyboard(["Вдохновение", "Мой Moodboard", "Избранное", "Планировать ремонт"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Планировать ремонт', ({ reply }) =>
    reply ("Начнём?", Markup
        .keyboard(['Составить план ремонта', 'Советы', 'Главное меню'])
        .oneTime()
        .resize()
        .extra()
));

bot.hears('Нет', ({ reply }) =>
    reply ("Готовы вдохновиться?", Markup
        .keyboard(["Вдохновение", "Закончил вдохновляться"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears("Закончил вдохновляться", ({ reply }) =>
    reply("Главное меню", Markup
        .keyboard(["Вдохновение", "Мой Moodboard", "Избранное", "Планировать ремонт"])
        .oneTime()
        .resize()
        .extra()
    )
);

bot.hears('Вдохновение', ({ reply }) =>
    reply('Выберите комнату', Markup
        .keyboard(['Детская', "Закончил вдохновляться"])
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
            .keyboard(['Кухня', 'Детская', 'Закончил вдохновляться'])
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
        .keyboard(['🌸 Нежный', '🎪 Яркий', "Закончил вдохновляться"])
        .oneTime()
        .resize()
        .extra()
    )
});

bot.action("moodboard", (ctx, fn) => {
    ctx.answerCbQuery('Добавлено!').then(() => fn());
    console.log(storage.getUsername(ctx.from.id));
});

bot.hears("Мой Moodboard", (ctx) => {
    let existing_room_names = storage.getMoodboardRoomNames(ctx.from.id);
    console.log(existing_room_names);
    let button_names = existing_room_names.push("Закончил вдохновляться");
    return ctx.reply("Выберите комнату", Markup
        .keyboard(existing_room_names)
        .oneTime()
        .resize()
        .extra()
    )}
);

bot.hears('Dream-Детская', (ctx) => {
    let pic_links = storage.getMoodboardPics(ctx.from.id, 'Dream-Детская');
    console.log("Links to Moodboard pics: " + pic_links);
    let final_array = [];
    pic_links.forEach(function(link) {
        final_array.push({'media': { source: link }, 'caption': '', 'type': 'photo'})
    });
    console.log("media group: " + final_array);
    return ctx.replyWithMediaGroup(final_array);
});

bot.hears("Избранное", (ctx) => {
    let existing_steps_names = storage.getFavouriteStepNames(ctx.from.id);
    console.log(existing_steps_names);
    existing_steps_names.push('Главное меню');
    return ctx.reply("Выберите категорию", Markup
        .keyboard(existing_steps_names)
        .oneTime()
        .resize()
        .extra()
    )
});

bot.hears('Декор', (ctx) => {
    let links = storage.getFavourites(ctx.from.id, 'Декор');
    console.log("Links to favourites: " + links);
    links.forEach(function(link) {
        ctx.reply(link);
    })
});

bot.hears('Черновые работы', (ctx) => {
    let links = storage.getFavourites(ctx.from.id, 'Черновые работы');
    console.log("Links to favourites: " + links);
    links.forEach(function(link) {
        ctx.reply(link);
    })
});

bot.hears('Чистовые работы', (ctx) => {
    let links = storage.getFavourites(ctx.from.id, 'Чистовые работы');
    console.log("Links to favourites: " + links);
    links.forEach(function(link) {
        ctx.reply(link);
    })
});

bot.hears('Общие советы', (ctx) => {
    let links = storage.getFavourites(ctx.from.id, 'Общие советы');
    console.log("Links to favourites: " + links);
    links.forEach(function(link) {
        ctx.reply(link);
    })
});

bot.startPolling();

