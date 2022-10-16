# discord-emoji-export

Site for exporting emojis from any discord server you are in.

## Features

* Browse all emojis in server
* Download all emojis in ZIP archive
* Download all emojis as JSON (with links to emojis)

## How to get Discord token

### Using network tab

* Open development console (`F12` or `Ctrl + Shift + I`)
* Switch channel or server
* Go to Network tab
* Turn on XHR filter
* Select any request
* Find authorization header

![Network](./static/images/network.png)

### Using application tab (browser only)

* Open development console (`F12` or `Ctrl + Shift + I`)
* Go to Application tab
* Select local storage
* Search for `token` key

![Storage](./static/images/application.png)

## JSON format

```json
{
    "guildName": "<name>",
    "guildID": "<id>",
    "emojis": [
        {
            "name": "<name>",
            "id": "<id>",
            "identifier": "<a?>:<name>:<id>",
            "url": "https://cdn.discordapp.com/emojis/<id>.<png|gif>"
        },
        ...
}

```
