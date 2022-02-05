import axios from 'axios';
import dotenv  from 'dotenv';
import cron from 'node-cron';

dotenv.config();

async function getDadJoke() {
    try {
        const res = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'User-Agent': 'Discord Dad Joke Webhook (gusvano@gmail.com)',
                'Accept': 'application/json'
            }
        });
        return res.data.joke;
    } catch (err) {
        console.error(err);
    }
}

async function postDadJokeDiscord() {
    const joke = await getDadJoke();

    const data = {
        content: joke,
        username: 'Big Booty Dad',
        avatar_url: 'https://cdn4.iconfinder.com/data/icons/avatar-148/512/dad-father-people-avatar-man-512.png'
    };

    try {
        const webhook = process.env.DISCORD_WEBHOOK;
        await axios.post(webhook, data);
    } catch (err) {
        console.error(err);
    }
}

cron.schedule('0 7,12,17 * * *', () => {
    const delay = (Math.floor(Math.random() * 240)) * 60 * 1000;
    console.log(`Sleeping for ${delay}ms`);
    setTimeout(postDadJokeDiscord, delay);
});
