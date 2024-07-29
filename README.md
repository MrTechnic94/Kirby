# 🤖 Kirby

Kirby is a simple yet powerful 24/7 music bot for Discord, offering continuous music streaming to keep your server lively and entertained.

## 🔥 Features

- **Lightweight and Efficient**: Designed to use minimal resources while delivering top-notch performance.
- **Easy to Set Up**: Quick and straightforward configuration to get you started without hassle.
- **Rich Functionality**: Includes a variety of commands and features to enhance your music experience.
- **User-Friendly Interface**: Intuitive commands and controls for seamless interaction.

## 🔧 Requirements

- **Node.js** (v18 or newer)
- **Pnpm**
- **FFmpeg** or **ffmpeg-static** (not recommended for production)

## ❓ Getting Started

1. Install [Node.js](https://nodejs.org/), [Pnpm](https://pnpm.io/), and [FFmpeg](https://ffmpeg.org/) (or use `pnpm add ffmpeg-static` as an alternative).
2. Clone this repository:

    ```bash
    git clone https://github.com/your_username/kirby-bot.git
    cd kirby-bot
    ```

3. Update dependencies:

    ```bash
    pnpm update:all
    ```

4. Open the `.env` file and configure the database, bot token, and other required settings.
5. Start the bot using:

    ```bash
    pnpm start
    ```

    or if you prefer using `pm2` for process management:

    ```bash
    pnpm pm2
    ```

6. Explore all available bot commands with:

    ```bash
    k!help
    ```

    Enjoy the exceptional music experience Kirby provides!

## 🛟 Encountering Issues?

Join our [Discord server](https://discord.gg/srKgcNBn8E) for support and assistance. We’re here to help!
