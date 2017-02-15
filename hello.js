const TelegramBot = require('node-telegram-bot-api');
const token = '356035956:AAGmxedzO5wsPDngB7lKKmwUgNkaVAElV7U';
const bot = new TelegramBot(token, {polling: true});

var main_question = {
    title: 'Привет:)! Я ваш личный Bot. С помощю меня вы можете узнать цены и заказать Пиццы и Напитки. Выберите то что желаете?',
    buttons: [
        [{text: 'Пицца', callback_data: '0'}],
        [{text: 'Напитки', callback_data: '1'}]
    ]
}

var pizza_info = {
    title: 'У нас есть 8 видов пиццы. Теперь выберите любую пиццу',
    buttons: [
        [{text: 'SPICY CURRY', callback_data: '0_0', img: "./img/pizza/small_spacy.png", price: 1400 ,caption: "Яркая смесь овощей, куриного филе и соуса из пряных специй слились воедино на тонком хрустящем тесте в жаркой композиции «Spicy Curry»."}],
        [{text: 'ГАВАЙСКАЯ', callback_data: '0_1', img: "./img/pizza/pizza6.png", price: 1400, caption: "Представьте экзотические острова, попробовав Гавайскую пиццу с томатным соусом, сыром 'Моцарелла', с говядиной и ломтиками ананаса, приготовленная специально для Вас!"}],
        [{text: 'BBQ', callback_data: '0_2', img: "./img/pizza/pizzanew.png", price: 1400, caption: "Почувствуйте аромат пикника. Великолепное сочетание сыра 'Моцарелла' с Пепперони (колбаса), говядиной, луком и соусом 'Барбекю'."}],
        [{text: 'ВЕГЕТАРИАНА', callback_data: '0_3', img: "./img/pizza/veg_small.png", price: 1350, caption: "Попробуйте самые свежие овощи в Вегетарианской пицце с маслинами и сыром."}],
        [{text: 'СУПЕР СУПРИМ', callback_data: '0_4', img: "./img/pizza/sup_small.png", price: 1400, caption: "Удивитесь разнообразием начинки, попробовав пиццу Супер Суприм с томатным соусом, сыром 'Моцарелла', пепперони (колбаса), говядиной, грибами, луком, маслинами и болгарским перцем."}],
        [{text: 'ПЕППЕРОНИ', callback_data: '0_5', img: "./img/pizza/pizzanew2.png", price: 1400, caption: "Разделите с друзьями пиццу с колбасой пепперони, томатным соусом и сыром 'Моцарелла'."}],
        [{text: 'КУРИНАЯ', callback_data: '0_6', img: "./img/pizza/kur_small.png", price: 1400, caption: "Отметьте аромат нежнейшего филе жареного цыпленка с томатным соусом, болгарским перцем, луком, свежими помидорами и сыром 'Моцарелла'."}],
        [{text: 'МАРГАРИТА', callback_data: '0_7', img: "./img/pizza/pizza7.png", price: 1150, caption: "Маргарита с томатным соусом и сыром 'Моцарелла'"}],
    ]
}

bot.onText(/\/start/, function (msg, match) {
    mainQuestion(msg);
});

function mainQuestion(msg){
    var arr = main_question;
    var text = arr.title;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: arr.buttons,
            parse_mode: 'Markdown'
        })
    };
    chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    bot.sendMessage(chat, text, options);
}

function pizzaQuestion(msg){
    var arr = pizza_info;
    var text = arr.title;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: arr.buttons,
            parse_mode: 'Markdown'
        })
    };
    chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    bot.sendMessage(chat, text, options);
}

bot.on('callback_query', function (msg) {
    //console.log(msg);
    var answer = msg.data.split('_');
    if(answer.length==1) {
        if (answer[0] == "0") {
            pizzaQuestion(msg);
        } else if (answer[0] == "1") {
            bot.sendMessage(msg.from.id, 'Ответ drinks ❌');
        }
    } else {
        if(parseInt(answer[0])==0){
            var arr = pizza_info.buttons[parseInt(answer[1])][0];
            var imgPath = arr.img;
            var cap = arr.caption;
            var price = arr.price;
            bot.sendPhoto(msg.from.id, imgPath,{caption: cap+"\nЦена: " + price});
        } else if(parseInt(answer[0])==1){
            bot.sendMessage(msg.from.id, 'Drinks not Set ❌');
        }

    }
});