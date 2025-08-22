require('dotenv').config()
const { exec } = require("child_process");
const { Client, Intents, MessageEmbed } = require('discord.js');
const https = require("https");
// const Database = require("@replit/database");
// const db = new Database();
// const repl = require('repl')
// repl.start({
//   input: process.stdin,
//   output: process.stdout
// })
// process.on('beforeExit', (code) => {
//   process.nextTick(function() {
//     repl.start({
//       input: process.stdin,
//       output: process.stdout
//     });
//   });
// });
const client = new Client(
  {
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
  }
);

client.options.http.api = "https://discordapp.com/api"

var stdic = {};
var medic = {};

var scripts = {
  "Trouble with Violets": "https://botcscripts.com/script/136/1.0.0/download",
  "Pies Baking": "https://botcscripts.com/script/1774/0.1.0/download",
  "Catfishing": "https://botcscripts.com/script/3/11.1.0/download",
  "With Greater Power": "https://botcscripts.com/script/215/4.0.0/download",
  "Hide and Seek": "https://botcscripts.com/script/69/4.0.0/download",
  "Outed": "https://botcscripts.com/script/197/8.0.0/download",
  "No Rolls Barred": "https://botcscripts.com/script/258/1.0.1/download",
  "TB + Fun": "https://botcscripts.com/script/6994/1.0.0/download",
  "Ricochet": "https://botcscripts.com/script/5554/1.0.0/download",
  "Uncertain Death": "https://botcscripts.com/script/68/1.0.1/download",
  "Where are the outsiders??": "https://botcscripts.com/script/214/1.2.0/download",
  "Everyone can play": "https://botcscripts.com/script/1945/1.0.2/download",
  "Tax Fraud": "https://botcscripts.com/script/189/2.3.6/download",
  "Boozling": "https://botcscripts.com/script/173/9.0.0/download",
  "Darkest Before Dawn": "https://botcscripts.com/script/67/6.0.0/download",
  "42 Halloween": "https://botcscripts.com/script/6991/1.0.0/download",
  "Extension Cord": "https://botcscripts.com/script/42/5.1.0/download",
  "School of Alteration": "https://botcscripts.com/script/2256/1.0.0/download",
  "Lunar Eclipse": "https://botcscripts.com/script/312/1.6.0/download",
  "Word Around Town": "https://botcscripts.com/script/5395/1.1.0/download",
  "Poppyganda": "https://botcscripts.com/script/79/3.0.0/download",
  "Reptiles II - Lizards in the City": "https://botcscripts.com/script/445/1.2.0/download",
  "The Midnight Oasis": "https://botcscripts.com/script/104/3.8.0/download",
  "Poppyganda": "https://botcscripts.com/script/79/3.0.0/download",
  "Anyone for a Threesome?": "https://botcscripts.com/script/1839/1.0.0/download",
  "Strong, Independent Marionette": "https://botcscripts.com/script/3234/1.0.1/download",
  "Weak, Dependent Minion": "https://botcscripts.com/script/6995/1.0.0/download",
  "Storytold by Ben Burns": "https://botcscripts.com/script/6996/1.0.0/download",
};

var teensies = {
  "Laissez Un Faire": "https://botcscripts.com/script/76/1.0.0/download",
  "No Greater Joy": "https://botcscripts.com/script/77/1.0.0/download",
  "Vigormortis High School": "https://botcscripts.com/script/7/1.0.0/download",
  "Race to The Bottom": "https://botcscripts.com/script/5/1.0.0/download",
  "On Thin Ice": "https://botcscripts.com/script/4/1.0.0/download",
  "Whackamole": "https://botcscripts.com/script/361/1.0.0/download",
  "Spooky Tea": "https://botc-scripts.azurewebsites.net/script/106/2.0.1/download",
  "Late Night Drive By": "https://botc-scripts.azurewebsites.net/script/318/1.6.0/download"
};

var last_joke = -1

var last_compliment = -1
var last_insult = -1

var grim_serv = -1
var grim_link = -1
var grim_setter = -1

var grim_servs = []
var grim_links = []
var grim_setters = []

var next_game = []

var move_blacklist = []

var secret_polls = []

var nicks = []

var pinfo = []

var st_list = []
var stlc = 0;

var comps = [[3, 0, 1, 1],
[3, 1, 1, 1],
[5, 0, 1, 1],
[5, 1, 1, 1],
[5, 2, 1, 1],
[7, 0, 2, 1],
[7, 1, 2, 1],
[7, 2, 2, 1],
[9, 0, 3, 1],
[9, 1, 3, 1],
[9, 2, 3, 1]]

var timers = []

var lieu_id = '549986826794827786'

let roles_url = "https://raw.githubusercontent.com/nicholas-eden/townsquare/develop/src/roles.json"
let fabled_url = "https://raw.githubusercontent.com/nicholas-eden/townsquare/develop/src/fabled.json"
let jinxes = "https://media.discordapp.net/attachments/1031815607156490270/1148969672314720358/Jinxes_4.2.png\n(To see in better quality, right click and open in browser, or download the image)"//?width=621&height=473"

let new_roles = `[
  {
    "id": "8e",
    "sn": "knight",
    "edition": "experimental",
    "setup": false,
    "name": "Knight",
    "team": "townsfolk",
    "ability": "You start knowing 2 players that are not the Demon."
  },
  {
    "id": "fe",
    "sn": "steward",
    "edition": "experimental",
    "setup": false,
    "name": "Steward",
    "team": "townsfolk",
    "ability": "You start knowing 1 good player."
  },
  {
    "id": "a4",
    "sn": "vizier",
    "edition": "experimental",
    "setup": false,
    "name": "Vizier",
    "team": "minion",
    "ability": "All players know who you are. You can not die during the day. If good voted, you may choose to execute immediately."
  },
  {
    "id": "61",
    "sn": "organgrinder",
    "edition": "experimental",
    "setup": false,
    "name": "Organ Grinder",
    "team": "minion",
    "ability": "All players keep their eyes closed when voting & the vote tally is secret. Votes for you only count if you vote."
  },
  {
    "id": "63",
    "sn": "highpriestess",
    "edition": "experimental",
    "setup": false,
    "name": "High Priestess",
    "team": "townsfolk",
    "ability": "Each night, learn which player the Storyteller believes you should talk to most."
  },
  {
    "id": "1b",
    "sn": "Harpy",
    "edition": "experimental",
    "setup": false,
    "name": "Harpy",
    "team": "minion",
    "ability": "Each night, choose 2 players: tomorrow, the 1st player is mad that the 2nd is evil, or both might die."
  },
  {
    "id": "e2",
    "sn": "plaguedoctor",
    "edition": "experimental",
    "setup": false,
    "name": "Plague Doctor",
    "team": "outsider",
    "ability": "If you die, the Storyteller gains a not-in-play Minion ability."
  },
  {
    "id": "da",
    "sn": "villageidiot",
    "edition": "experimental",
    "setup": true,
    "name": "Village Idiot",
    "team": "townsfolk",
    "ability": "Each night, choose a player: you learn their alignment. [+0 to +2 Village Idiots. 1 of the extras is drunk]"
  },
  {
    "id": "11",
    "sn": "shugenja",
    "edition": "experimental",
    "setup": false,
    "name": "Shugenja",
    "team": "townsfolk",
    "ability": "You start knowing if your closest evil player is clockwise or anti-clockwise. If equidistant, this info is arbitrary."
  },
  {
    "id": "44",
    "sn": "hatter",
    "edition": "experimental",
    "setup": false,
    "name": "Hatter",
    "team": "outsider",
    "ability": "If you died today or tonight, the Minion & Demon players may choose new Minion & Demon characters to be."
  },
  {
    "id": "9d",
    "sn": "Kazali",
    "edition": "experimental",
    "setup": true,
    "name": "Kazali",
    "team": "demon",
    "ability": "Each night*, choose a player: they die. [You choose which players are which Minions. -? to +? Outsiders]"
  },
  {
    "id": "6f",
    "sn": "ojo",
    "edition": "experimental",
    "setup": false,
    "name": "Ojo",
    "team": "demon",
    "ability": "Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies."
  },
  {
    "id": "1a",
    "sn": "summoner",
    "edition": "experimental",
    "setup": true,
    "name": "Summoner",
    "team": "minion",
    "ability": "You get 3 bluffs. On the 3rd night, choose a player: they become an evil Demon of your choice. [No Demon]"
  },
  {
    "id": "08",
    "sn": "yaggababble",
    "edition": "experimental",
    "setup": false,
    "name": "Yaggababble",
    "team": "demon",
    "ability": "You start knowing a secret phrase. For each time you said it publicly today, a player might die."
  },
  {
    "id": "25",
    "sn": "ogre",
    "edition": "experimental",
    "setup": false,
    "name": "Ogre",
    "team": "outsider",
    "ability": "On your 1st night, choose a player (not yourself): you become their alignment (you don't know which) even if drunk or poisoned."
  },
  {
    "id": "63",
    "sn": "banshee",
    "edition": "experimental",
    "setup": false,
    "name": "Banshee",
    "team": "townsfolk",
    "ability": "If the Demon kills you, all players learn this. From now on, you may nominate twice per day and vote twice per nomination."
  }
]`

let new_fabled = `,
  {
    "id": "08",
    "sn": "bootlegger",
    "setup": false,
    "name": "Bootlegger",
    "team": "fabled",
    "ability": "This script has homebrew characters or rules."
  },
  {
    "id": "5c",
    "sn": "gardener",
    "setup": false,
    "name": "Gardener",
    "team": "fabled",
    "ability": "The Storyteller assigns 1 or more players' characters."
  },
  {
    "id": "8f",
    "sn": "ferryman",
    "setup": false,
    "name": "Ferryman",
    "team": "fabled",
    "ability": "On the final day, all dead players regain their vote token."
  }
]`

let new_jinxes = ""

let responding = true;
let running_cycle = false;

console.log(lieu_id, "ALRIGHT, STARTING UP!!!");

client.on('ready', function(e) {
  console.log(lieu_id, `Logged in as ${client.user.tag}!`)
})

async function count_pages(teensy) {
  let arr = []
  var dict = {}
  if (teensy) {
    dict = teensies
  }
  else {
    dict = scripts
  }
  arr = Array.from(Object.keys(dict))
  pages = parseInt(arr.length / 10);
  if (arr.length % 10 != 0) {
    pages += 1
  }
  return pages
}

async function scripts_to_txt(teensy, page) {
  var txt = ""
  var dict = {}
  let arr = []
  var pages = 0
  if (teensy) {
    dict = teensies
    arr = Array.from(Object.keys(teensies));
    pages = await count_pages(true)
    if (page > pages) {
      return "ERROR"
    }
    txt = "**Teensy Scripts (Page " + page + " of " + pages + "):**\n"
  }
  else {
    dict = scripts
    arr = Array.from(Object.keys(scripts));
    pages = await count_pages(false)
    if (page > pages) {
      return "ERROR"
    }
    txt = "**Scripts (Page " + page + " of " + pages + "):**\n\n"
  }
  let spdf = "";
  let sjson = "";
  let scrarr = null;
  if (teensy) {
    scrarr = Array.from(Object.keys(teensies));
  }
  else {
    scrarr = Array.from(Object.keys(scripts));
  }
  let line = "";
  for (var i = (page - 1) * 10; i < Math.min((page - 1) * 10 + 10, arr.length); i++) {
    // txt += i+1 +"- "+dict[arr[i]]+"\n";
    line = "";
    if (teensy) {
      sjson = teensies[scrarr[i]];
      spdf = teensies[scrarr[i]] + "_pdf";
    }
    else {
      sjson = scripts[scrarr[i]];
      spdf = scripts[scrarr[i]] + "_pdf";
    }
    line = (i + 1) + "- " + arr[i] + " ";
    line = line.padEnd(30, "-");
    line += " [**PDF**](" + spdf + ") / [**JSON**](" + sjson + ")\n";
    txt += line;
  }
  if (teensy) {
    // txt += "To get the link to a script's json/pdf use `*get t <id>`"
    if (page != pages) {
      txt += "\n### To go to the next page use `*teensy " + (page + 1) + "`"
    }
  }
  else {
    // txt += "To get the link to a script's json/pdf use `*get <id>`"
    if (page != pages) {
      txt += "\n### To go to the next page use `*scripts " + (page + 1) + "`"
    }
  }
  return txt
}

function defer() {

    let res = () => {};
    let rej = () => {};

    const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });

    promise.resolve = (value) => {
        res(value);
        return promise;
    };

    promise.reject = (reason) => {
        rej(reason);
        return promise;
    };

    return promise;

}

function createTimer(time) {

    const promise = defer();
    const timeout = setTimeout(() => promise.resolve(), time);

    promise.cancel = () => {
        promise.reject("cancelled");
        clearTimeout(timeout);
    };

    return promise;

}

async function find_consult(msg, categoryid) {
  let channels = msg.guild.channels.cache.filter(c => c.parentId == categoryid && c.type === 'GUILD_VOICE');
  for (const [channelID, channel] of channels) {
    // msg_user(lieu_id,channelID+"- "+channel.name.toLowerCase())
    if (channel.name.toLowerCase().indexOf("consult") != -1) {
      // msg_user(lieu_id,"JASKDFJLAKSDFJKLASJDFKLAJSDFKLAS");
      return channel
    }
  }
  return null
}

async function txt_compare(s1, s2) {
  if (s1 == s2) {
    return -100;
  }
  let c = 0;
  if (s1.length < s2.length) {
    let pos = s2.indexOf(s1);
    if (pos == 0) {
      return -75;
    }
    if (pos > 0) {
      return -25;
    }
    // if(s2.includes(s1)) {
    //   return 0;
    // }
    // msg_user(lieu_id,"TC1");
    let k = 0;
    for (var i = 0; i < s1.length && k < s2.length; i++) {
      if (s1[i] == s2[k]) {
        k += 1;
        c += 1;
      }
      else {
        k += 1;
        i -= 1;
      }
    }
    let tem = s1.length;
    let mintem = s1.length;
    k = 0;
    for (var i = 0; i < s1.length && k < s2.length; i++) {
      if (s1[i] == s2[k]) {
        tem -= 1;
        for (var j = k + 1; j < s2.length; j++) {
          if (i + j - k >= s1.length) {
            break;
          }
          if (s1[i + j - k] == s2[j]) {
            tem -= 1;
          }
          else {
            break;
          }
        }
        mintem = Math.min(mintem, tem);
        tem = s1.length;
      }
      k += 1;
    }
    c = Math.max(s1.length, s2.length) - Math.min(c, mintem);
  }
  else if (s1.length > s2.length) {
    let pos = s1.indexOf(s2);
    if (pos == 0) {
      return -10;
    }
    // msg_user(lieu_id,"TC2");
    let k = 0;
    for (var i = 0; i < s2.length && k < s1.length; i++) {

      if (s2[i] == s1[k]) {
        k += 1;
        c += 1;
      }
      else {
        k += 1;
        i -= 1;
      }
    }
    let tem = s1.length;
    let mintem = s1.length;
    k = 0;
    for (var i = 0; i < s2.length && k < s1.length; i++) {
      if (s2[i] == s1[k]) {
        tem -= 1;
        for (var j = k + 1; j < s1.length; j++) {
          if (i + j - k >= s2.length) {
            break;
          }
          if (s2[i + j - k] == s1[j]) {
            tem -= 1;
          }
          else {
            break;
          }
        }
        mintem = Math.min(mintem, tem);
        tem = s1.length;
      }
      k += 1;
    }
    c = Math.max(s1.length, s2.length) - Math.min(c, mintem);
  }
  else {
    // msg_user(lieu_id,"TC3");
    for (var i = 0; i < s1.length; i++) {
      // msg_user(lieu_id,s1[i] + " " + s2[i]);
      if (s1[i] == s2[i]) {
        c += 1;
      }
    }
    c = s1.length - c;
  }
  return c;
}

async function only_letters(s) {
  var s2 = (' ' + s).slice(1);
  for (var i = 0; i < s2.length; i++) {
    if (s2.charCodeAt(i) < 65 || (s2.charCodeAt(i) > 90 && s2.charCodeAt(i) < 97) || s2.charCodeAt(i) > 122) {
      s2 = s2.slice(0, i) + s2.slice(i + 1, s2.length);
      i -= 1;
    }
  }
  return s2;
}

async function match_role(name, json) {
  let n = await only_letters(name.trim().toLowerCase());
  let mii = 0;
  let mix = -1;
  for (var i = 0; i < json.length; i++) {
    let nn = await only_letters(json[i]["name"].trim().toLowerCase());
    let vv = await txt_compare(n, nn);
    if (mix == -1) {
      mix = vv;
    }
    else if (mix > vv) {
      mix = vv;
      mii = i;
    }
  }
  if (mix > 3) {
    return -1;
  }
  return mii;
}

async function find_target(msg, name) {
  let p = null
  const channels = msg.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');

  for (const [channelID, channel] of channels) {
    for (const [memberID, member] of channel.members) {/*console
log(member.displayName.trim().toLowerCase()+","+ name.trim().toLowerCase())*/

      if (member.displayName.trim().toLowerCase().indexOf(name.trim().toLowerCase()) > -1) {
        p = member.user
        break
      }
    }
  }
  return p
}

async function first_word(text) {
  let txt = "";
  for (var i = 0; i < text.length; i++) {
    if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) || (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122)) {
      txt += text[i];
    }
    else if (txt.length != 0) {
      return txt;
    }
  }
  return txt;
}

async function decide_night(msg, fw, cid) {
  let cs = msg.guild.channels.cache.filter(c => c.id != cid && c.type === "GUILD_CATEGORY");
  let cfw = "";
  if (fw.toLowerCase() == "ravenswood" && msg.guild.id == "840323781066489946") {
    for (const [channelID, channel] of cs) {
      cfw = await first_word(channel.name);
      // msg_user(lieu_id,cfw.toLowerCase()+" - "+channel.name);
      if (cfw.toLowerCase() == "cottages") {
        return channel
      }
    }
  }
  else {
    for (const [channelID, channel] of cs) {
      // msg_user(lieu_id,fw.toLowerCase()+" - "+channel.name);
      cfw = await first_word(channel.name);
      if (cfw.toLowerCase() == fw.toLowerCase()) {
        return channel
      }
    }
  }
  return null
}

async function shadow(msg, target) {
  if (msg.author.username === target.username) {
    if (msg.author.id != "297585199519105024") {
      await respond(msg, "```You want to shadow yourself? That's kinda sad :( but also you can't, Sorry!```")
    }
    else {
      await respond(msg, "```You can't follow yourself```")
    }
    return null
  }
  if (stdic[msg.author.username] == target.username) {
    await respond(msg, "```You are already shadowing " + target.username + "```")
    return null
  }
  if (medic[target.username] == -1 && msg.author.id != "297585199519105024") {
    await respond(msg, "```The person you are trying to shadow is in Do Not Disturb mode.```")
    return null
  }
  if (stdic[target.username] == msg.author.username) {
    await respond(msg, "```You can't shadow your own shadow!```")
    return null
  }
  let tid = msg.guild.members.cache.get(target.id).voice.channelId
  let tvc = msg.guild.channels.cache.get(tid)

  if (!tvc) {
    await respond(msg, "```" + target.username + " is not currently in a voice channel```")
    return null
  }
  if (!msg.member.voice.channel) {
    await respond(msg, "```Please join a voice channel first, and then use the command.```")
    return null
  }
  await msg.member.voice.setChannel(tvc.id).catch(e => { msg_user(lieu_id, "" + e); })
  // await client.moveMember(msg.member, msg.guild.channels.cache.find(c => c.id === tvc.id)[1])
  if (msg.author.id != "297585199519105024") {
    await respond(msg, "```You are now shadowing " + target.username + "```")
  }

  stdic[msg.author.username] = target.username
  if (medic[target.username] === undefined)//(Object.keys(medic).indexOf(target.username) == -1)
  {
    medic[target.username] = []
  }
  medic[target.username].push(msg.member)

  if (msg.author.id == "297585199519105024") {
    await new promise(r => setTimeout(r, 1000))
    msg.delete()
  }
}

async function ping_players(name, channel) {
  if (next_game.length == 0) {
    return null
  }
  let txt = "**Game About to Start**\n**Storyteller:** " + name + "\n"
  if (channel) {
    txt += "**Channel:** " + channel.name + "\n"
  }
  for (var i = 0; i < next_game.length; i++) {
    txt += "<@" + next_game[i] + "> "
  }
  next_game = []
  let ch = client.channels.cache.get('572830989315997696');
  ch.send(txt).catch(err => {
    msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
  })
}

async function respolld(msg, custom = false, homebrew = false, selection = []) {
  if (selection.length == 1 && !homebrew && !custom) {
    await respond(msg, "```You need at least 2 options to create a poll```")
    return null
  }
  let rep = new MessageEmbed()
    .setColor('#ffffff')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: msg.member.displayName, iconURL: msg.author.displayAvatarURL(), url: 'https://discord.js.org' })
  let desc = "**[]=+---+={ Script Poll }=+---+=[]**\n\n"
  let cx = 3
  if (selection.length == 0 || selection.length == 3) {
    desc += "**1- **Trouble Brewing\n**2- **Sects & Violets\n**3- **Bad Moon Rising\n"
  }
  else {
    cx = 0
    for (var i = 0; i < selection.length; i++) {
      if (selection[i] == 1) {
        cx += 1
        desc += "**" + cx + "- **Trouble Brewing\n"
        break
      }
    }
    for (var i = 0; i < selection.length; i++) {
      if (selection[i] == 2) {
        cx += 1
        desc += "**" + cx + "- **Sects & Violets\n"
        break
      }
    }
    for (var i = 0; i < selection.length; i++) {
      if (selection[i] == 3) {
        cx += 1
        desc += "**" + cx + "- **Bad Moon Rising\n"
        break
      }
    }
  }
  if (custom) {
    cx += 1
    desc += '**' + cx + '- **Custom Script\n'
  }
  if (homebrew) {
    cx += 1
    desc += '**' + cx + '- **Homebrew Script\n'
  }

  desc += '\n*Vote for the script you want to play:*'
  rep.setDescription(desc)
  // .addField('Vote for the script you want to play:', ' ', false)
  // .addField('1', '1- Trouble Brewing', false)
  //  .addField('2', '2- Sects & Violets', false)
  //  .addField('3', '3- Bad Moon Rising', false)
  // .setTimestamp()
  // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  //.addField('Inline field title', 'Some value here', true)
  //.setImage('https://i.imgur.com/AfFp7pu.png')
  //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
  // .setDescription('Vote for the script you want to play:')
  // .setTitle('Script Poll')
  // .addFields(
  // 	{ name: 'Regular field title', value: 'Some value here' },
  // 	// { name: '\u200B', value: '\u200B' },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // )
  await msg.reply({ embeds: [rep] }).then(async function(msg) {
    let nummojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    for (var i = 1; i <= cx; i++) {
      await msg.react(nummojis[i - 1]);
      await new Promise(r => setTimeout(r, 100));
    }
    // msg.react('1️⃣')
    // msg.react('2️⃣')
    // if(cx >= 3) {
    //   msg.react('3️⃣')
    // }
    // if(cx >= 4) {
    //   msg.react('4️⃣')
    // }
    // if(cx >= 5) {
    //   msg.react('5️⃣')
    // }
  }).catch(err => {
    msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
  })
}

async function secret_poll(msg, question, items) {
  let hp = (question.length == 0)
  let rep = new MessageEmbed()
    .setColor('#ffffff')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: msg.member.displayName, iconURL: msg.author.displayAvatarURL(), url: 'https://discord.js.org' })
  let desc = "**[]=+---+={ Secret Poll }=+---+=[]**\n\n"
  let cx = 0
  if (hp) {
    for (var i = 0; i < items.length; i++) {
      cx += 1
      if (cx > 10) {
        desc += items[i] + " "
        continue
      }
      if (cx == 10 && items.length > 10) {
        desc += "**" + cx + "-** " + items[i] + " "
        continue
      }
      desc += "**" + cx + "-** " + items[i] + "\n"
    }
    desc += "\n*Anonymously vote for a fabled house*"
  }
  else {
    cx = 0
    desc += "**" + question + "**\n"
    for (var i = 0; i < items.length; i++) {
      cx += 1
      if (cx > 10) {
        desc += items[i] + " "
        continue
      }
      if (cx == 10 && items.length > 10) {
        desc += "**" + cx + "-** " + items[i] + " "
        continue
      }
      desc += "**" + cx + "-** " + items[i] + "\n"
    }
    desc += '\n*Votes on this poll are anonymous*'
  }
  rep.setDescription(desc)
  if (question.length == 0) {
    question = "Harry Potter Magic Houses"
  }
  await msg.reply({ embeds: [rep] }).then(async function(msg2) {
    let nummojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    reacts = []
    for (var i = 1; i <= cx; i++) {
      await msg2.react(nummojis[i - 1])
      reacts.push([nummojis[i - 1]])
    }
    for (var i = 0; i < secret_polls.length; i++) {
      if (secret_polls[i][1] == msg.author.username) {
        secret_polls.splice(i, 1)
        break
      }
    }
    secret_polls.push([msg2.id, msg.author.username, reacts, question])
    // msg.react('1️⃣')
    // msg.react('2️⃣')
    // if(cx >= 3) {
    //   msg.react('3️⃣')
    // }
    // if(cx >= 4) {
    //   msg.react('4️⃣')
    // }
    // if(cx >= 5) {
    //   msg.react('5️⃣')
    // }
    // if(cx >= 6) {
    //   msg.react('6️⃣')
    // }
    // if(cx >= 7) {
    //   msg.react('7️⃣')
    // }
    // if(cx >= 8) {
    //   msg.react('8️⃣')
    // }
    // if(cx >= 9) {
    //   msg.react('9️⃣')
    // }
    // if(cx >= 10) {
    //   msg.react('🔟')
    // }
    ///////////////////////////////////////
    // const filter = (reaction, user) => {return true;}
    // const col = msg.createReactionCollector(filter, {max: 1, time: 3600000})
    // col.on('collect', (reaction) => {
    //     // in case you want to do something when someone reacts with 
    //     msg_user(lieu_id,`Collected a new ${reaction.emoji.name} reaction`);

    //   });

    //   // fires when the time limit or the max is reached
    //   col.on('end', (collected, reason) => {
    //     // reactions are no longer collected
    //     // if the 👍 emoji is clicked the MAX_REACTIONS times
    //     if (reason === 'limit')
    //       return message.channel.send(`We've just reached the maximum of ${MAX_REACTIONS} reactions.`);
    //   });
    ///////////////////////////////////////
    // msg.awaitReactions((reaction, user) => {
    // let nummojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣' ,'7️⃣', '8️⃣', '9️⃣', '🔟']
    // msg_user(lieu_id,"A")
    // for(var i=1;i<=10;i++) {
    //   if(reaction.emoji.name == nummojis[i-1]) {
    //     msg_user(lieu_id,"B")
    //     return true
    //   }
    // }
    // msg_user(lieu_id,"C")
    // return false}, { max: 1, time: 30000 }).then(collected => {
    //   msg_user(lieu_id,"D")
    //   if (collected.first().emoji.name == '1️⃣') {
    //     msg_user(lieu_id,"BINGOOOOOOOOOOOOOOOOOOO")
    //   }
    // }).catch(async function(msg) {msg_user(lieu_id,"SHHHHHHHHHHHHH");});
  }).catch(err => {
    msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
  })
}

async function respond(msg, rep) {
  await msg.reply(rep).catch(err => {
    msg_user(lieu_id, "No permission to send messages in that text channel\n")
    msg_user(lieu_id, "" + err)
  })
}

async function send_message(msg, rep) {
  await msg.channel.send(rep).catch(err => {
    msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
  })
}

// async function setKey(key, value) {
//     await db.set(key, value);
// };

// async function getKeyValue(key) {
//     let value = await db.get(key);
//     return value;
// };

// async function deleteKey(key) {
//     await db.delete(key);
// };

// async function listKeys() {
//     let keys = await db.list()
//     return keys;
// };

// async function listKeyPrefix(prefix) {
//     let matches = await db.list(prefix);
//     return matches;
// };

async function msg_author(msg, rep) {
  await msg.author.send(rep).catch(err => {
    msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
  })
}

async function msg_user(id, rep) {
  await client.users.fetch(id, false).then((user) => {
    user.send(rep);
  }).catch(err => {

  });
}

async function rename(msg, name) {
  await msg.member.setNickname(name.trim().substring(0, Math.min(name.length, 31))).catch(async function(err) { await respond(msg, "```An error occured while trying to change the nickname.\n" + err + "```") })
}



client.on('messageReactionAdd', async function(reaction, user) {
  if (reaction.emoji.name == '🆗') {
    // if (reaction.message.guild.id != "840323781066489946" && reaction.message.guild.id != "996462531038171136" && reaction.message.guild.id != "569683781800296501") {
    //   return null
    // }
    if (reaction.message.content.toLowerCase().trim().substring(0, 8) != "*consult" && reaction.message.content.toLowerCase().trim().substring(0, 13) != "*consultation") {
      return null
    }
    let mem = reaction.message.guild.members.cache.get(user.id);
    if (mem.displayName.trim().toLowerCase().substring(0, 4) != "(st)" && mem.displayName.trim().toLowerCase().substring(0, 4) != "[st]" && mem.displayName.trim().toLowerCase().substring(0, 6) != "(cost)" && mem.displayName.trim().toLowerCase().substring(0, 6) != "[cost]" && mem.displayName.trim().toLowerCase().substring(0, 7) != "(co-st)" && mem.displayName.trim().toLowerCase().substring(0, 7) != "[co-st]") {
      return null
    }
    let consult = await find_consult(reaction.message, reaction.message.channel.parentId);
    if (consult == null) {
      await send_message(reaction.message, "```Consultation channel not found```")
      return null
    }
    // msg_user(lieu_id,consult.name+", "+consult.id);
    // msg_user(lieu_id,mem)
    // msg_user(lieu_id,reaction.message.member)
    reaction.message.member.voice.setChannel(consult.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```") });
    await new Promise(r => setTimeout(r, 200));
    mem.voice.setChannel(consult.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```") });
    await new Promise(r => setTimeout(r, 1000));
    await reaction.message.delete().catch(e => { msg_user(lieu_id, "ERROR"); });
  }
  let nummojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
  if ((reaction.message.guild.id != "840323781066489946" && reaction.message.guild.id != "569683781800296501" && reaction.message.guild.id != "930132389592715274" && reaction.message.guild.id != "996462531038171136") || !nummojis.includes(reaction.emoji.name) || reaction.message.author.id === user.id || reaction.message.author.id !== "952917064035741706") {
    return;
  }
  // let mem = reaction.message.guild.members.cache().find(user.id)
  let poll = -1
  for (var i = 0; i < secret_polls.length; i++) {
    if (secret_polls[i][0] == reaction.message.id) {
      poll = i
      break
    }
  }
  if (poll == -1) {
    return
  }
  reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.id);
  for (var i = 0; i < secret_polls[poll][2].length; i++) {
    if (secret_polls[poll][2][i][0] != reaction.emoji.name) {
      for (var j = 1; j < secret_polls[poll][2][i].length; j++) {
        if (secret_polls[poll][2][i][j] == user.username) {
          secret_polls[poll][2][i].splice(j, 1)
          break
        }
      }
    }
    else if (!secret_polls[poll][2][i].includes(user.username)) {
      secret_polls[poll][2][i].push(user.username)
    }
  }
  // Remove user reaction
});




//Math.floor((Math.random() * 10) + 1);
client.on('messageCreate',
  async function(msg) {
    if (msg.author.username === "ShadowBOT") {
      if (msg.content.trim().toLowerCase().indexOf("list of commands") != -1) {
        await new Promise(r => setTimeout(r, 3000));
        await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
      }
      return null
    }
    // if(msg.content.trim().toLowerCase().substring(0, 27) == "https://clocktower.online/#" && msg.content.trim().toLowerCase().indexOf(" ") == -1) {
    //     link = msg.content
    //     msg.delete(1000);
    //     rep = "-> "+msg.member.displayName+" sent the link:\n**"+link+"**```All players should access this link to open the grimoire. Find your name in there, click on it and choose: Claim seat.\nSpectators may join the link to watch but may NOT take a seat.```"
    //     if(msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
    //       await send_message(msg, rep)
    //       return null
    //     }
    //     else {
    //       // if(msg.content.trim() === grim_link) {
    //       grim_link = -1
    //       grim_setter = -1
    //       // }
    //       let fnd = -1
    //       for(var i=0;i<grim_setters.length;i++)
    //       {
    //         if(grim_setters[i] === msg.author.username)
    //         {
    //           fnd = i
    //         }
    //       }
    //       if(fnd != -1)
    //       {
    //         grim_links[fnd] = msg.content.trim()
    //       }
    //       else
    //       {
    //         grim_setters.push(msg.author.username)
    //         grim_links.push(msg.content.trim())
    //       }
    //       for(var i=0;i<grim_links.length;i++)
    //       {
    //         for(var j=i+1;j<grim_links.length;j++)
    //         {
    //           if(grim_links[i] === grim_links[j])
    //           {
    //             grim_links.splice(i, 1)
    //             grim_setters.splice(i, 1)
    //             i--
    //           }
    //         }
    //       }
    //       // grim_link = msg.content.trim().substring(6)
    //       // grim_setter = msg.author.username
    //       rep += "\nPlayers can get the link by using the command *grim"
    //       await send_message(msg, rep)
    //       return null
    //       // grim_link = msg.content.trim()
    //       // if(!validURL(grim_link)) {
    //       //   grim_link = -1
    //       //   return null
    //       // }
    //       // grim_setter = msg.author.username
    //       // await respond(msg, "```Grim link set to "+grim_link+"\nPlayers can get the link by using the command *grim```")
    //     }
    //   }
    // return null
    // }
    ///if(msg.content.trim().lower().indexOf("https://clocktower.online/#", msg.content.trim().lower()) > -1) {
    //  msg.suppressEmbeds(true)
    //}
    // msg_user(lieu_id,"GOES ON?");
    if (!responding) {
      return null
    }
    if (msg.content.trim().toLowerCase() === "*nospec") {
      if (medic[msg.author.username] === undefined) {
        await respond(msg, "```No one was shadowing you :(```")
        return null
      }
      else if (medic[msg.author.username] == -1) {
        await respond(msg, "```You are currently in Do Not Disturb mode, No one can shadow you.```")
        return null
      }
      else if (medic[msg.author.username].length == 0) {
        delete medic[msg.author.username]
        await respond(msg, "```No one was shadowing you :(```")
        return null
      }
      // if(medic[newState.member.user.username] !== undefined && medic[newState.member.user.username] != -1)//(Object.keys(medic).indexOf(newState.member.user.username) != -1)
      // {
      //   var specs = medic[msg.author.username]
      //   for(var i=0;i<specs.length;i++)
      //   {
      //       if(stdic[specs[i].user.username] == msg.author.username) {
      //         delete stdic[specs[i].user.username]
      //       }
      //   }
      // }
      delete medic[msg.author.username]
      await respond(msg, "```Shined the light! Removed all of your shadows```")
      return null
    }
    else if (msg.content.trim().toLowerCase() === "*spectate" || msg.content.trim().toLowerCase() === "*!") {
      if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
        if (msg.member.displayName.trim().length > 6) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().charAt(0) != '!') {
        if (msg.member.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName.trim().substring(4).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 3).toLowerCase() === "(t)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName.trim().substring(3).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName.trim().substring(7).trim()}`)
        }
        else {
          // msg.member.setNickname(`!${msg.member.displayName}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `!${msg.member.displayName}`)
        }
      }
      else if (msg.member.displayName.trim().length > 1) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(1).trim()}`)
      }
      else {
        // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.author.username}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*lfg" || msg.content.trim().toLowerCase() === "*?") {
      if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
        if (msg.member.displayName.trim().length > 6) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().charAt(0) != '!') {
        if (msg.member.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `![LFG] ${msg.member.displayName.trim().substring(4).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 3).toLowerCase() === "(t)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `![LFG] ${msg.member.displayName.trim().substring(3).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `![LFG] ${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") {
          // msg.member.setNickname(`!${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `![LFG] ${msg.member.displayName.trim().substring(7).trim()}`)
        }
        else {
          // msg.member.setNickname(`!${msg.member.displayName}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `![LFG] ${msg.member.displayName}`)
        }
      }
      else if (msg.member.displayName.trim().length > 1) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `![LFG] ${msg.member.displayName.trim().substring(1).trim()}`)
      }
      else {
        // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `![LFG] ${msg.author.username}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*storytell" || msg.content.trim().toLowerCase() === "*st") {
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)") {
        if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
          if (msg.member.displayName.trim().length > 6) {
            // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(ST) ${msg.member.displayName.trim().substring(6).trim()}`)
          }
          else {
            // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(ST) ${msg.author.username}`)
          }
        }
        else if (msg.member.displayName.trim().charAt(0) == '!') {
          // msg.member.setNickname(`(ST) ${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(ST) ${msg.member.displayName.trim().substring(1).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 3).toLowerCase() === "(t)") {
          // msg.member.setNickname(`(ST) ${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(ST) ${msg.member.displayName.trim().substring(3).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)") {
          // msg.member.setNickname(`(ST) ${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(ST) ${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") {
          // msg.member.setNickname(`(ST) ${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(ST) ${msg.member.displayName.trim().substring(7).trim()}`)
        }
        else {
          // msg.member.setNickname(`(ST) ${msg.member.displayName}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(ST) ${msg.member.displayName}`)
        }
      }
      else if (msg.member.displayName.trim().length > 4) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(4).trim()}`)
      }
      else {
        // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.author.username}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*costorytell" || msg.content.trim().toLowerCase() === "*cost" || msg.content.trim().toLowerCase() === "*co-storytell" || msg.content.trim().toLowerCase() === "*co-st") {
      if (msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
        if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
          if (msg.member.displayName.trim().length > 6) {
            // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(Co-ST) ${msg.member.displayName.trim().substring(6).trim()}`)
          }
          else {
            // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(Co-ST) ${msg.author.username}`)
          }
        }
        else if (msg.member.displayName.trim().charAt(0) == '!') {
          // msg.member.setNickname(`(Co-ST) ${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(Co-ST) ${msg.member.displayName.trim().substring(1).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 3).toLowerCase() === "(t)") {
          // msg.member.setNickname(`(Co-ST) ${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(Co-ST) ${msg.member.displayName.trim().substring(3).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
          // msg.member.setNickname(`(Co-ST) ${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(Co-ST) ${msg.member.displayName.trim().substring(4).trim()}`)
        }
        else {
          // msg.member.setNickname(`(Co-ST) ${msg.member.displayName}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(Co-ST) ${msg.member.displayName}`)
        }
      }
      else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)" && msg.member.displayName.trim().length > 6) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(6).trim()}`)
      }
      else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)" && msg.member.displayName.trim().length > 7) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(7).trim()}`)
      }
      else {
        // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.author.username}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*travel" || msg.content.trim().toLowerCase() === "*t") {
      if (msg.member.displayName.trim().substring(0, 3).toLowerCase() !== "(t)") {
        if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
          if (msg.member.displayName.trim().length > 6) {
            // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(T) ${msg.member.displayName.trim().substring(6).trim()}`)
          }
          else {
            // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
            await rename(msg, `(T) ${msg.author.username}`)
          }
        }
        else if (msg.member.displayName.trim().charAt(0) == '!') {
          // msg.member.setNickname(`(T) ${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(T) ${msg.member.displayName.trim().substring(1).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
          // msg.member.setNickname(`(T) ${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(T) ${msg.member.displayName.trim().substring(4).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)") {
          // msg.member.setNickname(`(T) ${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(T) ${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") {
          // msg.member.setNickname(`(T) ${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(T) ${msg.member.displayName.trim().substring(7).trim()}`)
        }
        else {
          // msg.member.setNickname(`(T) ${msg.member.displayName}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `(T) ${msg.member.displayName}`)
        }
      }
      else if (msg.member.displayName.trim().length > 3) {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(3).trim()}`)
      }
      else {
        // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.author.username}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*play" || msg.content.trim().toLowerCase() === "*p") {
      if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "![lfg]") {
        if (msg.member.displayName.trim().length > 6) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.member.displayName.trim().substring(6).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().charAt(0) == '!') {
        if (msg.member.displayName.trim().length > 1) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(1).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.member.displayName.trim().substring(1).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().substring(0, 3).toLowerCase() === "(t)") {
        if (msg.member.displayName.trim().length > 3) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(3).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.member.displayName.trim().substring(3).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
        if (msg.member.displayName.trim().length > 4) {
          // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.member.displayName.trim().substring(4).trim()}`)
        }
        else {
          // msg.member.setNickname(`${msg.author.username}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
          await rename(msg, `${msg.author.username}`)
        }
      }
      else if (msg.member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(6).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(6).trim()}`)
      }
      else if (msg.member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(7).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(7).trim()}`)
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*ping") {
      if (msg.guild.id !== "569683781800296501") {
        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
        return null
      }
      await ping_players(msg.member.displayName, msg.member.voice.channel)
    }
    else if (msg.content.trim().toLowerCase() === "*waitlist" || msg.content.trim().toLowerCase() === "*wl" || msg.content.trim().toLowerCase() === "*list" || msg.content.trim().toLowerCase() === "*queue") {
      if (msg.guild.id !== "569683781800296501" && msg.author.id != lieu_id) {
        return null
      }
      let txt = "Players currently waiting for next game:\n"
      for (var i = 0; i < next_game.length; i++) {
        let usr = client.users.cache.find(user => user.id === next_game[i])
        if (!usr) { continue }
        txt += usr.username
        if (i != next_game.length - 1) {
          txt += ", "
        }
      }
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase() === "*wait" || msg.content.trim().toLowerCase() === "*ng" || msg.content.trim().toLowerCase() === "*nextgame") {
      if (msg.guild.id !== "569683781800296501") {
        return null
      }
      for (var i = 0; i < next_game.length; i++) {
        if (next_game[i] == msg.author.id) {
          await msg_author(msg, "```You are already in the ping list for next game```")
          await new Promise(r => setTimeout(r, 1000));
          await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
          return null
        }
      }
      next_game.push(msg.author.id)
      await msg_author(msg, "```You are now in the ping list for next game. You will be notified when the next game starts.```")
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*leave" || msg.content.trim().toLowerCase() === "*quit") {
      if (msg.guild.id !== "569683781800296501") {
        return null
      }
      for (var i = 0; i < next_game.length; i++) {
        if (next_game[i] == msg.author.id) {
          next_game.splice(i, 1)
          i--
          await msg_author(msg, "```You've been removed from the ping list for next game```")
          await new Promise(r => setTimeout(r, 1000));
          await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
          return null
        }
      }
      await msg_author(msg, "```You weren't in the ping list for next game```")
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*back" || msg.content.trim().toLowerCase() === "*here") {
      if (msg.member.displayName.trim().length <= 2) {
        return null
      }
      if (msg.member.displayName.trim().length <= 4) {
        if (msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "afk" || msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "brb") {
          await rename(msg, `${msg.user.username}`)
        }
        return null
      } if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[brb]" || msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[afk]") {
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()}`)
      }
    }
    else if (msg.content.trim().toLowerCase() === "*text" || msg.content.trim().toLowerCase() === "*txt") {
      if (msg.member.displayName.includes("[TEXT]")) {
        await rename(msg, `${msg.member.displayName.trim().replace("[TEXT]", "")}`)
        return null
      }
      if (msg.member.displayName.trim().length <= 5) {
        await rename(msg, `${msg.member.displayName.trim()} [TEXT]`)
        return null
      }
      if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[brb]" && msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[afk]" && msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 6).toLowerCase() !== "[text]") {
        await rename(msg, `${msg.member.displayName.trim()} [TEXT]`)
      }
      else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[afk]" || msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[brb]") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()} [TEXT]`)
      }
      // else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 6).toLowerCase() === "[text]") {
      //   // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
      //   await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 6).trim()}`)
      // }
    }
    else if (msg.content.trim().toLowerCase() === "*brb") {
      if (msg.member.displayName.trim().length <= 4) {
        if (msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "afk") {
          await rename(msg, `[BRB]`)
        }
        else if (msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "brb") {
          await rename(msg, `${msg.user.username}`)
        }
        else {
          await rename(msg, `${msg.member.displayName.trim()} [BRB]`)
        }
        return null
      }
      if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[brb]" && msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[afk]") {
        await rename(msg, `${msg.member.displayName.trim()} [BRB]`)
      }
      else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[afk]") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()} [BRB]`)
      }
      else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[brb]") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()}`)
      }
    }
    else if (msg.content.trim().toLowerCase() === "*afk") {
      if (msg.member.displayName.trim().length <= 4) {
        if (msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "brb") {
          await rename(msg, `[AFK]`)
        }
        else if (msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "afk") {
          await rename(msg, `${msg.user.username}`)
        }
        else {
          await rename(msg, `${msg.member.displayName.trim()} [AFK]`)
        }
        return null
      }
      if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[brb]" && msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() !== "[afk]") {
        await rename(msg, `${msg.member.displayName.trim()} [AFK]`)
      }
      else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[brb]") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()} [AFK]`)
      }
      else if (msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 5).toLowerCase() === "[afk]") {
        // msg.member.setNickname(`${msg.member.displayName.trim().substring(4).trim()}`).catch(err => {await respond(msg, "```Bot has no permission to edit your Nickname```"); return null;}) //{msg.reply("```Bot has no permission to edit your Nickname```"); return null;})
        await rename(msg, `${msg.member.displayName.trim().substring(0, msg.member.displayName.trim().length - 5).trim()}`)
      }
    }
    // else if (msg.content.trim().substring(0, 6).toLowerCase() === "*follow ") {
    //   if (msg.guild.id != "569683781800296501") { return null }
    //   if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
    //     await respond(msg, "```Only Storytellers and Co-Storytellers can apply a follow between players.```")
    //     return null
    //   }
    //   let target1 = msg.mentions.users.values().next().value
    //   if (!target1) {
    //     await respond(msg, "```Command must include two mentions of players as such:\n*follow <@user1> <@user2>```")
    //     return null
    //   }
    //   let target2 = msg.mentions.users.values().next().value
    //   if (!target2) {
    //     await respond(msg, "```Command must include two mentions of players as such:\n*follow <@user1> <@user2>```")
    //     return null
    //   }
    //   await shadow(msg, target1, target2)
    // }
    else if (msg.content.trim().substring(0, 6).toLowerCase() === "*spec ") {
      if (msg.member.displayName.charAt(0) != '!' && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" && msg.author.id != "297585199519105024") {
        await respond(msg, "```Only Spectators, Storytellers and Co-Storytellers can shadow players.\nPlease add ! to your name or use the command *spectate```")
        return null
      }
      else if (msg.author.id == "297585199519105024" && msg.member.voice.channel.name.toLowerCase().indexOf("town") == -1) {
        await respond(msg, "```You have to be in Town Square when you want to *spec as a player```")
        return null
      }
      let target = msg.mentions.users.values().next().value
      if (!target) {
        // await respond(msg, "```There are no mentions in your comment!\nCommand usage: *spec <player mention>\nUse *help to learn available commands```")
        let target = await find_target(msg, msg.content.trim().toLowerCase().substring(6))
        if (!target) {
          await respond(msg, "```Player not found! Make sure you use a unique part of their name or tag them with @```")
        }
        else {
          await shadow(msg, target)
        }
        return null
      }
      await shadow(msg, target)
    }
    else if (msg.content.trim().toLowerCase() === "*specs") {
      if (medic[msg.author.username] === undefined) {
        await respond(msg, "```No one is shadowing you :(```")
        return null
      }
      else if (medic[msg.author.username] == -1) {
        await respond(msg, "```You are currently in Do Not Disturb mode, No one can shadow you.```")
        return null
      }
      else if (medic[msg.author.username].length == 0) {
        delete medic[msg.author.username]
        await respond(msg, "```No one is shadowing you :(```")
        return null
      }
      let rep = "";
      for (var i = 0; i < medic[msg.author.username].length; i++) {
        if (stdic[medic[msg.author.username][i].user.username] != msg.author.username) {
          medic[msg.author.username].splice(i, 1)
          i--
          continue
        }
        if (rep != "") {
          rep = rep + ", ";
        }
        rep = rep + medic[msg.author.username][i].user.username;
      }
      if (rep === "") {
        await respond(msg, "```No one is shadowing you :(```")
        return null
      }
      await respond(msg, "```You are being shadowed by the following people:\n" + rep + "```")
    }
    else if (msg.content.trim().toLowerCase() === "*spec" || msg.content.trim().toLowerCase() === "*unspec") {
      if (stdic[msg.author.username] !== undefined) {
        delete stdic[msg.author.username]
        await respond(msg, "```You are no longer shadowing anyone```")
      }
      else {
        delete stdic[msg.author.username]
        await respond(msg, "```You weren't shadowing anyone```")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*maintain" || msg.content.trim().toLowerCase() === "*down") {
      if (msg.author.id === lieu_id) {
        await respond(msg, "```ShadowBOT will be going down momentarily for maintenance purposes.\nThank you all for your patience :D```")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*up") {
      if (msg.author.id === lieu_id) {
        await respond(msg, "```ShadowBOT is up and running.\nThank you all for your patience :D```")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*credits" || msg.content.trim().toLowerCase() === "*credit") {
      await respond(msg, "```ShadowBOT is a bot created by LieutenantDV20#0097 to allow spectators and STs to shadow players, as well as some quality of life commands.\n\nThis bot was only possible with the help of a lot of awesome people, so thanks to the people who helped me test the bot like blue, Zaba, bmessy, melodia and others, and thanks to all the people who suggested great additions to the bot like Walter, Kaz, melodia, Naizea, Inty and others.. and to all the cool people who's supported me and endured listening to me geek out about the bot lol (like blue) <3\nMore thanks to:\nLucas and Sun```")
    }
    else if (msg.content.trim().substring(0, 8).toLowerCase() === "*insult " || msg.content.trim().substring(0, 7).toLowerCase() === "*roast ") {
      let target = msg.mentions.users.values().next().value
      if (!target) {
        await respond(msg, "```No user mentions in your command.\nPlease use a player mention after *roast (like *roast @LieutenantDV20)```")
        return null;
      }
      let compliments = [", Are you the drunk? or are you just normally like this?*",
        ", Must be nice being invincible the first time, YOU FOOL!*",
        ", I'd rather lose than starpass to you :)*",
        ", You don't have to be an outsider to be a hindrance to your team!*",
        ", You don't need to be a cerenovus to make me mad for an entire day!*",
        ", You're the kind of player to ask your evil team for a 3f3...*",
        ", If you get sheeped any harder you'll be baaing in no time*",
        ", Hey I'm the grandmother, and I saw you as the Idiot!*"]
      let rnd = Math.floor(Math.random() * compliments.length)
      while (rnd == last_insult) {
        rnd = Math.floor(Math.random() * compliments.length)
      }
      last_insult = rnd
      await respond(msg, "*" + msg.guild.members.cache.get(target.id).displayName + compliments[rnd]);
    }
    else if (msg.content.trim().substring(0, 12).toLowerCase() === "*compliment ") {
      let target = msg.mentions.users.values().next().value
      if (!target) {
        await respond(msg, "```No user mentions in your command.\nPlease use a player mention after *compliment (like *compliment @LieutenantDV20)```")
        return null;
      }
      let compliments = [", You might be the imp, but you'll always be the saint in my eyes.*",
        ", You're just so cool, you know?*",
        " is a cool and lovely person <3*",
        ", A win for you, is a win for me.*",
        ", Are you the imp? because you starpassed to my heart.*",
        ", You mayor bounce my troubles away :D*",
        ", I'll always be there to monk protect you*",
        ", I might not be the butler, but I'll always vote with you*",
        ", Our friendship is like a sober sailor, it will never die*",
        ", The world is a better place with you in it <3*",
        " is fantastic in every way!*",
        ", You are as tough as a Soldier, as smart as a Mathematician and as lovely as a Sweetheart!*",
        ", I don't need a Fortune Teller to know I'm fortunate to have met you.*",
        ", This game is great, but it's made fun by awesome players like you.*"]
      let rnd = Math.floor(Math.random() * compliments.length)
      while (rnd == last_compliment) {
        rnd = Math.floor(Math.random() * compliments.length)
      }
      last_compliment = rnd
      await respond(msg, "*" + target.user.member.displayName() + compliments[rnd])
    }
    else if (msg.content.trim().substring(0, 12).toLowerCase() === "*complinent ") {
      if (msg.author.username.toLowerCase() !== "zaba" && msg.author.username.toLowerCase() !== "greg") {
        return null
      }
      let target = msg.mentions.users.values().next().value
      if (!target) {
        return null;
      }
      let complinents = [", It doesn't matter what role you got, I'm always juggling you as the Sweetheart <3*",
        ", Call me your butler, because you are my master.*",
        ", We might not be twins, but we're still a couple.*"]
      await respond(msg, "*" + target.username + complinents[Math.floor(Math.random() * complinents.length)])
    }
    else if (msg.content.trim().toLowerCase() === "*changes" || msg.content.trim().toLowerCase() === "*changelog") {
      await respond(msg, changes)
    }
    else if (msg.content.trim().toLowerCase().substring(0, 6) === "*vote ") {
      let name = msg.content.trim().substring(6)
      let fnd = -1
      for (var i = 0; i < nicks.length; i++) {
        if (nicks[i][0] == msg.author.username) {
          fnd = i
          break
        }
      }
      if (fnd == -1) {
        nicks.push([msg.author.username, msg.member.displayName])
      }
      await rename(msg, name);
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*unvote") {
      for (var i = 0; i < nicks.length; i++) {
        if (nicks[i][0] == msg.author.username) {
          await rename(msg, nicks[i][1]);
          nicks.splice(i, 1)
          return
        }
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase().substring(0, 5) === "*add ") {
      if (msg.author.id === lieu_id) {
        // if(msg.content.indexOf(",") > -1) {
        //   let lst = msg.content.trim().substring(5).split(",")
        //   for(var i=0;i<lst.length;i++) {
        //     next_game.push(lst[i]);
        //   }
        //   return null
        // }
        next_game.push(msg.content.trim().substring(5));
      }
      // await rename(msg, msg.author.username);
    }
    else if (msg.content.trim().toLowerCase() === "*night") {
      if (running_cycle) {
        await respond(msg, "```Already in the process of moving, please wait :D```")
        return null
      }
      // return null
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "996462531038171136" && msg.guild.id != "1102746173120462939") {
        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[st]") {
        await respond(msg, "```Only Storytellers can use this command```")
        return null
      }
      running_cycle = true;
      let channels = msg.guild.channels.cache.filter(c => c.id === msg.channel.parentId);
      let channelsarr = Array.from(channels.keys());
      if (channelsarr.length == 0) {
        await respond(msg, "```Text channel must be in a channel group!```")
        running_cycle = false;
        return null
      }
      let town = channels.get(channelsarr[0]);
      // msg_user(lieu_id,town.name);
      let fw = await first_word(town.name);
      // msg_user(lieu_id,fw);
      let night = await decide_night(msg, fw, town.id);
      // msg_user(lieu_id,night.name);
      if (night == null) {
        await respond(msg, "```Cottages not found!```")
        running_cycle = false;
        return null
      }
      channels = msg.guild.channels.cache.filter(c => c.parentId === town.id && c.type === 'GUILD_VOICE');
      let spects = [];
      let players = [];
      let sts = [];
      for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
          if (member.displayName.trim().charAt(0) == '!') {
            spects.push(member)
          }
          else if ((member.displayName.trim().substring(0, 4).toLowerCase() === "(st)")
            || (member.displayName.trim().substring(0, 4).toLowerCase() === "[st]")
            || (member.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)")
            || (member.displayName.trim().substring(0, 7).toLowerCase() === "[co-st]")
            || (member.displayName.trim().substring(0, 6).toLowerCase() === "(cost)")
            || (member.displayName.trim().substring(0, 6).toLowerCase() === "[cost]")) {
            sts.push(member)
          }
          else {
            players.push(member)
          }
          // else if ((member.displayName.trim().substring(0, 3).toLowerCase() === "(t)")
          //   || (member.displayName.trim().substring(0, 3).toLowerCase() === "[t]")
          //   || (member.displayName.trim().substring(0, 3).toLowerCase() === "(n)")
          //   || (member.displayName.trim().substring(0, 3).toLowerCase() === "[n]")
          //   || (member.displayName.trim().charAt(0) !== '(' && member.displayName.trim().charAt(0) !== '[')) {
          //   players.push(member)
          // }
        }
      }
      // let txt = "Storytellers: ";
      // for (var i = 0; i < sts.length; i++) {
      //   txt += sts[i].displayName + " "
      // }
      // txt += "\nPlayers: "
      // for (var i = 0; i < players.length; i++) {
      //   txt += players[i].displayName + " "
      // }
      // txt += "\nSpectators: "
      // for (var i = 0; i < spects.length; i++) {
      //   txt += spects[i].displayName + " "
      // }
      // txt += "\n"
      // await respond(msg, txt);
      channels = msg.guild.channels.cache.filter(c => c.parentId === night.id && c.type === 'GUILD_VOICE');
      let tmp = Array.from(channels.keys());
      if (tmp.length <= players.length) {
        await respond(msg, "```Process Failed: There are more players than there are cottages.```");
        running_cycle = false;
        return null;
      }
      channelsarr.length = 0;
      for (var j = 0; j < tmp.length; i++) {
        let minc = 0;
        let mini = channels.get(tmp[0]).position;
        for (var i = 1; i < tmp.length; i++) {
          xc = channels.get(tmp[i]).position;
          if (xc < mini) {
            minc = i;
            mini = xc
          }
        }
        channelsarr.push(tmp[minc]);
        tmp.splice(minc, 1);
      }
      let spechan = channels.get(channelsarr[0]);
      let stchan = spechan;
      let start = 1;
      if (channelsarr.length > players.length + 1) {
        stchan = channels.get(channelsarr[1]);
        start = 2;
      }
      let mpc = 0;
      for (var i = 0; i < spects.length; i++) {
        await spects[i].voice.setChannel(spechan.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```" + e) });
        mpc += 1;
        // responding = false;
        await new Promise(r => setTimeout(r, 200));
        // responding = true;
        if (mpc % 5 == 0) {
          // responding = false;
          await new Promise(r => setTimeout(r, 2600));
          // responding = true;
        }
      }
      for (var i = 0; i < sts.length; i++) {
        await sts[i].voice.setChannel(stchan.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```" + e) });
        mpc += 1;
        // responding = false;
        await new Promise(r => setTimeout(r, 200));
        // responding = true;
        if (mpc % 5 == 0) {
          // responding = false;
          await new Promise(r => setTimeout(r, 2600));
          // responding = true;
        }
      }
      let membarr = null;
      for (var q = 0; q < players.length; q++) {
        for (var i = start; i < channelsarr.length; i++) {
          membarr = Array.from(channels.get(channelsarr[i]).members.keys());
          if (membarr.length == 0) {
            await players[q].voice.setChannel(channelsarr[i]).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```" + e) });
            start = i + 1;
            break;
          }
        }
        mpc += 1;
        // responding = false;
        await new Promise(r => setTimeout(r, 200));
        // responding = true;
        if (mpc % 5 == 0) {
          // responding = false;
          await new Promise(r => setTimeout(r, 2600));
          // responding = true;
        }
      }
      mpc = 0;
      running_cycle = false;
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "ERROR"); });
    }
    else if (msg.content.trim().toLowerCase() === "*day") {
      if (running_cycle) {
        await respond(msg, "```Already in the process of moving, please wait :D```")
        return null
      }
      // return null
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "996462531038171136" && msg.guild.id != "1102746173120462939") {
        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)") {
        await respond(msg, "```Only Storytellers can use this command```")
        return null
      }
      running_cycle = true;
      let channels = msg.guild.channels.cache.filter(c => c.id === msg.channel.parentId);
      let channelsarr = Array.from(channels.keys());
      if (channelsarr.length == 0) {
        await respond(msg, "```Text channel must be in a channel group!```")
        running_cycle = false;
        return null
      }
      let town = channels.get(channelsarr[0]);
      let fw = await first_word(town.name);
      let night = await decide_night(msg, fw, town.id);
      if (night == null) {
        await respond(msg, "```Cottages not found!```")
        running_cycle = false;
        return null
      }
      channels = msg.guild.channels.cache.filter(c => c.parentId === town.id && c.type === 'GUILD_VOICE');
      channelsarr = Array.from(channels.keys());
      let mc = channelsarr[0];
      let mic = channels.get(mc).position;
      for (var i = 1; i < channelsarr.length; i++) {
        if (channels.get(channelsarr[i]).position < mic) {
          mic = channels.get(channelsarr[i]).position;
          mc = channelsarr[i];
        }
      }
      town = channels.get(mc);
      // msg_user(lieu_id,town);
      // await respond(msg, town.id+", "+town.name);
      channels = msg.guild.channels.cache.filter(c => c.parentId === night.id && c.type === 'GUILD_VOICE');
      let tmp = Array.from(channels.keys());
      channelsarr.length = 0;
      for (var j = 0; j < tmp.length; i++) {
        let minc = 0;
        let mini = channels.get(tmp[0]).position;
        for (var i = 1; i < tmp.length; i++) {
          xc = channels.get(tmp[i]).position;
          if (xc == mini) {
            msg_user(lieu_id, "WOOPS");
          }
          else if (xc < mini) {
            minc = i;
            mini = xc
          }
        }
        channelsarr.push(tmp[minc]);
        tmp.splice(minc, 1);
      }
      let membarr = null;
      let mvc = 0;
      for (var i = 0; i < channelsarr.length; i++) {
        membarr = Array.from(channels.get(channelsarr[i]).members.keys());
        // msg_user(lieu_id,i+", "+membarr);
        for (var j = 0; j < membarr.length; j++) {
          await channels.get(channelsarr[i]).members.get(membarr[j]).voice.setChannel(town.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```\n\n" + e) });
          mvc += 1;
          // responding = false;
          await new Promise(r => setTimeout(r, 200));
          // responding = true;
          if (mvc % 5 == 0) {
            // responding = false;
            await new Promise(r => setTimeout(r, 2600));
            // responding = true;
          }
        }
      }
      mvc = 0;
      running_cycle = false;
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "ERROR"); });
    }
    else if (msg.content.trim().toLowerCase() === "*town") {
      if (running_cycle) {
        await respond(msg, "```Already in the process of moving, please wait :D```")
        return null
      }
      // return null
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "996462531038171136" && msg.guild.id != "1102746173120462939") {
        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)") {
        await respond(msg, "```Only Storytellers can use this command```")
        return null
      }
      running_cycle = true;
      let channels = msg.guild.channels.cache.filter(c => c.id === msg.channel.parentId);
      let channelsarr = Array.from(channels.keys());
      if (channelsarr.length == 0) {
        await respond(msg, "```Text channel must be in a channel group!```")
        running_cycle = false;
        return null
      }
      let town = channels.get(channelsarr[0]);
      channels = msg.guild.channels.cache.filter(c => c.parentId === town.id && c.type === 'GUILD_VOICE');
      channelsarr = Array.from(channels.keys());
      let mc = channelsarr[0];
      let mic = channels.get(mc).position;
      for (var i = 1; i < channelsarr.length; i++) {
        if (channels.get(channelsarr[i]).position < mic) {
          mic = channels.get(channelsarr[i]).position;
          mc = channelsarr[i];
        }
      }
      town = channels.get(mc);
      let tmp = Array.from(channels.keys());
      channelsarr.length = 0;
      for (var j = 0; j < tmp.length; i++) {
        let minc = 0;
        let mini = channels.get(tmp[0]).position;
        for (var i = 1; i < tmp.length; i++) {
          xc = channels.get(tmp[i]).position;
          if (xc == mini) {
            msg_user(lieu_id, "WOOPS");
          }
          else if (xc < mini) {
            minc = i;
            mini = xc
          }
        }
        channelsarr.push(tmp[minc]);
        tmp.splice(minc, 1);
      }
      let membarr = null;
      let mvc = 0;
      for (var i = 0; i < channelsarr.length; i++) {
        membarr = Array.from(channels.get(channelsarr[i]).members.keys());
        // msg_user(lieu_id,i+", "+membarr);
        for (var j = 0; j < membarr.length; j++) {
          await channels.get(channelsarr[i]).members.get(membarr[j]).voice.setChannel(town.id).catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```\n\n" + e) });
          mvc += 1;
          // responding = false;
          await new Promise(r => setTimeout(r, 200));
          // responding = true;
          if (mvc % 10 == 0) {
            // responding = false;
            await new Promise(r => setTimeout(r, 2600));
            // responding = true;
          }
        }
      }
      mvc = 0;
      running_cycle = false;
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "ERROR"); });
    }
    else if (msg.content.trim().toLowerCase() === "*stoptimer") {
      if (running_cycle) {
        await respond(msg, "```Already in the process of moving, please wait :D```")
        return null
      }
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "569683781800296501" && msg.guild.id != "996462531038171136" && msg.guild.id != "1102746173120462939") {

        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[st]" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "[cost]" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "[co-st]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[co]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(co)") {
        await respond(msg, "```Only Storytellers and Co-Storytellers can use this command```")
        return null
      }
      let my_timer_found = -1;
      for (let i = 0; i < timers.length; i++) {
        if (timers[i][0] == msg.author.id) {
          my_timer_found = i;
          break;
        }
      }
      if (my_timer_found == -1) {
        await respond(msg, "```No timers started```");
        return null;
      }
      timers[my_timer_found][1].cancel();
      await new Promise(r => setTimeout(r, 110));
      timers.splice(my_timer_found, 1);
      await respond(msg, "```Timer stopped```");
    }
    else if (msg.content.trim().toLowerCase() === "*quiet" || msg.content.trim().toLowerCase() === "*hl") {
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[st]" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "[cost]" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "[co-st]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[co]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(co)") {
        await respond(msg, "```Only Storytellers and Co-Storytellers can use this command```")
        return null
      }
      await respond(msg, "> # Hell's Librarian is now in play!! :closed_book:\n> - All players must remain **silent**.\n> - The storyteller will direct which players who are allowed to speak and when HL is over.\n> - If a nomination is present, only the accuser speaks 1st, then the defense only, then pertinent info.\n> - Once votes are called, discussion **must** be taken to town square and **VOTES** are expected to happen **ASAP**.");
    }
    else if (msg.content.trim().toLowerCase().substring(0, 7) === "*timer ") {
      //test
      if (running_cycle) {
        await respond(msg, "```Already in the process of moving, please wait :D```")
        return null
      }
      // return null
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "569683781800296501" && msg.guild.id != "996462531038171136" && msg.guild.id != "1102746173120462939") {

        return null
      }
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[st]" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "[cost]" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "[co-st]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "[co]" && msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(co)") {
        await respond(msg, "```Only Storytellers and Co-Storytellers can use this command```")
        return null
      }
      let channels = msg.guild.channels.cache.filter(c => c.id === msg.channel.parentId);
      let channelsarr = Array.from(channels.keys());
      if (channelsarr.length == 0) {
        await respond(msg, "```Text channel must be in a channel group!```")
        running_cycle = false;
        return null
      }
      let time = msg.content.trim().substring(7)
      let crt = 0;
      for (var i = 0; i < time.length; i++) {
        if (time.charCodeAt(i) < 48 || time.charCodeAt(i) > 57) {
          if (time[i] != ".") {
            await respond(msg, "```The command must be followed by the number of minutes in the range:\n0.5, 1, 1.5, ... , 9.5, 10```")
            return null
          }
          if (crt != 1) {
            await respond(msg, "```The command must be followed by the number of minutes in the range:\n0.5, 1, 1.5, ... , 9.5, 10```")
            return null
          }
          else {
            crt = 2;
          }
        }
        else {
          if (crt == 0) {
            crt = 1;
          }
          else if (crt == 2) {
            crt = 3;
          }
        }
      }
      if (crt != 1 && crt != 3) {
        await respond(msg, "```The command must be followed by the number of minutes in the range:\n0.5, 1, 1.5, ... , 9.5, 10```")
        return null
      }
      let mtime = parseFloat(time);
      if (mtime > 10) {
        await respond(msg, "```The specified time cannot exceed 10 minutes```")
        return null;
      }
      if (mtime < 0.5) {
        await respond(msg, "```The specified time cannot be less than 0.5```")
        return null;
      }
      let intime = 0;
      let half = false;
      if (mtime - 0.5 == parseInt(time)) {
        half = true;
        intime = parseInt(mtime - 0.5);
      }
      else if (mtime == parseInt(time)) {
        intime = parseInt(mtime);
      }
      else {
        await respond(msg, "```The command must be followed by the number of minutes in the range:\n0.5, 1, 1.5, ... , 9.5, 10```")
        return null
      }
      let my_timer_found = -1;
      for (let i = 0; i < timers.length; i++) {
        if (timers[i][0] == msg.author.id) {
          my_timer_found = i;
          break;
        }
      }
      if (my_timer_found == -1) {
        timers.push([msg.author.id, null]);
        my_timer_found = timers.length - 1;
      }
      else {
        timers[my_timer_found][1] = null;
      }
      if (half) {
        if (intime == 0) {
          await send_message(msg, "### Whispers close in 30 seconds");
        }
        else {
          if (intime == 1)
            await send_message(msg, "### Whispers close in " + intime + " minute and 30 seconds");
          else
            await send_message(msg, "### Whispers close in " + intime + " minutes and 30 seconds");
        }
      }
      else {
        if (intime == 1)
          await send_message(msg, "### Whispers close in " + intime + " minute");
        else
          await send_message(msg, "### Whispers close in " + intime + " minutes");
      }
      if (mtime > 3) {
        timers[my_timer_found][1] = createTimer((mtime - 3) * 60000);
        timers[my_timer_found][1].then(async () => {
          mtime = 3;
          intime = 3;
          await send_message(msg, "### Whispers close in 3 minutes");
          timers[my_timer_found][1] = createTimer((mtime - 1) * 60000);
          timers[my_timer_found][1].then(async () => {
            mtime = 1;
            intime = 1;
            await send_message(msg, "### Whispers close in 1 minute");
            timers[my_timer_found][1] = createTimer((mtime - 0.25) * 60000);
            timers[my_timer_found][1].then(async () => {
              mtime = 0.25;
              intime = 0;
              await send_message(msg, "### Whispers close in 15 seconds");
              timers[my_timer_found][1] = createTimer(15000);
              timers[my_timer_found][1].then(async () => {
                mtime = 0;
                intime = 0;
                await send_message(msg, "# Nomination time!\n### Please make your way back to town");
                timers.splice(my_timer_found, 1);
              });
            });
          });
        });
      }
      else if (mtime > 1) {
        timers[my_timer_found][1] = createTimer((mtime - 1) * 60000);
        timers[my_timer_found][1].then(async () => {
          mtime = 1;
          intime = 1;
          await send_message(msg, "### Whispers close in 1 minute");
          timers[my_timer_found][1] = createTimer((mtime - 0.25) * 60000);
          timers[my_timer_found][1].then(async () => {
            mtime = 0.25;
            intime = 0;
            await send_message(msg, "### Whispers close in 15 seconds");
            timers[my_timer_found][1] = createTimer(15000);
            timers[my_timer_found][1].then(async () => {
              mtime = 0;
              intime = 0;
              await send_message(msg, "# Nomination time!\n### Please make your way back to town");
              timers.splice(my_timer_found, 1);
            });
          });
        });
      }
      else {
        timers[my_timer_found][1] = createTimer((mtime - 0.25) * 60000);
        timers[my_timer_found][1].then(async () => {
          mtime = 0.25;
          intime = 0;
          await send_message(msg, "### Whispers close in 15 seconds");
          timers[my_timer_found][1] = createTimer(15000);
          timers[my_timer_found][1].then(async () => {
            mtime = 0;
            intime = 0;
            await send_message(msg, "# Nomination time!\n### Please make your way back to town");
            timers.splice(my_timer_found, 1);
          });
        });
      }
      // let membarr = null;
      // let mvc = 0;
      // for (var i = 0; i < channelsarr.length; i++) {
      //   membarr = Array.from(channels.get(channelsarr[i]).members.keys());
      //   // msg_user(lieu_id,i+", "+membarr);
      //   for (var j = 0; j < membarr.length; j++) {
      //     await channels.get(channelsarr[i]).members.get(membarr[j]).voice.setChannel(town.id).catch(async function(e) { msg_user(lieu_id,"```An Error has occured while using the command```\n\n" + e) });
      //     mvc += 1;
      //     responding = false;
      //     await new Promise(r => setTimeout(r, 200));
      //     responding = true;
      //     if (mvc % 10 == 0) {
      //       mvc = 0;
      //       responding = false;
      //       await new Promise(r => setTimeout(r, 2600));
      //       responding = true;
      //     }
      //   }
      // }
      // running_cycle = false;
      // await new Promise(r => setTimeout(r, 200));
      // await msg.delete().catch(e => { msg_user(lieu_id,"ERROR"); });
    }
    else if (msg.content.trim().toLowerCase().substring(0, 8) === "*consult" || msg.content.trim().toLowerCase().substring(0, 13) === "*consultation") {
      await new Promise(r => setTimeout(r, 100));
      await msg.react('🆗');
    }
    else if (msg.content.trim().toLowerCase().substring(0, 8) === "*results") {
      let poll = -1
      for (var i = 0; i < secret_polls.length; i++) {
        if (secret_polls[i][1] == msg.author.username) {
          poll = i
          break
        }
      }
      if (poll == -1) {
        await respond(msg, "```You don't have an ongoing secret poll```")
        return null
      }
      let results = "**The results to the poll:**\n" + secret_polls[poll][3] + "\n--------------------\n"
      for (var i = 0; i < secret_polls[poll][2].length; i++) {
        results += "**" + (secret_polls[poll][2][i].length - 1) + " People reacted to " + secret_polls[poll][2][i][0] + ":**\n"
        for (var j = 1; j < secret_polls[poll][2][i].length; j++) {
          results += secret_polls[poll][2][i][j] + "\n"
        }
      }
      secret_polls.splice(poll, 1)
      if (msg.content.toLowerCase().indexOf("p") > -1) {
        await send_message(msg, results)
      }
      else {
        await msg_author(msg, results)
      }
    }
    else if (msg.content.trim().toLowerCase().substring(0, 6) === "*move ") {
      if (msg.guild.id != "569683781800296501")
          return null;
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && !msg.member.roles.cache.has("1046984192405282897") && !msg.member.roles.cache.has("1289243075981344892") && !msg.member.roles.cache.has("569684377496190996")) {
        await respond(msg, "```Only Storytellers and Staff can use this command```")
        return null
      }
      if (move_blacklist.includes(msg.author.id)) {
        await respond(msg, "```You are BLACKLISTED from using this command, please contact the Doomsayer Mods and ask them to remove you from it```")
      }
      let target = msg.mentions.users.values().next().value
      if (!target) {
        return null
      }
      target = msg.guild.members.cache.get(target.id)
      if (!target) {
        return null
      }
      let tid = target.voice.channelId
      if (!tid) {
        return null
      }
      let tvc = msg.guild.channels.cache.get(tid)
      if (!tvc) {
        return null
      }
      await target.voice.setChannel("623058156058181633").catch(async function(e) { msg_user(lieu_id, "```An Error has occured while using the command```" + e) })
      await respond(msg, "```Player moved to AFK channel```")
    }
    else if (msg.content.trim().toLowerCase().substring(0, 9) === "*setrole ") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      if (msg.member.displayName.toLowerCase().trim().charAt(0) === "!" || msg.member.displayName.toLowerCase().trim().substring(0, 4) === "(st)" || msg.member.displayName.toLowerCase().trim().substring(0, 6) === "(cost)" || msg.member.displayName.toLowerCase().trim().substring(0, 7) === "(co-st)") {
        await new Promise(r => setTimeout(r, 1000));
        await msg.delete();
        return null;
      }
      let rol = msg.content.trim().substring(9);
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][0] == msg.author.username && pinfo[i][1] == msg.guild.id) {
          pinfo[i][2] = rol;
          return null;
        }
      }
      pinfo.push([msg.author.username, msg.guild.id, rol, "undefined"]);
      await respond(msg, "```Role set```");
    }
    else if (msg.content.trim().toLowerCase().substring(0, 9) === "*getrole ") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      let rol = msg.mentions.users.values().next().value;
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][0] == rol.username && pinfo[i][1] == msg.guild.id) {
          await respond(msg, "**" + rol.username + "**\n**- Role: **" + pinfo[i][2]);
          return null;
        }
      }
      await respond(msg, "**" + rol.username + "**\n**- Role: **undefined.");
    }
    else if (msg.content.trim().toLowerCase().substring(0, 9) === "*setinfo ") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      if (msg.member.displayName.toLowerCase().trim().charAt(0) === "!" || msg.member.displayName.toLowerCase().trim().substring(0, 4) === "(st)" || msg.member.displayName.toLowerCase().trim().substring(0, 6) === "(cost)" || msg.member.displayName.toLowerCase().trim().substring(0, 7) === "(co-st)") {
        await new Promise(r => setTimeout(r, 1000));
        await msg.delete();
        return null;
      }
      let rol = msg.content.trim().substring(9);
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][0] == msg.author.username && pinfo[i][1] == msg.guild.id) {
          pinfo[i][3] = rol;
          return null;
        }
      }
      pinfo.push([msg.author.username, msg.guild.id, "undefined", rol]);
      await respond(msg, "```Information set```");
    }
    else if (msg.content.trim().toLowerCase().substring(0, 9) === "*addinfo ") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      if (msg.member.displayName.toLowerCase().trim().charAt(0) === "!" || msg.member.displayName.toLowerCase().trim().substring(0, 4) === "(st)" || msg.member.displayName.toLowerCase().trim().substring(0, 6) === "(cost)" || msg.member.displayName.toLowerCase().trim().substring(0, 7) === "(co-st)") {
        await new Promise(r => setTimeout(r, 1000));
        await msg.delete();
        return null;
      }
      let rol = msg.content.trim().substring(9);
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][0] == msg.author.username && pinfo[i][1] == msg.guild.id) {
          if (pinfo[i][3] != "undefined") {
            pinfo[i][3] += rol;
          }
          else {
            pinfo[i][3] = rol;
          }
          return null;
        }
      }
      pinfo.push([msg.author.username, msg.guild.id, "undefined", rol]);
      await respond(msg, "```Information added```");
    }
    else if (msg.content.trim().toLowerCase().substring(0, 9) === "*getinfo ") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      let rol = msg.mentions.users.values().next().value;
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][0] == rol.username && pinfo[i][1] == msg.guild.id) {
          await respond(msg, "**" + rol.username + "**\n**- Role: **" + pinfo[i][2] + "\n**- Info: **" + pinfo[i][3]);
          return null;
        }
      }
      await respond(msg, "**" + rol.username + "**\n**- Role: **undefined.\n**- Info: **undefined.");
    }
    else if (msg.content.trim().toLowerCase() === "*roundrobin" || msg.content.trim().toLowerCase() === "*rr") {
      if (msg.guild.id != "840323781066489946") {
        return null;
      }
      let txt = "**Round Robin:**\n";
      let c = 0;
      for (var i = 0; i < pinfo.length; i++) {
        if (pinfo[i][1] == msg.guild.id && pinfo[i][2] != "undefined") {
          txt += "**" + pinfo[i][0] + ":** " + pinfo[i][2] + "\n";
          c += 1;
        }
      }
      if (c == 0) {
        await respond(msg, "*No roles have been set!*");
      }
      else {
        await respond(msg, txt);
      }
    }
    else if (msg.content.trim().toLowerCase() === "*luqu") {
      if (msg.author.id != lieu_id) {
        return null;
      }
      let txt = "Queue:\n"
      for (var i = 0; i < next_game.length; i++) {
        txt += next_game[i] + ","
      }
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase() === "*paper") {
      if (msg.author.username.toLowerCase() !== "papermaniac" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://cdn.discordapp.com/attachments/973703468093173810/1002806322271637554/unknown.png")
    }
    else if (msg.content.trim().toLowerCase() === "*paper2" || msg.content.trim().toLowerCase() === "*papercut") {
      if (msg.author.username.toLowerCase() !== "papermaniac" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://cdn.discordapp.com/attachments/973703468093173810/1002813151051522128/unknown.png")
    }
    else if (msg.content.trim().toLowerCase() === "*paper3" || msg.content.trim().toLowerCase() === "*papers") {
      if (msg.author.username.toLowerCase() !== "papermaniac" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "```I would suggest not executing paper here. Paper is 100% on the good team and she would be an awful kill for town. Also, paper can hard confirm herself good. 🙂```")
    }
    else if (msg.content.trim().toLowerCase() === "*nexus") {
      if (msg.author.id !== "836033361273290832" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "***\"Don\'t take my fruit, or kill me pls.\"***\nhttps://media.discordapp.net/attachments/983891607533269003/1004874631980789780/unknown.png?width=473&height=473")
    }
    else if (msg.content.trim().toLowerCase().substring(0, 10) === "*announce ") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      // 1005113271692558357 - 840323781066489950
      let txt = msg.content.trim().substring(10).trim();
      let ch1 = client.channels.cache.get('1005113271692558357');
      // let ch2 = client.channels.cache.get('840323781066489950');
      ch1.send(txt).catch(err => {
        msg_user(lieu_id, "No permission to send messages in " + ch.name + "\n");
      })
      // ch2.send(txt).catch(err => { msg_user(lieu_id,"No permission to send messages in that text channel\n")
    }
    else if (msg.content.trim().toLowerCase() === "*announce") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      let cs = client.guilds.cache.get("569683781800296501").channels.cache.filter(c => c.type == 'GUILD_TEXT');
      let res = "Channel ID: ";
      for (const [channelID, channel] of cs) {
        if (channel.name.indexOf("shadowbot") > -1) {
          res += channelID + ", " + channel.name;
          break;
        }
      }
      await respond(msg, res);
    }
    else if (msg.content.trim().toLowerCase() === "*bri" || msg.content.trim().toLowerCase() === "*bribold" || msg.content.trim().toLowerCase() === "*bribold1") {
      if (msg.author.username.toLowerCase() !== "bribold1" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "```Sadie's evil so bribold1 can't be evil that's just basic math```")
    }
    else if (msg.content.trim().toLowerCase() === "*kim") {
      if (msg.author.id !== "590560861664313355" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://tenor.com/view/screaming-internally-nervous-gif-12650126")
    }
    else if (msg.content.trim().toLowerCase() === "*ethan") {
      if (msg.author.id !== "853841112502370304" && msg.author.id !== lieu_id) {
        return null
      }
      let rnd = Math.floor(Math.random() * 10)
      if (rnd < 5) {
        await respond(msg, "*sigh...*")
      }
      else {
        await respond(msg, "https://tenor.com/view/boring-unimpressed-meh-really-seriously-gif-16279809")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*lieu" || msg.content.trim().toLowerCase() === "*lieutenant" || msg.content.trim().toLowerCase() === "*lieutenantdv20") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "```ShadowBOT is at your command, master LieutenantDV20!\nIs it time to take over the world yet?```")
    }
    else if (msg.content.trim().toLowerCase() === "*masha" || msg.content.trim().toLowerCase() === "*mashka") {
      if (msg.author.id !== "339129155750723585" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "*I have 2 parrots, a cat, a dog and an iguana! :D*")
    }
    else if (msg.content.trim().toLowerCase().substring(0, 6) === "*goat ") {
      if (msg.author.username.toLowerCase() !== "hauptmann24" && msg.author.id !== lieu_id) {
        return null
      }
      let fnd = -1
      for (var i = 0; i < nicks.length; i++) {
        if (nicks[i][0] == msg.author.username) {
          fnd = i
          break
        }
      }
      if (fnd == -1) {
        nicks.push([msg.author.username, msg.member.displayName])
      }
      await rename(msg, "Goat");
      await new Promise(r => setTimeout(r, 200));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*ungoat") {
      if (msg.author.username.toLowerCase() !== "hauptmann24" && msg.author.id !== lieu_id) {
        return null
      }
      for (var i = 0; i < nicks.length; i++) {
        if (nicks[i][0] == msg.author.username) {
          await rename(msg, nicks[i][1]);
          nicks.splice(i, 1)
          return
        }
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase() === "*new" || msg.content.trim().toLowerCase() === "*n") {
      if (msg.member.displayName.trim().toLowerCase().indexOf("[n]") > -1 ||
        msg.member.displayName.trim().toLowerCase().indexOf("(n)") > -1) {
        let nick = msg.member.displayName;
        let q = 0;
        for (var i = 0; i < nick.length; i++) {
          if (nick[i] == "[" || nick[i] == "(") {
            q = 1;
          }
          if (q == 1 && (nick[i] == "N" || nick[i] == "n")) {
            q = 2;
          }
          if (q == 2 && (nick[i] == ")" || nick[i] == "]")) {
            nick = nick.slice(0, i - q) + nick.slice(i + 1, nick.length);
            await rename(msg, nick);
            break
          }
        }
      }
      else {
        await rename(msg, `${msg.member.displayName.trim()} [N]`);
      }
      await new Promise(r => setTimeout(r, 1000));
      await msg.delete().catch(e => { msg_user(lieu_id, "ERROR"); });
    }
    // else if (msg.content.trim().toLowerCase() === "*new" || msg.content.trim().toLowerCase() === "*n") {
    //   if(msg.member.displayName.trim().toLowerCase().substring(0, 3) == "[n]" || msg.member.displayName.trim().toLowerCase().substring(0, 3) == "(n)") {
    //     if(msg.member.displayName.length > 3) {
    //       await rename(msg, `${msg.member.displayName.trim().substring(3).trim()}`);
    //     }
    //     else {
    //       await rename(msg, `${msg.author.username}`);
    //     }
    //   }
    //   else if(msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "[n]" || msg.member.displayName.trim().toLowerCase().substring(msg.member.displayName.trim().length - 3, 3) == "(n)") {
    //     await rename(msg, `${msg.member.displayName.trim().substring(msg.member.displayName.trim().length - 3, 3).trim()}`);
    //   }
    //   else if(msg.member.displayName.trim().toLowerCase().indexOf("[n]") > -1 ||
    //          msg.member.displayName.trim().toLowerCase().indexOf("(n)") > -1) {
    //     let nick = msg.member.displayName;
    //     let q = 0;
    //     for(var i=0;i<nick.length;i++) {
    //       if(nick[i] == "[" || nick[i] == "(") {
    //         q = 1;
    //       }
    //       if(q == 1 && (nick[i] == "N" || nick[i] == "n")) {
    //         q = 2;
    //       }
    //       if(q == 2 && (nick[i] == ")" || nick[i] == "]")) {
    //         nick = nick.substring(0, i-q)+nick.substring(i+1,nick.length - i);
    //         await rename(msg, nick);
    //         return null
    //       }
    //     }
    //   }
    //   // else if(msg.member.displayName.trim().toLowerCase().substring(0, 3) == "[t]" || msg.member.displayName.trim().toLowerCase().substring(0, 3) == "(t)") {
    //   //   let tn = msg.member.displayName.trim().toLowerCase().substring(3).trim();
    //   //   if(msg.member.displayName.trim().toLowerCase().substring(0, 3) == "[n]" || msg.member.displayName.trim().toLowerCase().substring(0, 3) == "(n)") {
    //   //     if(msg.member.displayName.length > 3) {
    //   //       await rename(msg, `(T) ${tn.substring(3).trim()}`);
    //   //     }
    //   //     else {
    //   //       await rename(msg, `(T) ${msg.author.username}`);
    //   //     }
    //   //   }
    //   // }
    //   else {
    //     await rename(msg, `[N] ${msg.member.displayName.trim()}`);
    //   }
    // }
    else if (msg.content.trim().toLowerCase().substring(0, 7) === "*get t ") {
      var rest = msg.content.trim().toLowerCase().substring(7)
      var tmp = ""
      for (var i = 0; i < rest.length; i++) {
        if (rest.charCodeAt(i) < 48 || rest.charCodeAt(i) > 57) {
          await respond(msg, "```Please type a positive integer for the script id```")
          return null
        }
        tmp += rest.charAt(i);
      }
      var num = parseInt(tmp) - 1
      var arr = Array.from(Object.keys(teensies));
      if (num >= arr.length || num < 0) {
        await respond(msg, "```Script ID invalid, only " + arr.length + " teensy scripts available```")
        return null
      }
      var txt = "**Script Name:** " + arr[num] + "\n"
      txt += "**Link to JSON:** " + teensies[arr[num]] + "\n"
      txt += "**Link to PDF:** " + teensies[arr[num]] + "_pdf"
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase().substring(0, 5) === "*get ") {
      var rest = msg.content.trim().toLowerCase().substring(5)
      var tmp = ""
      for (var i = 0; i < rest.length; i++) {
        if (rest.charCodeAt(i) < 48 || rest.charCodeAt(i) > 57) {
          await respond(msg, "```Please type a positive integer for the script id```")
          return null
        }
        tmp += rest.charAt(i);
      }
      var num = parseInt(tmp) - 1
      var arr = Array.from(Object.keys(scripts));
      if (num >= arr.length || num < 0) {
        await respond(msg, "```Script ID invalid, only " + arr.length + " scripts available```")
        return null
      }
      var txt = "**Script Name:** " + arr[num] + "\n"
      txt += "**Link to JSON:** " + scripts[arr[num]] + "\n"
      txt += "**Link to PDF:** " + scripts[arr[num]] + "_pdf"
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase().substring(0, 7) === "*script" || msg.content.trim().toLowerCase().substring(0, 8) === "*scripts") {
      var txt = ""
      if (msg.content.trim().indexOf(" ") > -1) {
        var tmp = ""
        for (var i = msg.content.trim().indexOf(" ") + 1; i < msg.content.length; i++) {
          if (msg.content.charCodeAt(i) < 48 || msg.content.charCodeAt(i) > 57) {
            await respond(msg, "```Please type a positive integer for the page number```")
            return null
          }
          tmp += msg.content.charAt(i);
        }
        var page = parseInt(tmp)
        if (page > await count_pages(false)) {
          await respond(msg, "```Invalid page number! Only " + await count_pages(false) + " pages available```")
          return null
        }
        txt = await scripts_to_txt(false, page)
      }
      else {
        txt = await scripts_to_txt(false, 1)
      }
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase().substring(0, 7) === "*teensy" || msg.content.trim().toLowerCase().substring(0, 8) === "*teensys" || msg.content.trim().toLowerCase().substring(0, 9) === "*teensies") {
      var txt = ""
      if (msg.content.trim().indexOf(" ") > -1) {
        var tmp = ""
        for (var i = msg.content.trim().indexOf(" ") + 1; i < msg.content.length; i++) {
          if (msg.content.charCodeAt(i) < 48 || msg.content.charCodeAt(i) > 57) {
            await respond(msg, "```Please type a positive integer for the page number```")
            return null
          }
          tmp += msg.content.charAt(i);
        }
        var page = parseInt(tmp)
        if (page > await count_pages(true)) {
          await respond(msg, "```Invalid page number! Only " + await count_pages(true) + " pages available```")
          return null
        }
        txt = await scripts_to_txt(true, page)
      }
      else {
        txt = await scripts_to_txt(true, 1)
      }
      await respond(msg, txt)
    }
    else if (msg.content.trim().toLowerCase() === "*slowclap" || msg.content.trim().toLowerCase() === "*slow clap") {
      await respond(msg, "**👏 CLAP 👏 CLAP 👏**")
    }
    else if (msg.content.substring(0, 6).toLowerCase() === "*spee ") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      let target = await find_target(msg, msg.content.trim().toLowerCase().substring(6))
      if (!target) {
        await respond(msg, "no")
        return null
      }
      else {
        let tid = msg.guild.members.cache.get(target.id).voice.channelId
        let tvc = msg.guild.channels.cache.get(tid)

        if (!tvc) {
          await respond(msg, "```" + target.username + " is not currently in a voice channel```")
          return null
        }
        if (!msg.member.voice.channel) {
          await respond(msg, "```Please join a voice channel first, and then use the command.```")
          return null
        }
        await msg.member.voice.setChannel(tvc.id).catch(e => { msg_user(lieu_id, "" + e); })
        // await client.moveMember(msg.member, msg.guild.channels.cache.find(c => c.id === tvc.id)[1])
        stdic[target.username] = msg.author.username
        if (medic[msg.author.username] === undefined)//(Object.keys(medic).indexOf(target.username) == -1)
        {
          medic[msg.author.username] = []
        }
        medic[msg.author.username].push(msg.guild.members.cache.get(target.id))
      }
    }
    else if (msg.content.trim().toLowerCase() === "*fafa") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      throw "Test"
    }
    else if (msg.content.trim().substring(0, 3).toLowerCase() === "zz " && msg.author.id == "297585199519105024") {
      if (msg.member.voice.channel.name.toLowerCase().indexOf("town") == -1) {
        await respond(msg, "```You have to be in Town Square when you want to join a whisper```")
        return null
      }
      let target = msg.mentions.users.values().next().value
      if (!target) {
        // await respond(msg, "```There are no mentions in your comment!\nCommand usage: *spec <player mention>\nUse *help to learn available commands```")
        let target = await find_target(msg, msg.content.trim().toLowerCase().substring(3))
        if (!target) {
          await respond(msg, "```Player not found! Make sure you use a unique part of their name or tag them with @```")
        }
        else {
          await shadow(msg, target)
        }
        return null
      }
      await shadow(msg, target)
    }
    else if (msg.content.trim().toLowerCase() === "*count" || msg.content.trim().toLowerCase() === "*comp") {
      var pc = 0;
      var tc = 0;
      var res = "";
      try {
        const channels = msg.guild.channels.cache.filter(c => c.parentId === msg.channel.parentId && c.type === 'GUILD_VOICE');
        for (const [channelID, channel] of channels) {
          for (const [memberID, member] of channel.members) {
            if (member.displayName.trim().substring(0, 3).toLowerCase() === "(t)" || member.displayName.trim().substring(0, 3).toLowerCase() === "[t]") {
              tc += 1;
            }
            else if (member.displayName.trim().charAt(0) !== '!' && member.displayName.trim().charAt(0) !== '(' && member.displayName.trim().charAt(0) !== '[') {
              pc += 1;
            }
          }
        }
        if (pc <= 4) {
          await respond(msg, "```There are currently " + (pc) + " players in the voice channels of this channel group, which is not enough for a game\nMinimum: 5 for a teensy game\nMinimum: 7 for a regular game```")
          return null
        }
        if (pc > 15) {
          await respond(msg, "```There are currently " + (pc) + " players in the voice channels of this channel group, which is too many players for a game\nMaximum: 15 regular players (+5 travelers)```")
          return null
        }
        if (pc + tc > 20) {
          await respond(msg, "```There are currently " + (pc) + " players and " + (tc) + " travelers in the voice channels of this channel group, which is too many players for a game\nMaximum: 15 regular players (+5 travelers)```")
          return null
        }
        var ind = pc - 5;
        res += "**>> The current composition of " + (pc + tc) + " players should typically be:**\n";
        res += "- " + comps[ind][0] + " Townsfolk\n";
        if (comps[ind][1] != 0) {
          res += "- " + comps[ind][1] + " Outsiders\n";
        }
        res += "- " + comps[ind][2] + " Minions\n";
        res += "- " + comps[ind][3] + " Demon\n";
        if (tc != 0) {
          res += "- " + tc + " Travelers\n";
        }
        res += "*But remember to pay attention to roles that could affect the setup*"
        await respond(msg, res)
      } catch (Exception) {
        msg_author(msg, "oh no")
      }
    }
    else if (msg.content.trim().substring(0, 8).toLowerCase() === "*fabled " || msg.content.trim().substring(0, 8).toLowerCase() === "*fables " || msg.content.trim().substring(0, 7).toLowerCase() === "*fable ") {
      /*
      let rep = new MessageEmbed()
    .setColor('#ffffff')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: msg.member.displayName, iconURL: msg.author.displayAvatarURL(), url: 'https://discord.js.org' })
    rep.setDescription(desc)
  // .addField('Vote for the script you want to play:', ' ', false)
  // .addField('1', '1- Trouble Brewing', false)
  //  .addField('2', '2- Sects & Violets', false)
  //  .addField('3', '3- Bad Moon Rising', false)
  // .setTimestamp()
  // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  //.addField('Inline field title', 'Some value here', true)
  //.setImage('https://i.imgur.com/AfFp7pu.png')
  //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
  // .setDescription('Vote for the script you want to play:')
  // .setTitle('Script Poll')
  // .addFields(
  // 	{ name: 'Regular field title', value: 'Some value here' },
  // 	// { name: '\u200B', value: '\u200B' },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // )
      */
      let xu = 6
      if (msg.content.trim().substring(0, 8).toLowerCase() === "*fabled " || msg.content.trim().substring(0, 8).toLowerCase() === "*fables ") {
        xu = 7;
      }
      let role_name = msg.content.trim().substring(xu).toLowerCase();
      https.get(fabled_url, async function(res) {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", async function() {
          try {
            body = body.substring(0, body.length - 2) + new_fabled
            let json = JSON.parse(body);
            ////////////////////////

            let mr = await match_role(role_name, json);
            if (mr == -1) {
              await respond(msg, "```Role Not Found.```");
              return null;
            }
            if (json[mr]["sn"] != null) {
              let co = "#ffff00";
              let rep = new MessageEmbed()
                .setColor(co)
              // .setAuthor({ name: json[mr]["name"], iconURL: "https://raw.githubusercontent.com/bra1n/townsquare/develop/src/assets/icons/" + json[mr]["id"] + ".png" })
              rep.setDescription(json[mr]["ability"])
                .setTitle(json[mr]["name"])
                .setThumbnail("https://wiki.bloodontheclocktower.com/images/" + json[mr]["id"][0] + "/" + json[mr]["id"] + "/Icon_" + json[mr]["sn"] + ".png")
              await msg.reply({ embeds: [rep] })
              return null;
            }
            // await respond(msg, "**" + json[mr]["name"] + ":** " + json[mr]["ability"]);

            let co = "#ffff00";
            let rep = new MessageEmbed()
              .setColor(co)
            // .setAuthor({ name: json[mr]["name"], iconURL: "https://raw.githubusercontent.com/bra1n/townsquare/develop/src/assets/icons/" + json[mr]["id"] + ".png" })
            rep.setDescription(json[mr]["ability"])
              .setTitle(json[mr]["name"])
              .setThumbnail("https://raw.githubusercontent.com/tomozbot/botc-icons/refs/heads/main/PNG/" + json[mr]["id"] + ".png")
            await msg.reply({ embeds: [rep] })
          } catch (error) {
            msg_user(lieu_id, error.message);
          };
        });


      }).on("error", (error) => {
        msg_user(lieu_id, error.message);
      });
    }
    else if (msg.content.trim().substring(0, 6).toLowerCase() === "*role ") {
      /*
      let rep = new MessageEmbed()
    .setColor('#ffffff')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: msg.member.displayName, iconURL: msg.author.displayAvatarURL(), url: 'https://discord.js.org' })
    rep.setDescription(desc)
  // .addField('Vote for the script you want to play:', ' ', false)
  // .addField('1', '1- Trouble Brewing', false)
  //  .addField('2', '2- Sects & Violets', false)
  //  .addField('3', '3- Bad Moon Rising', false)
  // .setTimestamp()
  // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  //.addField('Inline field title', 'Some value here', true)
  //.setImage('https://i.imgur.com/AfFp7pu.png')
  //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
  // .setDescription('Vote for the script you want to play:')
  // .setTitle('Script Poll')
  // .addFields(
  // 	{ name: 'Regular field title', value: 'Some value here' },
  // 	// { name: '\u200B', value: '\u200B' },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
  // )
      */
      let role_name = msg.content.trim().substring(6).toLowerCase();
      // try {
      //   let json = JSON.parse(new_roles);
      //   let mr = await match_role(role_name, json);
      //   if (mr != -1) {
      //     let team = "Townsfolk";
      //     let co = "#0049ff";
      //     if (json[mr]["team"] == "outsider") {
      //       co = "#00bbff";
      //       team = "Outsider";
      //     }
      //     if (json[mr]["team"] == "minion") {
      //       co = "#ff8800";
      //       team = "Minion";
      //     }
      //     if (json[mr]["team"] == "demon") {
      //       co = "#ff0000";
      //       team = "Demon";
      //     }
      //     if (json[mr]["team"] == "traveler") {
      //       co = "#ff00ff";
      //       team = "Traveler";
      //     }
      //     let rep = new MessageEmbed()
      //       .setColor(co)
      //     // .setAuthor({ name: json[mr]["name"], iconURL: "https://raw.githubusercontent.com/bra1n/townsquare/develop/src/assets/icons/" + json[mr]["id"] + ".png" })
      //     let scr = "Experimental";
      //     if (json[mr]["edition"] == "tb") {
      //       scr = "Trouble Brewing";
      //     }
      //     if (json[mr]["edition"] == "snv") {
      //       scr = "Sects & Violets";
      //     }
      //     if (json[mr]["edition"] == "bmr") {
      //       scr = "Bad Moon Rising";
      //     }
      //     let setu = "False";
      //     if (json[mr]["setup"]) {
      //       setu = "True";
      //     }
      //     if (json[mr]["sn"] == "Harpy") {
      //       rep.setDescription(json[mr]["ability"] + (setu == "True"? "\n\n**Affects Setup: **" + setu : ""))
      //         .setTitle(json[mr]["name"] + " (" + team + ") - " + scr)
      //         .setThumbnail("https://wiki.bloodontheclocktower.com/images/" + json[mr]["id"][0] + "/" + json[mr]["id"] + "/" + json[mr]["sn"] + ".png")
      //     }
      //     else if (json[mr]["sn"] == "Kazali") {
      //       rep.setDescription(json[mr]["ability"] + (setu == "True"? "\n\n**Affects Setup: **" + setu : ""))
      //         .setTitle(json[mr]["name"] + " (" + team + ") - " + scr)
      //         .setThumbnail("https://wiki.bloodontheclocktower.com/images/" + json[mr]["id"][0] + "/" + json[mr]["id"] + "/" + json[mr]["sn"] + "_icon.png")
      //     }
      //     else {
      //       rep.setDescription(json[mr]["ability"] + (setu == "True"? "\n\n**Affects Setup: **" + setu : ""))
      //         .setTitle(json[mr]["name"] + " (" + team + ") - " + scr)
      //         .setThumbnail("https://wiki.bloodontheclocktower.com/images/" + json[mr]["id"][0] + "/" + json[mr]["id"] + "/Icon_" + json[mr]["sn"] + ".png")
      //     }
      //     await msg.reply({ embeds: [rep] })
      //     return null;
      //   }
      // } catch (error) {
      //   msg_user(lieu_id, error.message);
      // };
      https.get(roles_url, async function(res) {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", async function() {
          try {
            let json = JSON.parse(body);
            ////////////////////////

            let mr = await match_role(role_name, json);
            if (mr == -1) {
              await respond(msg, "```Role Not Found.```");
              return null;
            }
            // await respond(msg, "**" + json[mr]["name"] + ":** " + json[mr]["ability"]);
            let team = "Townsfolk";
            let co = "#0049ff";
            if (json[mr]["team"] == "outsider") {
              co = "#00bbff";
              team = "Outsider";
            }
            if (json[mr]["team"] == "minion") {
              co = "#ff8800";
              team = "Minion";
            }
            if (json[mr]["team"] == "demon") {
              co = "#ff0000";
              team = "Demon";
            }
            if (json[mr]["team"] == "traveler" || json[mr]["team"] == "traveller") {
              co = "#ff00ff";
              team = "Traveler";
            }
            let rep = new MessageEmbed()
              .setColor(co)
            // .setAuthor({ name: json[mr]["name"], iconURL: "https://raw.githubusercontent.com/bra1n/townsquare/develop/src/assets/icons/" + json[mr]["id"] + ".png" })
            let scr = "Experimental";
            if (json[mr]["edition"] == "tb") {
              scr = "Trouble Brewing";
            }
            if (json[mr]["edition"] == "snv") {
              scr = "Sects & Violets";
            }
            if (json[mr]["edition"] == "bmr") {
              scr = "Bad Moon Rising";
            }
            let setu = "False";
            if (json[mr]["setup"]) {
              setu = "True";
            }
            rep.setDescription(json[mr]["ability"] + "\n\n**Affects Setup: **" + setu)
              .setTitle(json[mr]["name"] + " (" + team + ") - " + scr)
              .setThumbnail("https://raw.githubusercontent.com/tomozbot/botc-icons/refs/heads/main/PNG/" + json[mr]["id"] + ".png")
            await msg.reply({ embeds: [rep] })
          } catch (error) {
            msg_user(lieu_id, error.message);
          };
        });


      }).on("error", (error) => {
        msg_user(lieu_id, error.message);
      });
    }
    else if (msg.content.trim().substring(0, 4).toLowerCase() === "*cs ") {
      let car = msg.content.trim().substring(4).toLowerCase().split(" ");
      let s1 = car[0];
      let s2 = car[1];
      // msg_user(lieu_id,car+" "+s1+" "+s2);
      let cc = await txt_compare(s1, s2);
      await respond(msg, "Result: " + cc);
    }
    else if (msg.content.trim().toLowerCase() === "*roles" || msg.content.trim().toLowerCase() === "*almanac") {
      await respond(msg, "https://ryanascherr.github.io/botc")
    }
    // else if (msg.content.substring(0, 6).toLowerCase() === "*addr ") {
    //   let lest = msg.content.substring(6);
    //   let player = "";
    //   for(var i=0;i<lest.length;i++) {
    //     if(lest[i] == " ") {
    //       break;
    //     }

    //   }
    // }
    else if (msg.content.trim().toLowerCase() === "*jinxes" || msg.content.trim().toLowerCase() === "*jinx" || msg.content.trim().toLowerCase() === "*djinn") {
      await respond(msg, jinxes)
    }
    else if (msg.content.trim().toLowerCase() === "*grammar" || msg.content.trim().toLowerCase() === "*grammarguru") {
      if (msg.author.username.toLowerCase() !== "grammarguru" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "Grammar is a Sweetheart!")
    }
    else if (msg.content.substring(0, 6).toLowerCase() === "*crow ") {
      if (msg.author.id !== "352638620542435328" && msg.author.id !== lieu_id) {
        return null
      }
      let txt = msg.content.substring(6);
      await respond(msg, "https://images-ext-2.discordapp.net/external/vEsDxLr6pPkm4lR_tLeXF3rWn4aCVI_jsN4CzEPvfjc/https/media.tenor.com/oBOMt3ltCjYAAAPo/dog-jumps.mp4\nCrow pecks at " + txt + "!\n");
    }
    else if (msg.content.trim().toLowerCase() === "*crow") {
      if (msg.author.id !== "352638620542435328" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://images-ext-1.discordapp.net/external/cws2gxxdm0ZieUPOQrYH6SfEc3rep-kJgz0rD5MPRn8/https/cdn.digg.com/wp-content/uploads/2021/02/21192310/HT_bird4_floating_cf_160526_16x9_1600.jpg?width=840&height=473")
    }
    else if (msg.content.substring(0, 9).toLowerCase() === "*newtown ") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      let tn = msg.content.substring(9);
      await msg.guild.channels.create(tn, { type: "GUILD_CATEGORY" }).then(async function(CategoryChannel) {
        await new Promise(r => setTimeout(r, 250));
        await msg.guild.channels.create('Town Square', { type: 'GUILD_VOICE', parent: CategoryChannel }).catch(async function(err) { await respond(msg, "```Error while creating town square```") });
        await new Promise(r => setTimeout(r, 250));
        await msg.guild.channels.create('Storyteller Consultation', { type: 'GUILD_VOICE', parent: CategoryChannel }).catch(async function(err) { await respond(msg, "```Error while creating st consult```") })
      }).catch(async function(err) { await respond(msg, "```Error while creating town```") })
      await new Promise(r => setTimeout(r, 250));
      await msg.guild.channels.create(tn + " Cottages", { type: "GUILD_CATEGORY" }).then(async function(CategoryChannel) {
        for (var i = 0; i < 20; i++) {
          await msg.guild.channels.create('Cottage ' + (i + 1), { type: 'GUILD_VOICE', parent: CategoryChannel }).catch(async function(err) { await respond(msg, "```Error while creating cottage " + (i + 1) + "```") })
          await new Promise(r => setTimeout(r, 500));
        }
      }).catch(async function(err) { await respond(msg, "```Error while creating cottage town```") })

      await respond(msg, "```Town & Cottages created successfully!```");
    }
    else if (msg.content.trim().toLowerCase() === "*oopsallpithags" ||
      msg.content.trim().toLowerCase() === "*oops" ||
      msg.content.trim().toLowerCase() === "*oap") {
      await respond(msg, oap_wel);
      await new Promise(r => setTimeout(r, 250));
      await respond(msg, oap_gen);
      await new Promise(r => setTimeout(r, 250));
      await respond(msg, oap_no);
      await new Promise(r => setTimeout(r, 250));
      await respond(msg, oap_jinx);
      await new Promise(r => setTimeout(r, 250));
      await respond(msg, oap_ban);
      await new Promise(r => setTimeout(r, 250));
    }
    else if (msg.content.trim().toLowerCase() === "*hey" || msg.content.trim().toLowerCase() === "*hi") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "Hi LieutenantDV20 <3")
    }
    else if (msg.content.trim().toLowerCase() === "*gather") {
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() != "(st)") {
        return null
      }
      await respond(msg, "# Nomination time!\n### Please make your way back to town");
    }
    else if (msg.content.trim().toLowerCase() === "*noms") {
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() != "(st)") {
        return null
      }
      await respond(msg, "# Nominations are now open!");
    }
    else if (msg.content.trim().toLowerCase() === "*noms2" || msg.content.trim().toLowerCase() === "*second") {
      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() != "(st)") {
        return null
      }
      await respond(msg, "# Second call for nominations");
    }
    else if (msg.content.trim().toLowerCase() === "*strules" || msg.content.trim().toLowerCase() === "*st-rules") {
      await respond(msg, "https://cdn.discordapp.com/attachments/851568034182725673/1375077292270813305/image.png?ex=68437dc6&is=68422c46&hm=bc94292358a827db3eb56973ca72a2a97245f0b764b9e31b15e776ef00ad2536&");
    }
    else if (msg.content.trim().toLowerCase() === "*stguide" || msg.content.trim().toLowerCase() === "*st-guide") {
      if (msg.guild.id != "569683781800296501") {
        return null
      }
      await respond(msg, "https://cdn.discordapp.com/attachments/851568034182725673/1375230629263835278/Overtalking_Final.jpg?ex=684363d4&is=68421254&hm=9697df98f628916037519385d06b81a7d19692fb78f55925222f2011f987e341&");
    }
    else if (msg.content.trim().toLowerCase() === "*exitserver") {
      if (msg.author.id !== lieu_id) {
        return null
      }
      await msg.guild.leave();
    }
    else if (msg.content.trim().toLowerCase() === "*moon") {
      if (msg.author.id != "1194403683300032612" && msg.author.id !== lieu_id) {
        return null
      }
      let rnd = Math.floor(Math.random() * 10);
      if (rnd < 5)
        await respond(msg, "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/2baaeccd-9bdf-45aa-b0d7-9552b52d9636/3bb27302-7c69-4c49-a770-4e267b70eaf8.png")
      else
        await respond(msg, "https://cdn.discordapp.com/attachments/1234778104657088565/1379761023665307679/good-night-moon.gif?ex=68436456&is=684212d6&hm=d16fcf540043260d5dedfd2362252aeae7279989fbfd85dcb30653bdf60ff2b3&")
    }
    else if (msg.content.trim().toLowerCase() === "*luc") {
      if (msg.author.id != "231515768750080000" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://cdn.discordapp.com/attachments/851568034182725673/1304827352160927775/kids-goku-peace.gif?ex=67356beb&is=67341a6b&hm=ce0282e0e37b4fcb97ecddf805bd310d0bc34f0beeb5fe4850d4711647c96d50&")
    }
    else if (msg.content.trim().toLowerCase() === "*lucas") {
      if (msg.author.id != "231515768750080000" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://cdn.discordapp.com/attachments/851568034182725673/1304827352756256788/kid-goku-orange-stars-wallpaper-scaled.png?ex=67356beb&is=67341a6b&hm=e1741e5ced68ca41f97098b268c23d256d85d8c7fa8b3acf6e95b796a24d970c&")
    }
    else if (msg.content.trim().toLowerCase() === "*sun") {
      if (msg.author.id != "698218440065810452" && msg.author.id !== lieu_id) {
        return null
      }
      let rnd = Math.floor(Math.random() * 10);
      if (rnd < 5)
        await respond(msg, "https://cdn.discordapp.com/attachments/1149152764438515823/1358631960439947314/catty.gif?ex=67f48c1d&is=67f33a9d&hm=4960826b8b49927e6d813e1eaad11c089fbe59bb6fbe03bf127b95f1b40a7d2c&")
      else
        await respond(msg, "https://cdn.discordapp.com/attachments/1149152764438515823/1358631960792141966/elephant.gif?ex=67f48c1d&is=67f33a9d&hm=029c6e1b9b67d3dd9c028018ef57725c21fb2bddbf523b4e16c4a4aca1729693&")
    }
    else if (msg.content.trim().toLowerCase() === "*kaz") {
      if (msg.author.username.toLowerCase() !== "kaz" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://tenor.com/view/kaz-sh1g30-gif-21992868")
    }
    else if (msg.content.trim().toLowerCase() === "*kaz2") {
      if (msg.author.username.toLowerCase() !== "kaz" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://images-ext-2.discordapp.net/external/B1fOrR4Uljv4SxEMzM2xSmL1XRmho93qO52kYoyKITM/https/ih1.redbubble.net/image.3303932569.5693/poster%2C504x498%2Cf8f8f8-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473")
    }
    else if (msg.content.trim().toLowerCase() === "*kaz3") {
      if (msg.author.username.toLowerCase() !== "kaz" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://images-ext-2.discordapp.net/external/jeaqVEpmnK7_N5VvpuRNc2R8ZSq1ZiJzSuaO6e4xeX0/https/ih1.redbubble.net/image.3303847371.3570/poster%2C504x498%2Cf8f8f8-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473")
    }
    else if (msg.content.trim().toLowerCase() === "*kaz4") {
      if (msg.author.username.toLowerCase() !== "kaz" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://images-ext-2.discordapp.net/external/E-EdVgW1Z2U5vHYfvfHd58fyS9IRQQbr9viH8bMTo4A/https/c4.wallpaperflare.com/wallpaper/878/833/189/death-rape-meme-sadist-murder-kill-duck-uncle-dolan-1920x1080-animals-ducks-hd-art-wallpaper-preview.jpg")
    }
    else if (msg.content.trim().toLowerCase() === "*kaz5") {
      if (msg.author.username.toLowerCase() !== "kaz" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://images-ext-1.discordapp.net/external/jr2tAq3yURR5WuxUWXT7CIRrX7rMozLKR_s2PV5EwyA/%3Fr%3DgUndpoJwOFKb3jMbEgFLXRCAuhBvB8HFxTgwMUdTJLBf5EAZjfpKrsyDM3QqGW2-IvmuckiOdujod1nmio2qtIxEDCp800AYklghHuAr6NXHiVz9q0fF4kpKDLdv2v1dO5CzZV_Ae6LZXiHwKRnza9TOS2Tmg78wphlPEvzUIQ0i-jamgHT0TXVo8LA/https/fsb.zobj.net/crop.php?width=233&height=473")
    }
    else if (msg.content.trim().toLowerCase() === "*blue") {
      if (msg.author.username.toLowerCase() !== "blue" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://tenor.com/view/blue-da-ba-dee-eiffel65-gif-14330492")
    }
    else if (msg.content.trim().toLowerCase() === "*raving") {
      if (msg.author.username.toLowerCase() !== "ravinglunatic" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "https://tenor.com/view/james-acaster-bakeoff-james-acaster-bon-appetit-gif-14643809")
    }
    else if (msg.content.trim().toLowerCase() === "*nine") {
      if (msg.author.username.toLowerCase() !== "nine" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "```arm\nNine could never be the demon 😌\n```")
    }
    else if (msg.content.trim().toLowerCase() === "*9") {
      if (msg.author.username.toLowerCase() !== "nine" && msg.author.id !== lieu_id) {
        return null
      }
      await respond(msg, "```arm\nNine my beloved 😈\n```")
    }
    else if (msg.content.trim().toLowerCase().substring(0, 4) === "*sp " || msg.content.trim().toLowerCase().substring(0, 12) === "*secretpoll ") {
      if (msg.guild.id != "840323781066489946" && msg.guild.id != "569683781800296501" && msg.guild.id != "930132389592715274" && msg.guild.id != "996462531038171136") {
        return null
      }
      ops = msg.content.trim().split(" ")
      ops.splice(0, 1)
      let items = []
      let question = ""
      if (ops.length == 0) {
        return null
      }
      if (ops.length == 2) {
        await respond(msg, "```Not enough options```")
        return null
      }
      if (ops.length == 1) {
        if (msg.guild.id == "569683781800296501") {
          await respond(msg, "```Not enough options```")
          return null
        }
        ops = ops[0]
        if (ops.toLowerCase().indexOf("r") > -1) {
          items.push("**Ravenclaw:**\n*Majority -1 Vote*")
        }
        if (ops.toLowerCase().indexOf("h") > -1) {
          items.push("**Hufflepuff:**\n*Can't Nominate Neighbors*")
        }
        if (ops.toLowerCase().indexOf("g") > -1) {
          items.push("**Gryffindor:**\n*Whispers Only 3 Players*")
        }
        if (ops.toLowerCase().indexOf("s") > -1) {
          items.push("**Slytherin:**\n*Nominators Safe From Execution*")
        }
        if (items.length < 2) {
          await respond(msg, "```Not enough options```")
          return null
        }
      }
      else {
        let txt = msg.content.trim().substring(msg.content.trim().indexOf(" ") + 1)
        let tmp = ""
        let open = false
        for (var i = 0; i < txt.length; i++) {
          if (txt[i] == "\"") {
            open = !open
            if (!open && question.length == 0 && tmp.length > 0) {
              question = tmp
              tmp = ""
            }
            else if (!open && tmp.length > 0) {
              items.push(tmp)
              tmp = ""
            }
          }
          else {
            if (!open && txt[i] == " " && tmp.length > 0) {
              if (question.length == 0) {
                question = tmp
              }
              else {
                items.push(tmp)
              }
              tmp = ""
            }
            else if (open || txt[i] != " ") {
              tmp += txt[i]
            }
          }
        }
        if (tmp.length != 0) {
          items.push(tmp)
        }
        if (items.length < 2) {
          await respond(msg, "```Not enough options```")
          return null
        }
      }
      await secret_poll(msg, question, items)
    }
    else if (msg.content.trim().toLowerCase().substring(0, 5) === "*poll") {
      sel = []
      if (msg.content.trim().toLowerCase().indexOf("1") > -1) {
        sel.push(1)
      }
      if (msg.content.trim().toLowerCase().indexOf("2") > -1) {
        sel.push(2)
      }
      if (msg.content.trim().toLowerCase().indexOf("3") > -1) {
        sel.push(3)
      }
      let c = (msg.content.trim().toLowerCase().indexOf("c") > -1)
      let h = (msg.content.trim().toLowerCase().indexOf("h") > -1)
      await respolld(msg, c, h, sel)
    }
    else if (msg.content.trim().toLowerCase() === "*joke") {
      let jokes = ["*Getting rid of your shadows will make you.. Lighter!*",
        "*What do you call a teamup between the Witch and Boomdandy minions? A Broomdandy!*",
        "*The Imp and his minion were both pinged as evil on N1.. Winning that game was Imp-ossible.*",
        "*The townsfolks got into such a heated debate, the outsider couldn't get a Saintence in.*",
        "*The Pacifist is a townsfolk :)*",
        "*What's the difference between the Golem and the Pacifist? One is a very helpful and cool townsfolk ability and the other is the Pacifist.*",
        "*What shampoo does the Psychopath use? the Ro shampoo*",
        "*What do you call the Heretic when they stay away? Theretic*",
        "*What do you call a minion who's never been harmed? a Scarless Woman*",
        "*The SNV game had a lot of info, yet the good team still couldn't Vigor it out*",
        "*Why does TB need an upgrade? because the Virgin is Out-dated!*",
        "*The only reading a librarian can't do is social reading*",
        "*What do you call a generous Undertaker? an Overgiver*",
        "*Having a poisoner and a spy meant solving the game was hard, and things spyralled out of control.*",
        "*Fangu in the summer, Heatergu in the winter*",
        "*What do you call a heretic who's staying away? theretic*",
        "*What happens when you execute a good twin? Evil tWins!*",
        "*She trusted him, but he soldier out! (you know, like sold her out)*",
        "*What's a Townsfolk's favorite condoment? Mayornaise*",
        "*Why is the mayor always frustrated at f3? because he mayor may not be able to use his ability*",
        "*What do you call a confident Mayor? Definitelyor*",
        "*The minion were caught in a double claim! It made them really cerenervous*",
        "*The demon thought his minion didn't know this, but the cere did novus*",
        "*When it was time for the witch to curse, they said some really nasty stuff!*",
        '*"We all face an important decision in our lives", said the Philosopher, "Dreamer or Snakecharmer?"*',
        "*How do you add an 'S' to the imp? You give him a Scarlet Woman*",
        "*What do you call an iron deficient BOTC player? an Amnemiac*"]
      let rnd = Math.floor(Math.random() * jokes.length)
      while (rnd == last_joke) {
        rnd = Math.floor(Math.random() * jokes.length)
      }
      last_joke = rnd
      await respond(msg, jokes[rnd])
    }
    else if (msg.content.trim().substring(0, 6).toLowerCase() === "*grim " || msg.content.trim().substring(0, 6).toLowerCase() === "*link ") {
      // if(msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
      //   await respond(msg, "```Only Storytellers and Co-Storytellers can set the grim link.```")
      //   return null
      // }
      // else {
      //   grim_link = msg.content.trim().substring(6)
      //   if(grim_link.trim().toLowerCase().substring(0, 27).trim() !== "https://clocktower.online/#") {
      //     grim_link = -1
      //     await respond(msg, "```Please provide a link to the grim in the command.```")
      //     return null
      //   }
      //   grim_setter = msg.author.username
      //   await respond(msg, "```Grim link set to "+grim_link+"\nPlayers can get the link by using the command *grim```")
      // }
      x = msg.content.trim().substring(6)
      if (x.trim().toLowerCase().substring(0, 27).trim() !== "https://clocktower.online/#" && x.trim().toLowerCase().substring(0, 25).trim() !== "https://clocktower.live/#" && x.trim().toLowerCase().substring(0, 28).trim() != "https://yoyosource.github.io") {
        await respond(msg, "```Please provide a link to the grim in the command.```")
        // return null
      }
      else if (msg.member.displayName.trim().substring(0, 4).toLowerCase() == "(st)" || msg.member.displayName.trim().substring(0, 6).toLowerCase() == "(cost)" || msg.member.displayName.trim().substring(0, 7).toLowerCase() == "(co-st)") {
        grim_link = -1
        grim_setter = -1
        grim_serv = -1
        let fnd = -1
        for (var i = 0; i < grim_setters.length; i++) {
          if (grim_setters[i].user.username === msg.author.username) {
            fnd = i
          }
          else if (grim_setters[i].voice.channelId == null) {
            grim_links.splice(i, 1)
            grim_setters.splice(i, 1)
            grim_servs.splice(i, 1)
            i--
          }
        }
        if (fnd != -1) {
          grim_links[fnd] = msg.content.trim().substring(6)
          grim_servs[fnd] = msg.guild.id
        }
        else {
          grim_setters.push(msg.member)
          grim_links.push(msg.content.trim().substring(6))
          grim_servs.push(msg.guild.id)
        }
        for (var i = 0; i < grim_links.length; i++) {
          for (var j = i + 1; j < grim_links.length; j++) {
            if (grim_links[i] == grim_links[j] && grim_servs[i] == grim_servs[j]) {
              grim_links.splice(i, 1)
              grim_setters.splice(i, 1)
              grim_servs.splice(i, 1)
              i--
            }
          }
        }
        await respond(msg, "```Grim link " + msg.content.trim().substring(6) + " added by " + msg.member.displayName + "\nPlayers can get the link by using the command *grim```")
        // grim_link = msg.content.trim().substring(6)
        // grim_setter = msg.author.username
        // return null
      }
      else {
        x = msg.content.trim().substring(6)
        for (var i = 0; i < grim_links.length; i++) {
          if (grim_links[i] == x) {
            // return null
          }
        }
        grim_link = msg.content.trim().substring(6)
        // if(grim_link.trim().toLowerCase().substring(0, 27).trim() !== "https://clocktower.online/#") {
        //   grim_link = -1
        //   await respond(msg, "```Please provide a link to the grim in the command.```")
        //   return null
        // }
        grim_setter = msg.author.username
        grim_serv = msg.guild.id
        await respond(msg, "```Grim link " + msg.content.trim().substring(6) + " added by " + msg.member.displayName + "\nPlayers can get the link by using the command *grim```")
      }

    }
    else if (msg.content.trim().toLowerCase() === "*links") {
      if (msg.author.id != lieu_id) {
        return null
      }
      if (grim_link == -1 && grim_links.length == 0) {
        await respond(msg, "```No links to a grim are currently added.\nUsers can add a link to a grim as such:\n*grim <link>```")
      }
      else {
        let rep = ""
        for (var i = 0; i < grim_links.length; i++) {
          // if (grim_servs[i] == msg.guild.id) {
          rep += "-> Grim link provided by " + grim_setters[i].displayName + ":\n"
          rep += "<" + grim_links[i] + ">\n"
          // }
        }
        // if (grim_serv == msg.guild.id) {
        rep += "-> Grim link provided by " + grim_setter + ":\n"
        rep += "<" + grim_link + ">\n"
        // }
        if (rep.length == 0) {
          await respond(msg, "```No links to a grim are currently added.\nUsers can add a link to a grim as such:\n*grim <link>```")
          return null
        }
        await respond(msg, rep)
      }
    }
    else if (msg.content.trim().toLowerCase() === "*grim" || msg.content.trim().toLowerCase() === "*link") {

      if (grim_link == -1 && grim_links.length == 0) {
        await respond(msg, "```No links to a grim are currently added.\nUsers can add a link to a grim as such:\n*grim <link>```")
      }
      else {
        let rep = ""
        for (var i = 0; i < grim_links.length; i++) {
          if (grim_servs[i] == msg.guild.id) {
            rep += "-> Grim link provided by " + grim_setters[i].displayName + ":\n"
            rep += "<" + grim_links[i] + ">\n"
          }
        }
        if (grim_serv == msg.guild.id) {
          rep += "-> Grim link provided by " + grim_setter + ":\n"
          rep += "<" + grim_link + ">\n"
        }
        if (rep.length == 0) {
          await respond(msg, "```No links to a grim are currently added.\nUsers can add a link to a grim as such:\n*grim <link>```")
          return null
        }
        await respond(msg, rep)
      }
    }
    else if (msg.content.trim().toLowerCase() === "*report") {
      if (msg.author.id === lieu_id) {
        var rep = "Report:\n"
        for (var key in medic) {
          if (medic[key] !== undefined) {
            if (medic[key] == -1) {
              rep += "- " + key + ": Do Not Disturb\n"
            }
          }
        }
        rep += "\n"
        for (var key in stdic) {
          if (stdic[key] !== undefined) {
            rep += "- " + key + ": Shadowing " + stdic[key] + "\n"
          }
        }
        msg.author.send(rep).catch(async function(err) { await respond(msg, "```Error while sending report```") })
      }
    }
    else if (msg.content.trim().toLowerCase() === "*help") {
      await respond(msg, "```The list of commands has been sent to you in a direct message.```")
      if (msg.guild.id === "569683781800296501") {
        await msg_author(msg, helptxt)
        await msg_author(msg, helptxt2)
        await msg_author(msg, helptxt3)
      }
      else if (msg.guild.id === "840323781066489946") {
        await msg_author(msg, helptxt_ecg)
        await msg_author(msg, helptxt_ecg2)
        await msg_author(msg, helptxt_ecg3)
      }
      else {
        await msg_author(msg, helptxt_other)
        await msg_author(msg, helptxt_other2)
        await msg_author(msg, helptxt_other3)
      }
      await new Promise(r => setTimeout(r, 2500));
      await msg.delete().catch(e => { msg_user(lieu_id, "" + e); })
    }
    else if (msg.content.trim().toLowerCase().indexOf("https://clocktower.online/#") > -1 || msg.content.trim().toLowerCase().indexOf("https://clocktower.live/#") > -1 || msg.content.trim().toLowerCase().indexOf("https://yoyosource.github.io/") > -1) {

      if (msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
        // return null
      }
      else {
        // msg_user(lieu_id,"CAUGHT ST LINK");
        thelink = ""
        for (var i = msg.content.trim().toLowerCase().indexOf("https://clocktower."); i < msg.content.trim().length; i++) {
          if (msg.content.trim()[i] == " ") {
            break
          }
          thelink += msg.content.trim()[i]
        }
        // if(msg.content.trim() === grim_link) {
        grim_link = -1
        grim_setter = -1
        grim_serv = -1
        // }
        let fnd = -1
        for (var i = 0; i < grim_setters.length; i++) {
          if (grim_setters[i].user.username === msg.author.username) {
            fnd = i
          }
          else if (grim_setters[i].voice.channelId == null) {
            grim_links.splice(i, 1)
            grim_setters.splice(i, 1)
            grim_servs.splice(i, 1)
            i--
          }
        }
        if (fnd != -1) {
          grim_links[fnd] = thelink
          grim_servs[fnd] = msg.guild.id
        }
        else {
          grim_setters.push(msg.member)
          grim_links.push(thelink)
          grim_servs.push(msg.guild.id)
        }
        for (var i = 0; i < grim_links.length; i++) {
          for (var j = i + 1; j < grim_links.length; j++) {
            if (grim_links[i] === grim_links[j]) {
              grim_links.splice(i, 1)
              grim_setters.splice(i, 1)
              grim_servs.splice(i, 1)
              i--
            }
          }
        }
        // grim_link = msg.content.trim().substring(6)
        // grim_setter = msg.author.username
        await respond(msg, "```Grim link " + thelink + " added by " + msg.member.displayName + "\nPlayers can get the link by using the command *grim```")
        // return null
        // grim_link = msg.content.trim()
        // if(!validURL(grim_link)) {
        //   grim_link = -1
        //   return null
        // }
        // grim_setter = msg.author.username
        // await respond(msg, "```Grim link set to "+grim_link+"\nPlayers can get the link by using the command *grim```")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*dnd") {
      if (medic[msg.author.username] == -1) {
        delete medic[msg.author.username]
        await respond(msg, "```You are no longer in Do Not Disturb mode.```")
      }
      else {
        medic[msg.author.username] = -1
        await respond(msg, "```Your shadows have been removed and you are now in Do Not Disturb mode```")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*rp" || msg.content.trim().toLowerCase() === "*randomplayer") {
      try {

        const channels = msg.guild.channels.cache.filter(c => c.parentId === msg.channel.parentId && c.type === 'GUILD_VOICE');
        players = []
        for (const [channelID, channel] of channels) {
          for (const [memberID, member] of channel.members) {
            if ((member.displayName.trim().substring(0, 3).toLowerCase() === "(t)" || member.displayName.trim().substring(0, 3).toLowerCase() === "[t]")
              || (member.displayName.trim().charAt(0) !== '!' && member.displayName.trim().charAt(0) !== '(' && member.displayName.trim().charAt(0) !== '[')) {
              players.push(member.displayName)
            }
          }
        }
        if (players.length == 0) {
          await respond(msg, "```There are currently no players in the voice channels of this channel group```")
          return null
        }
        let r = Math.floor((Math.random() * players.length));
        await respond(msg, "The random player you received is:\n**" + players[r] + "**")
      } catch (Exception) {
        await msg_author(msg, "oh no")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*info" || msg.content.trim().toLowerCase() === "*basics") {
      // await respond(msg, "Test");
      await respond(msg, "**<[=+----+={ Welcome to Blood On The Clocktower }=+----+=]>**\n\n**The Storyteller will message you during the game, remember to check your message requests!**\n----------------------------\n**<[=+----+={  Bra1n Tool Basics  }=+----+=]>**\n\n**1- Click** on your **name** on the grim and choose **Claim Seat** to claim your seat.\n**2- Press R** to see the **Role Sheet**.\n**3- Press V** to see the **Vote History**.\n**4- Press N** to see the roles' **Night Order**.\n\n**<[=+----+={  Basic BOTC Slang Terminology  }=+----+=]>**\n\n**Starpass:** The Imp can kill themselves, and an alive minion becomes the new Imp.\n**Mayor Bounce:** If the Demon attacks the Mayor in the night, another player might die instead (ST Chooses whether that happens and who gets killed instead).\n**Three-for-three or Two-for-Two:** The players exchange a number of roles, and would *typically* include their real role.\n**Hard Claim:** A claim of a single role that is *supposed* to be the player's real role.\n**Pings:** A player having pings on them means there's information pointing to what their role or alignment might be. (e.g Washerwoman, Investigator, Fortune Teller, etc).\n**Evil Ping:** When information points to someone being potentially evil. (e.g. Investigator, Empath, etc)\n**Proc:** To trigger a trigger-based ability. (e.g Virgin).\n**Top Four:** Top 4 roles of the role sheet, More specifically the roles that get all of their information on the first night of the game.")
    }
    else if (msg.content.trim().toLowerCase() === "*ma" || msg.content.trim().toLowerCase() === "*muteall" || msg.content.trim().toLowerCase() === "*mute-all" || msg.content.trim().toLowerCase() === "*mute all") {
      try {
        if (msg.guild.id != "840323781066489946") {
          return null
        }
        else if (msg.member.displayName.trim().length >= 4 &&
          msg.member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" &&
          !(msg.member.roles.cache.some(role => role.name === 'ECG Admins')) &&
          !(msg.member.roles.cache.some(role => role.name === 'BOTC Mentor'))) {
          return null
        }
        let cid = msg.member.voice.channel
        if (!cid) {
          await respond(msg, "```You have to be in a voice channel to mute the players in it.```")
          return null
        }
        for (const [memberID, member] of cid.members) {
          if (member.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" &&
            !(msg.member.roles.cache.some(role => role.name === 'ECG Admins')) &&
            !(msg.member.roles.cache.some(role => role.name === 'BOTC Mentor'))) {
            member.voice.setMute(true);
          }
        }
        await respond(msg, "```Others have been muted.```")
      } catch (Exception) {
        msg_author(msg, "oh no")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*uma" || msg.content.trim().toLowerCase() === "*unmuteall" || msg.content.trim().toLowerCase() === "*unmute-all" || msg.content.trim().toLowerCase() === "*umute all") {
      try {
        if (msg.guild.id != "840323781066489946") {
          return null
        }
        let cid = msg.member.voice.channel
        if (!cid) {
          await respond(msg, "```You have to be in a voice channel to unmute the players in it.```")
          return null
        }
        for (const [memberID, member] of cid.members) {
          member.voice.setMute(false);
        }
      } catch (Exception) {
        msg_author(msg, "oh no")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*um" || msg.content.trim().toLowerCase() === "*unmute") {
      try {
        if (msg.guild.id != "840323781066489946") {
          return null
        }
        msg.member.voice.setMute(false);
      } catch (Exception) {
        msg_author(msg, "oh no")
      }
    }
    else if (msg.content.trim().toLowerCase() === "*travelers" || msg.content.trim().toLowerCase() === "*travellers") {
      await respond(msg, "**<[=+----+={ Travellers Guide }=+----+=]>**\n**Travelers** are a special type of roles given to players who join the game late or have to leave it before it finishes. Typically powerful, their alignment (Good/Evil) is decided by the Storyteller as soon as they join.\n**If Evil**, they learn who the demon is, Evil players do **not learn** if the traveler is evil.\nA traveler cannot be **executed** instead they are **exiled**; Once per day any player, dead or alive, can call for the exile of the traveler, **all players** whether alive, dead or without a dead vote can still vote on the exile, dead votes are not spent when dead players vote on the exile. The majority required is relative to the number of all players, not just the alive ones.")
    }
    else if (msg.content.trim().toLowerCase() === "*feedback") {
      if (msg.guild.id !== "569683781800296501") {
        return null
      }
      await respond(msg, "Leave your feedback for the Storyteller by filling the following form:\n<https://docs.google.com/forms/d/e/1FAIpQLSduvl3LXwlenwc-uomQhiMY4iKOtjvSEF4jVezQMJGvATltQQ/viewform>")
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (msg.content.trim().toLowerCase() === "*test") {
      if (msg.author.id != lieu_id) {
        return null;
      }
      for (var i = 1; i <= 25; i++) {
        await send_message(msg, "test " + i);
        await new Promise(r => setTimeout(r, 200));
        if (i % 5 == 0) {
          await new Promise(r => setTimeout(r, 2600));
        }
      }
    }
    else if (msg.content.trim().toLowerCase() === "*test2") {
      if (msg.guild.id != "886493912506716190") {
        return null;
      }
      const strole = msg.guild.roles.cache.get("1005037278751621131");
      msg.member.roles.remove(strole).catch(err => { msg_user(lieu_id, "" + err); });
    }
    else if (msg.content.trim().toLowerCase() === "*pause") {
      if (msg.author.id != lieu_id) {
        return null
      }
      await respond(msg, "Pause");
      responding = false;
      await new Promise(r => setTimeout(r, 10000));
      await respond(msg, "Unpause");
      responding = true;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////
    // msg_user(lieu_id,msg.content.trim().toLowerCase().indexOf("https://clocktower.online/#"));
    if ((msg.content.trim().toLowerCase().indexOf("https://clocktower.online/#") > -1 || msg.content.trim().toLowerCase().indexOf("https://clocktower.live/#") > -1 || msg.content.trim().toLowerCase().indexOf("https://yoyosource.github.io/") > -1) && !msg.author.bot) {
      // msg_user(lieu_id,"TEST1");
      if (msg.content.trim().toLowerCase().indexOf("*grim") == -1 && msg.content.trim().toLowerCase().indexOf("*link") == -1 && msg.member.displayName.trim().substring(0, 4) != "(ST)" && msg.member.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && msg.member.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
        await new Promise((resolve, fail) => { setTimeout(async function(resolve) { await msg.suppressEmbeds(true).catch(e => { msg_user(lieu_id, "" + e); }); respond(msg, "```If you are playing: Follow the link provided above, find your name, and click on \"Claim Seat\"```"); }, 400) });
      }
      else {
        await new Promise((resolve, fail) => { setTimeout(async function(resolve) { await msg.suppressEmbeds(true).catch(e => { msg_user(lieu_id, "" + e); }); }, 400) });
      }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
  })


client.on('voiceStateUpdate', async function(oldState, newState) {
  if (!responding) {
    return null
  }
  if (oldState.channelId === newState.channelId) {
    // msg_user(lieu_id,'a user has not moved!')
  }
  if (oldState.channelId != null && newState.channelId != null && newState.channelId != oldState.channelId) {
    // msg_user(lieu_id,'a user switched channels')
    // await new Promise(resolve => setTimeout(resolve, 1000));
    if (newState.channel.name.toLowerCase().indexOf("town") != -1 && newState.member.user.id == "297585199519105024" && newState.member.displayName[0] != '!') {
      delete stdic[newState.member.user.username];
      return null
    }
    if (medic[newState.member.user.username] !== undefined && medic[newState.member.user.username] != -1)//(Object.keys(medic).indexOf(newState.member.user.username) != -1)
    {
      let movs = 0;
      var specs = medic[newState.member.user.username]
      for (var i = 0; i < specs.length; i++) {
        if (stdic[specs[i].user.username] == newState.member.user.username)//(Object.keys(stdic).indexOf(specs[i].user.username) != -1 && stdic[specs[i].user.username] == newState.member.user.username)
        {
          if (specs[i].displayName.charAt(0) != '!' && specs[i].displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && specs[i].displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && specs[i].displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" && specs[i].user.id != "297585199519105024") {
            specs.splice(i, 1)
            i--
            continue
          }
          if (specs[i].voice.channelId != newState.member.voice.channelId) {
            await specs[i].voice.setChannel(newState.member.voice.channelId).catch(e => { msg_user(lieu_id, "" + e); })
            await new Promise(r => setTimeout(r, 200));
            movs += 1;
            if (movs == 5) {
              await new Promise(r => setTimeout(r, 2600));
              movs = 0;
            }
            // //await specs[i].move_member(newState.member.voice.channelId)
            // // await client.move_member(specs[i], client.get_channel(newState.member.voice.channelId))
            // await client.moveMember(specs[i], msg.guild.channels.cache.find(c => c.id === newState.member.voice.channelId)[1])
          }
        }
        else {
          specs.splice(i, 1)
          i--
        }
      }
    }
  }
  if (oldState.channelId === null) {
    // if (newState.guild.id == "569683781800296501" && newState.member.displayName.trim().substring(0, 4).toLowerCase() == "(st)") {
    //   if (!st_list.includes(newState.user.id))
    //   {
    //     if (st_list.length() < 4)
    //       st_list.append(newState.user.id);
    //     else
    //       st_list[stlc] = newState.user.id;
    //     stlc = (stlc + 1) % 4;
    //     msg_user(lieu_id,"THIS IS WORKING!!");
    //     await ping_players(newState.member.displayName, newState.channel);
    //   }
    // }
  }
  if (newState.channelId === null) {
    for (var i = 0; i < pinfo.length; i++) {
      if (newState.member.user.username === pinfo[i][0] && newState.member.guild.id === pinfo[i][1]) {
        pinfo.splice(i, 1);
        i--;
      }
    }
    for (var i = 0; i < grim_setters.length; i++) {
      if (newState.member.user.username === grim_setters[i].user.username) {
        // grim_setter = grim_setters[i]
        // grim_link = grim_links[i]
        grim_setters.splice(i, 1)
        grim_links.splice(i, 1)
        grim_servs.splice(i, 1)
        break
      }
    }
    // msg_user(lieu_id,'a user left!')
    if (medic[newState.member.user.username] !== undefined && medic[newState.member.user.username] != -1)//(Object.keys(medic).indexOf(newState.member.user.username) != -1)
    {
      var specs = medic[newState.member.user.username]
      for (var i = 0; i < specs.length; i++) {
        if (stdic[specs[i].user.username] == newState.member.user.username) {
          delete stdic[specs[i].user.username]
        }
      }
    }
    if (medic[newState.member.user.username] != -1) {
      delete medic[newState.member.user.username]
    }
    delete stdic[newState.member.user.username]
  }
});

client.on('guildMemberUpdate', async function(oldMember, newMember) {
  if (!responding) {
    return null
  }
  if (oldMember.displayName.trim().charAt(0) != '!' && newMember.displayName.trim().charAt(0) == '!') {
    for (var i = 0; i < pinfo.length; i++) {
      if (pinfo[i][0] == newMember.user.username && pinfo[i][1] == newMember.guild.id) {
        pinfo.splice(i, 1);
        i--;
      }
    }
  }
  //   // msg_user(lieu_id,oldMember.displayName)
  //   // msg_user(lieu_id,newMember.displayName)
  //   remove role discord.js

  //   const Role = message.guild.roles.cache.get("RoleID");
  //   Role.members.forEach((member, i) => { // Looping through the members of Role.
  //       setTimeout(() => {
  //           member.roles.remove(Role); // Removing the Role.
  //       }, i * 1000);
  //   });

  if (newMember.displayName && oldMember.displayName != newMember.displayName) {
    if (newMember.displayName.charAt(0) != '!' && newMember.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && newMember.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && newMember.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)") {
      delete stdic[newMember.user.username]
    } //tofix: comment out part below
    // if (oldMember.displayName.trim().substring(0, 4).toLowerCase() === "(st)" && newMember.displayName.trim().substring(0, 4).toLowerCase() !== "(st)") {
    //   for (var i = 0; i < grim_setters.length; i++) {
    //     if (grim_setters[i].user.username === oldMember.user.username) {
    //       grim_setters.splice(i, 1)
    //       grim_links.splice(i, 1)
    //       grim_servs.splice(i, 1)
    //       i--
    //     }
    //   }
    // }
    //ROLESSSSSSSSSSSSSS
    if (newMember.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" &&
      newMember.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)" &&
      newMember.displayName.trim().substring(0, 1).toLowerCase() !== "!" &&
      newMember.guild.id === "569683781800296501") {
      // const specrole = client.guilds.cache.get("569683781800296501").roles.cache.get("1003428487375364216");
      // const strole = client.guilds.cache.get("569683781800296501").roles.cache.get("745730857976725536");
      // newMember.roles.remove(specrole).catch(err => { msg_user(lieu_id,err); });
      // newMember.roles.remove(strole).catch(err => { msg_user(lieu_id,err); });
      // msg_user(lieu_id,"Caught Player");
      // specrole.members.forEach((member, i) => { // Looping through the members of Role.
      //     setTimeout(() => {
      //         member.roles.remove(Role); // Removing the Role.
      //     }, i * 1000);
      // });
      // strole.members.forEach((member, i) => { // Looping through the members of Role.
      //     setTimeout(() => {
      //         member.roles.remove(Role); // Removing the Role.
      //     }, i * 1000);
      // });
      // Role.members.forEach((member, i) => { // Looping through the members of Role.
      //     setTimeout(() => {
      //         member.roles.remove(Role); // Removing the Role.
      //     }, i * 1000);
      // });
    }
    else if (newMember.displayName.trim().substring(0, 1).toLowerCase() === "!" &&
      newMember.guild.id === "569683781800296501") {
      // const specrole = client.guilds.cache.get("569683781800296501").roles.cache.get("1003428487375364216");
      // const strole = client.guilds.cache.get("569683781800296501").roles.cache.get("745730857976725536");
      // newMember.roles.add(specrole).catch(err => { msg_user(lieu_id,err); });
      // newMember.roles.remove(strole).catch(err => { msg_user(lieu_id,err); });
      // msg_user(lieu_id,"Caught Spectator");
    }
    else if ((newMember.displayName.trim().substring(0, 4).toLowerCase() === "(st)" ||
      newMember.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") &&
      newMember.guild.id === "569683781800296501") {
      // const specrole = client.guilds.cache.get("569683781800296501").roles.cache.get("1003428487375364216");
      // const strole = client.guilds.cache.get("569683781800296501").roles.cache.get("745730857976725536");
      // newMember.roles.remove(specrole).catch(err => { msg_user(lieu_id,err); });
      // newMember.roles.add(strole).catch(err => { msg_user(lieu_id,err); });
      // msg_user(lieu_id,"Caught ST");
    }
    //ROLESSSSSSSSSSSSSS
    if (oldMember.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && newMember.displayName.trim().substring(0, 4).toLowerCase() === "(st)") {
      if (next_game.length > 0 && newMember.guild.id === "569683781800296501" && newMember.voice.channel) {
        if (newMember.voice.channel && (newMember.voice.channel.id == "1134270809804914698" || newMember.voice.channel.id == "1134270208408821770")) {
          return null;
        }
        //let ch1 = client.channels.cache.get('981318418806472815');
        //ch1.send(newMember.user.id+" "+newMember.user.username+"#").catch(err => { msg_user(lieu_id,"No permission to send messages in that text channel\n")
        let txt = "**Game About to Start**\n**Storyteller:** " + newMember.displayName + "\n"
        if (newMember.voice.channel) {
          txt += "**Channel:** " + newMember.voice.channel.name + "\n"
        }
        for (var i = 0; i < next_game.length; i++) {
          txt += "<@" + next_game[i] + "> "
        }
        next_game = []
        let ch = client.channels.cache.get('572830989315997696');
        ch.send(txt).catch(err => {
          msg_author(msg, "No permission to send messages in " + ch.name + "\n");
        })
      }
    }
    if ((oldMember.displayName.trim().substring(0, 4).toLowerCase() === "(st)" || oldMember.displayName.trim().substring(0, 6).toLowerCase() === "(cost)" || oldMember.displayName.trim().substring(0, 7).toLowerCase() === "(co-st)") && (newMember.displayName.trim().substring(0, 4).toLowerCase() !== "(st)" && newMember.displayName.trim().substring(0, 6).toLowerCase() !== "(cost)" && newMember.displayName.trim().substring(0, 7).toLowerCase() !== "(co-st)")) {
      for (var i = 0; i < grim_setters.length; i++) {
        if (grim_setters[i].user.username === oldMember.user.username) {
          grim_setters.splice(i, 1)
          grim_links.splice(i, 1)
          grim_servs.splice(i, 1)
          i--
        }
      }
    }
  }
})

client.on('rateLimit', async function(info) {
  let timeout = info.timeDifference ? info.timeDifference : info.timeout ? info.timeout : -1
  // msg_user(lieu_id,`Rate limit hit ${timeout != -1 ? timeout : 'Unknown timeout'}`)
  if (timeout > 3600000) {
    msg_user(lieu_id, "\n\nHuge Timeout!\n\n")
  }// else { msg_user(lieu_id,"\n\nSmall Pause\n\n") }
  responding = false;
  await new Promise(resolve => setTimeout(resolve, timeout));
  responding = true;
})

// client.on('error', console.log);

// client.on('debug', (stuff) => {
//   msg_user(lieu_id,"DEBUGGER vvvvvvvvvvvv\n")
//   msg_user(lieu_id,stuff)
//   msg_user(lieu_id,"DEBUGGER ^^^^^^^^^^^^\n")
// });

try {
  client.login(process.env.DISCORD_TOKEN)
} catch (e) {
  console.log("Login Error!")
  exec("kill 1", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

var helptxt =
  `\`\`\`
<[+=-=-=-=+~{ ShadowBOT Commands }~+=-=-=-=+]>

Shadowing Commands:
-------------------
10) Shadow a player:      *spec <player>
11) Stop shadowing:       *spec
12) List of your shadows: *specs
13) Remove your shadows:  *nospec
14) Do Not Disturb (can't be shadowed): *dnd

Nickname Commands:
------------------
20) Add/Remove !:       *! or *spectate
21) Add/Remove (ST):    *st or *storytell
22) Add/Remove (Co-ST): *cost or *co-st or *costorytell or *co-storytell
23) Add/Remove (T):     *t or *travel
24) Add/Remove ![LFG]:	*? or *lfg
25) Remove previous tags: *p or *play
26) Add/Remove [AFK]:      *afk
27) Add/Remove [BRB]:      *brb
28) Remove AFK/BRB tags: *back or *here
29) Change nickname temporarily: *vote <name>
2A) Back to original nickname:   *unvote
2B) Add/Remove [N] (Optional tag for new players): *n
\`\`\``
var helptxt2 =
  `\`\`\`
Convenience Commands:
---------------------
30) Set the link to the grim: *grim <url> or *link <url>
31) Get the link to the grim: *grim or *link
32) Create a poll with base 3 scripts, custom, homebrew (1=TB, 2=SNV, 3=BMR, C=Custom, H=Homebrew): *poll [123ch]
33) Request that players go back to town: *gather (Storyteller only)
34) Announce that nominations are open:   *noms   (Storyteller only)
35) Get notified for next game:   *wait or *ng or *nextgame
36) Show the ping list:      *wl or *waitlist or *list or *queue
37) Leave the ping list:     *leave or *quit
38) Ping players in queue (Only ST): *ping
39) Link to the ST Feedback Form:    *feedback
3A) Basics for beginners: *basics or *info
3B) Travelers' Guide for beginners:  *travelers
3C) Move a player to AFK channel (Only ST): *move <player mention>
3D) Create a secret poll (anonymous voting): *sp <title> <options>
3E) View secret poll results (adding a p displays the results publicly instead of privately): *results <p>
3F) Ask Storyteller for a consultation (ST must click OK on the msg): *consult <optional text/mentions>
3G) Show the saved list of commonly played custom scripts: *scripts or *script
3H) Get the links to a specific custom script from the list: *get <id>
\`\`\``
var helptxt3 =
  `\`\`\`
3I) Show the saved list of commonly played teensy scripts: *teensies or *teensy
3J) Get the links to a specific teensy script from the list: *get t <id>
3K) Select a player from your current game at random: *randomplayer or *rp
3L) Get the typical number of each role type (TF/Outsider/Minion/Demon): *count or *comp
3M) Get information on a BOTC character: *role <character name>
3N) Get information on a BOTC fable: *fable <character name> (or *fabled/fables)
3P) Get the list of jinxes and jinxed characters: *jinxes or *jinx or *djinn

Extra Commands:
---------------
40) Tell a random joke:    *joke
41) Compliment someone <3: *compliment @<player>
42) Celebrate with style with a slow clap: *slowclap or *slow clap
43) My rules of how to run Oops All Pithags: *oopsallpithags or *oops or *oap
44) Crediting the cool people who helped: *credits

-=> For any Suggestions or Bug reports, msg me at LieutenantDV20#0097
\`\`\``

var helptxt_ecg =
  `\`\`\`
<[+=-=-=-=+~{ ShadowBOT Commands }~+=-=-=-=+]>

Shadowing Commands:
-------------------
10) Shadow a player:      *spec <player>
11) Stop shadowing:       *spec
12) List of your shadows: *specs
13) Remove your shadows:  *nospec
14) Do Not Disturb (can't be shadowed): *dnd

Nickname Commands:
------------------
20) Add/Remove !:       *! or *spectate
21) Add/Remove (ST):    *st or *storytell
22) Add/Remove (Co-ST): *cost or *co-st or *costorytell or *co-storytell
23) Add/Remove (T):     *t or *travel
24) Add/Remove ![LFG]:	*? or *lfg
25) Remove previous tags: *p or *play
26) Add/Remove [AFK]:      *afk
27) Add/Remove [BRB]:      *brb
28) Remove AFK/BRB tags: *back or *here
29) Change nickname temporarily: *vote <name>
2A) Back to original nickname:   *unvote
2B) Add/Remove [N] (Optional tag for new players): *n

Town Control Commands:
---------------------
A1) Move everyone from all day channels to cottages: *night
A2) Move everyone from cottages to Town Square: *day
A3) Move everyone from whisper channels to Town Square: *town
A4) Set a timer for whispers(min: 30s, max: 8m): *timer <0.5 | 1 | 1.5 | ... | 8 >
\`\`\``
var helptxt_ecg2 =
  `\`\`\`


Convenience Commands:
---------------------
30) Set the link to the grim: *grim <url> or *link <url>
31) Get the link to the grim: *grim or *link
32) Create a poll with base 3 scripts, custom, homebrew (1=TB, 2=SNV, 3=BMR, C=Custom, H=Homebrew): *poll [123ch]
33) Create a poll with anonymous votes: *sp <title> <options> or *secretpoll <title> <options>
34) Create a poll for Harry Potter houses: *sp <combination of s-h-r-g for each house>
35) Privately view the results of a secret poll: *results <add p to view publicly instead>
36) Mute all non-admins non-storytellers (Only ST and Admins): *ma or *muteall or *mute-all
37) Unmute yourself if muted by mute-all (Anyone): *um or *unmute
38) Unmute all users in your channel muted by mute-all (Anyone): *uma or *unmuteall or *unmute-all
39) Basics for beginners: *basics or *info
3A) Travelers' Guide for beginners:  *travelers
3B) Ask Storyteller for a consultation (ST must click OK on the msg): *consult <optional text/mentions>
3C) Show the saved list of commonly played custom scripts: *scripts or *script
3D) Get the links to a specific custom script from the list: *get <id>
3E) Show the saved list of commonly played teensy scripts: *teensies or *teensy
3F) Get the links to a specific teensy script from the list: *get t <id>
3G) Select a player from your current game at random: *randomplayer or *rp
3H) Get the typical number of each role type (TF/Outsider/Minion/Demon): *count or *comp
\`\`\``
var helptxt_ecg3 =
  `\`\`\`


3I) Get information on a BOTC character: *role <character name>
3J) Get information on a BOTC fable: *fable <character name> (or *fabled/fables)
3K) Get the list of jinxes and jinxed characters: *jinxes or *jinx or *djinn

Extra Commands:
----------------
40) Tell a random joke:    *joke
41) Compliment someone <3: *compliment @<player>
42) Celebrate with style with a slow clap: *slowclap or *slow clap
43) My rules of how to run Oops All Pithags: *oopsallpithags or *oops or *oap
44) Crediting the cool people who helped: *credits

-=> For any Suggestions or Bug reports, msg me at LieutenantDV20#0097
\`\`\``

var helptxt_other =
  `\`\`\`
<[+=-=-=-=+~{ ShadowBOT Commands }~+=-=-=-=+]>

Shadowing Commands:
-------------------
10) Shadow a player:      *spec <player>
11) Stop shadowing:       *spec
12) List of your shadows: *specs
13) Remove your shadows:  *nospec
14) Do Not Disturb (can't be shadowed): *dnd

Nickname Commands:
------------------
20) Add/Remove !:       *! or *spectate
21) Add/Remove (ST):    *st or *storytell
22) Add/Remove (Co-ST): *cost or *co-st or *costorytell or *co-storytell
23) Add/Remove (T):     *t or *travel
24) Add/Remove ![LFG]:	*? or *lfg
25) Remove previous tags: *p or *play
26) Add/Remove [AFK]:      *afk
27) Add/Remove [BRB]:      *brb
28) Remove AFK/BRB tags: *back or *here
29) Change nickname temporarily: *vote <name>
2A) Back to original nickname:   *unvote
2B) Add/Remove [N] (Optional tag for new players): *n

Town Control Commands:
---------------------
A1) Move everyone from all day channels to cottages: *night
A2) Move everyone from cottages to Town Square: *day
A3) Move everyone from whisper channels to Town Square: *town
A4) Set a timer for whispers(min: 30s, max: 8m): *timer <0.5 | 1 | 1.5 | ... | 8 >
\`\`\``
var helptxt_other2 =
  `\`\`\`


Convenience Commands:
---------------------
30) Set the link to the grim: *grim <url> or *link <url>
31) Get the link to the grim: *grim or *link
32) Create a poll with base 3 scripts, custom, homebrew (1=TB, 2=SNV, 3=BMR, C=Custom, H=Homebrew): *poll [123ch]
33) Basics for beginners: *basics or *info
34) Travelers' Guide for beginners:  *travelers
35) Ask Storyteller for a consultation (ST must click OK on the msg): *consult <optional text/mentions>
36) Create a secret poll (anonymous voting): *sp <title> <options>
37) View secret poll results (adding a p displays the results publicly instead of privately): *results <p>
38) Ask Storyteller for a consultation (ST must click OK on the msg): *consult <optional text/mentions>
39) Show the saved list of commonly played custom scripts: *scripts or *script
3A) Get the links to a specific custom script from the list: *get <id>
3B) Show the saved list of commonly played teensy scripts: *teensies or *teensy
3C) Get the links to a specific teensy script from the list: *get t <id>
3D) Select a player from your current game at random: *randomplayer or *rp
3E) Get the typical number of each role type (TF/Outsider/Minion/Demon): *count or *comp
\`\`\``
var helptxt_other3 =
  `\`\`\`
3F) Get information on a BOTC character: *role <character name>
3G) Get information on a BOTC fable: *fable <character name> (or *fabled/fables)
3H) Get the list of jinxes and jinxed characters: *jinxes or *jinx or *djinn

Extra Commands:
---------------
40) Tell a random joke:    *joke
41) Compliment someone <3: *compliment @<player>
42) Celebrate with style with a slow clap: *slowclap or *slow clap
43) My rules of how to run Oops All Pithags: *oopsallpithags or *oops or *oap
44) Crediting the cool people who helped: *credits

-=> For any Suggestions or Bug reports, msg me at LieutenantDV20#0097
\`\`\``

var oap_wel = `**Welcome to Oops All Pithags!**
`

var oap_gen =
  `**The General Rules: (By LieutenantDV20)**
---------------------------------------------
1- You can only be a: Good Player, Minion Player or Demon Player, and everyone has the Pithag token.
2- Just like a regular game, there will be an evil team consisting of a Demon player and some Minion players, they start the game knowing each other. Everyone else who didn't learn an Evil Team is a good player.
3- The Demon player is always The Demon regardless of their token, same for the Minion players and the Good players.
4- The Good team wins if the Demon player dies.
5- The Evil team wins if there are 2 or less players alive and the Demon Player is one of them.
6- To resolve the Pithaggings and Kills at night, the Storyteller will assign each player a random night order at the start of the game before deciding the grim.
7- The Demon Player registers as Evil and as a Demon to all abilities, regardless of their token. Minion Players register as Evil and as Minions.
8- Good Players register as Good and as Townsfolk only.
9- After two nights of no deaths, the following night will have arbitrary deaths.
---------------------------------------------`

var oap_no = `**The Night Order: (By LieutenantDV20)**
---------------------------------------------
**Night One Order:** Same as below, but the Pithaggings happen first, everything else remains the same.
**Other Nights Order:**
    Philosopher
    Snakecharmer
    Poisoner
    Courtier
    (Other Poisoning, Drunkness and Protection roles)
    Exorcist
    Preacher
    Demon kills (Decided by the assigned order)
    Pithaggings (Decided by the assigned order)
    Minion Abilities
    All the other abilities
---------------------------------------------`

var oap_ban = `**Banned Characters: (By LieutenantDV20)**
---------------------------------------------
Riot
Legion
Leviathon
Lil Monsta
Bounty Hunter
Sage
Mastermind
Spy
Widow
Heretic
Athiest
Damsel
Lycanthrope
Balloonist
Village Idiot
---------------------------------------------`

var oap_jinx = `**Jinxes: (By LieutenantDV20)**
---------------------------------------------
- **Courtier** can't pick the **Pithag**.
- **Engineer** can only pick what the **Demon Player's** role becomes. (It's like a once per game Pithag, but it targets the Demon Player)
- **Snakecharmer** activates when picking the **Demon Player**, the players would swap tokens and alignments as expected, moving the Demonhood.
- The **Demon Player** and the **Minion Players cannot switch alignments** in any way.
- It is allowed to create an **Evil Politician**. (However from the jinx above, you can see that it's pointless for evil).
- **Fanggu** demon doesn't jump, since no players register as an outsider.
- Roles that are mentioned together in the Night Order (such as pithagging or killing roles) resolve according to the assigned random night order.
- When a character with passive droison is created **(e.g: Nodashii, Puzzlemaster, etc)**. Their droison effect goes into the night order with other droison characters.
- The Good Team wins upon the death of the Demon Player even if they had the **Zombuul** token.
- If a Final 3 includes a **dead Zombuul**, then the Evil Team wins unless there's an alive Good Player.
---------------------------------------------`

var changes =
  `**Latest Changes:**\n- Added the newly released roles and fables.`;






