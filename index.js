// IF YOU WANT TO WORK ON THIS BOT, I HAVE MADE A LIST OF EVERY COMMANDS I THINK WE SHOULD HAVE, WITH A DESCRIPTION OF THEM, IN THE HELP COMMAND

//SETUP
const docs = require('./docs.json');
const fs = require('fs')
const bugchannel = ["insert channel id","insert channel id"];
const subchannel = ["insert channel id","insert channel id"];
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('insert token');
const prefix = "??" // Choose your prefix
bot.on('ready', () => {
    console.log("Ready to help")
    bot.user.setActivity("over you to help you", {type: 3});
});

//ON MESSAGE
bot.on('message', (message) => {
    let args = message.content.split(" ");
    //HELP COMMAND
    if (args[0].startsWith(prefix)) {
        args[0] = args[0].split("").splice(prefix.length).join("");
        if (args[0] == "help") {
            if (args.length == 1) {
                let embed = new Discord.RichEmbed()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setAuthor('DARKCORE - Prefix: ' + `${prefix}`)
                .setTitle("Here are all commands available:")
                .setDescription(`To get more help about a command, just type \`${prefix}help [name of the command]\``)
                .addField("Useful commands", "ping, bugreport, gethelp, submit, sethelp")
                .addField("Moderation commands","delmsg, report, lockdown")
                .addField("Docs commands", "doc, search , deepsearch, list");
                message.channel.send(embed);
            } else if (args[1] == 'ping') {
                message.channel.send(`Just type \`${prefix}ping\` to get my ping`);
            } else if (args[1] == 'deepsearch') {
                message.channel.send(`If you can't find the keyword for the docs you want to see, even with the search command, type  \`\`\`${prefix}deepsearch [subject]\`\`\`Be careful, this command is slower and will give way more answers than the actual search command, and thus is not recommended unless you have tried the search command before and it gave nothing interesting.`);
            } else if (args[1] == 'bugreport') {
                message.channel.send(`This command is to report a bug to the devs. To use it, just type : \`\`\`${prefix}bugreport [concerned object] [topic] [larger description of the bug]\`\`\`The concerned object should say if the bug concern the ide, me, or the compiler. It should be one word max\nAlso, the topic should be one word to describe the topic.`);
            } else if (args[1] == 'gethelp') {
                message.channel.send(`Just type \`${prefix}gethelp [keyword to describe the subject] [difficulty of the issue, from 1 to 10] [description of the subject where you need help]\` to contact one of our devs or staff to ask him questions about the subject.`);
            } else if (args[1] == 'submit') {
                message.channel.send(`This command is to submit something to us, either an idea or fanart or anything else you would want to submit. To use this command, just type \`\`\`${prefix}submit [keyword to describe your submission] [whatever you want to submit, even attachments or files you want to send]\`\`\``);
            } else if (args[1] == 'delmsg') {
                message.channel.send(`Just type \`${prefix}delmsg x\` to delete the x last messages`);
            } else if (args[1] == 'report') {
                message.channel.send(`Just type \`${prefix}report [mention] [reason]\` to warn him`);
            } else if (args[1] == 'lockdown') {
                message.channel.send(`Just type \`${prefix}lockdown x [reason]\` to lock the channel for x seconds`);
            } else if (args[1] == 'doc') {
                message.channel.send(`This command is made to see the docs. If you want to see the docs on a subject, type \`\`\`${prefix}docs [subject]\`\`\``);
            } else if (args[1] == 'search') {
                message.channel.send(`If you can't find the keyword for the docs you want to see, type  \`\`\`${prefix}search [subject]\`\`\``);
            } else if (args[1] == 'help') {
                message.channel.send(`This command is to tell people if you want to help them or not. \nJust type \`${prefix}sethelp [yes|no]\` to tell everyone if you are available to help them or not`)
            } else if (args[1] == 'list') {
                message.channel.send(`Just type \`${prefix}list\` to get a list of all subjects I have docs on.`);
            } else {
                let embed = new Discord.RichEmbed()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setAuthor('DARKCORE - Prefix: ' + `${prefix}`)
                .setTitle("Here are all commands available:")
                .setDescription(`To get more help about a command, just type \`${prefix}help [name of the command]\``)
                .addField("Useful commands", "ping, bugreport, gethelp, submit, sethelp")
                .addField("Moderation commands","delmsg, warn, lockdown")
                .addField("Docs commands", "doc, search , deepsearch, list");
                message.channel.send(embed);
            }
        }
        // PING
        else if (args[0] == 'ping') {
            message.channel.send(`My ping is ${bot.ping}ms`)
        }
        //DELMSG
        else if (args[0] == 'delmsg') {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("If I was you, I wouldn't touch that");
            let deleteNumber = parseInt(args[1], 10);
            if (!deleteNumber) return message.channel.send(`This is the wrong way to delete a chat history.\nYou should do : ${prefix}delmsg [number of message to delete]\nAlso, values under 1 are not accepted.`);
            if ((deleteNumber <= 0)||(deleteNumber>100)) return message.channel.send("This is the wrong way to delete a chat history.\nYou should choose a number between 1 and 100")
            message.channel.bulkDelete(deleteNumber);
        }
        //DOC 
        else if (args[0] == 'doc') {
            if (args.length == 1) return message.channel.send("Please specify a doc to view.");
            if (!docs[args[1]]) return message.channel.send(`I'm sorry, I don't have docs on that specifically. However, you can search for anything speaking of that with the command \`${prefix}search ${args.splice(1).join(" ")}\``);
            let embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(args[1])
            .setDescription(docs[args[1]].description)
            message.channel.send(embed)
        }
        //SEARCH
        else if (args[0] == 'search') {
            if (args.length == 1) return message.channel.send("Please specify a keyword to search for.");
            let doclist = []
            args.splice(0,1);
            for (var doc in docs) { docs[doc].keywords.forEach(key => {
                let bool = false;
                args.forEach(arg => {
                    if (arg == key) bool = true;                    
                });
                if (bool) doclist.push(doc);
            });}
            if (doclist.length < 1) return message.channel.send("sorry, I couldn't find anything about that");
            message.channel.send(`Here is a list of all the docs we have related to \`${args.join(" ")}\`:\n - ${doclist.join("\n - ")}`)
        }
        //DEEPSEARCH
        else if (args[0] == 'deepsearch') {
            if (args.length == 1) return message.channel.send("Please specify a keyword to search for.");
            let doclist = [];
            args.splice(0,1);
            for (var doc in docs) {
                let wordlist = docs[doc].description.split(" ")
                wordlist.forEach(key => {
                    let bool = false;
                    args.forEach(arg => {
                        if (arg == key) bool = true;                    
                    });
                    if (bool) doclist.push(doc);
                });
            }
            if (doclist.length < 1) return message.channel.send("sorry, I couldn't find anything about that");
            message.channel.send(`Here is a list of all the docs we have related to \`${args.join(" ")}\`:\n - ${doclist.join("\n - ")}`)
        }
        //LIST
        else if (args[0] == 'list') {
            let list = [];
            for (var key in docs) {list.push(key)};
            message.channel.send(`Here is a list of all the docs I have:\n - ${list.join("\n - ")}`);
        }
        //SETHELP
        else if (args[0] == "sethelp") {
            if (args.length != 2) return message.channel.send("Sorry, this is the wrong way of using this command. Please precise if yes or no you want to help everyone and make yourself useful for the society, and only say that.");
            switch (args[1]) {
                case "yes":
                case "ye":
                case "yeah":
                case "good":
                case "for":
                case "y":
                    let h = JSON.parse(fs.readFileSync("./helpers.json", "utf8"));
                    if (h.helpers.includes(message.author.id)) return message.channel.send("I'm sorry, but you are already in the list. However, I appreciate your thrive to help us.")
                    message.author.send("You have been added to the list of helpers.").catch(()=>{
                        message.channel.send("Sorry, your DMs must be open in order for me to contact you if someone need your help. \nIf you still want to help, please open your DMs, and then try again.")
                        return;
                    })
                    h.helpers.push(message.author.id);
                    fs.writeFile("./helpers.json", JSON.stringify(h), (x) => {
                        if (x) message.channel.send("Sorry, an error occured. Please retry later.")
                        else message.channel.send("Thanks a lot for your participation. Your help is greatly valued.")
                      });
                    break;
                case "no":
                case "nein":
                case "bad":
                case "against":
                case "n":
                    let x = JSON.parse(fs.readFileSync("./helpers.json", "utf8"));
                    let index = x.helpers.indexOf(message.author.id);
                    if (index < 0) return message.channel.send("I'm sorry, but you are already not helping. It is impossible to help less.")
                    x.helpers.splice(index, 1);
                    fs.writeFile("./helpers.json", JSON.stringify(x), (x) => {
                        if (x) message.channel.send("Sorry, an error occured. Please retry later.")
                        else message.channel.send("Thanks a lot for your participation. I hope you will come back soon.")
                      });      
                    break;
                default:
                    message.channel.send("Sorry, this is the wrong way of using this command. Please precise if yes or no you want to help everyone and make yourself useful for the society.");
                    break;
            }
        }
        //GETHELP
        else if (args[0] == "gethelp") {
            if (args.length < 4) return message.channel.send("This is the wrong way of using this command. Please precise a keyword to describe your issue, then the difficulty level, and then describe the issue.")
            let num = args[2];
            if (isNaN(num)) return message.channel.send("Sorry, your difficulty level should be a number.");
            num = parseInt(num);
            if (num > 10 || num < 0) return message.channel.send("Sorry, but your difficulty level should be between 1 and 10, where 10 is the most difficult.");
            let embed = new Discord.RichEmbed()
            .setColor(0xe00606)
            .setTitle("Someone need your help !")
            .addField("User in need", message.author.username, true)
            .addField("Subject", args[1], true)
            .addField("Difficulty level", num, true)
            .addField("Issue", args.splice(3).join(" "), false)
            .setDescription("To help this person, just type your reply in the chat. This will put you in contact with " + message.author.username)
            .setFooter(`If you don't want to receive these messages anymore, just type \`${prefix}sethelp no\`. For any command abuse, report it to our staff in prion's official server`);
            var contactList = [];
            var gothelp = false
            let s = JSON.parse(fs.readFileSync("./helpers.json", "utf8"));
            s.helpers.forEach((id)=> {
                if (message.author.id == id) return;
                let helper = bot.user.friends.find("id", id) || bot.guilds.find("id", bugchannel[0]).members.find("id", id).user;
                if (!helper) bot.guilds.forEach((guild)=>{helper = guild.members.find("id",id).user;});
                if (!helper) return;
                if (helper.presence.status != "offline") {
                    helper.send(embed);
                    contactList.push(id);
                    helper.dmChannel.awaitMessages((col) => col.author.id != bot.user.id, { max: 1, time:600000, errors:['time']})
                    .then((collected) => {
                        if (gothelp) return;
                        gothelp = true;
                        let text = collected.first().content.toLowerCase();
                        message.author.send(`Someone answered your call!\nYou are now in direct contact with him, which mean from now, every message you will send will be sent to him, and every message I will send you will be sent by him.\nTo end this connection, just type \`${prefix}end\`\n\n`);
                        message.author.send(text);
                        helper.send(`You are now in direct contact with him, which mean from now, every message you will send will be sent to him, and every message I will send you will be sent by him.\nTo end this connection, just type \`${prefix}end\`\n\n`)                  
                        CreateContact(message.author, helper)
                    }, () => {
                        if (!gothelp) {
                            gothelp = true;
                            message.author.send("I'm sorry, but no one answered your help call.");
                        }
                    })
                }
            })
        }
        //SUBMIT
        else if (args[0] == 'submit') {
            if (args.length < 3 && message.attachments.size == 0) return message.channel.send("Please submit something, it is usually more useful.")
            message.delete();
            let attachments = message.attachments.map(a => a.url);
            let embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(args[1])
            .setDescription(args.splice(2).join(" "));
            let g = bot.guilds.find('id', subchannel[0]);
            let c = g.channels.find('id', subchannel[1]);
            c.send(embed)
            if (message.attachments.size > 0) c.send("", { tts: message.tts, files: attachments });
            message.reply("Thanks for your submission")
        }
        //BUGREPORT
        else if (args[0] == "bugreport") {
            if (args.length < 4) return message.channel.send("I'm sorry, this is the wrong way of reporting a bug. Please specify the object of the bug, give the bug a title, and then describe it.")
            let co = args[1];
            let bug = args[2];
            let user = message.author.username
            let report = args.slice(3).join(" ");
            let embed = new Discord.RichEmbed()
            .setColor(0xe00606)
            .setTitle("A bug has been reported")
            .addField("Reporter", user)
            .addField("Concerned object", co)
            .addField("Bug", bug)
            .addField("Description", report);
            let g = bot.guilds.find('id', bugchannel[0]);
            let c = g.channels.find('id', bugchannel[1]);
            c.send(embed);
            message.channel.send('Your bug has been reported :white_check_mark: \nThanks for helping us improve the bot')
        }
        else {
            message.channel.send(`I'm not sure I have fully understood. If you want some help, just type \`${prefix}help\``)
        }
    }
    //BEING MENTIONNED
    else if (message.isMentioned(bot.user) && args.length <= 3) {
        message.channel.send(`Hey! if you want to get some help, just type \`${prefix}help\``)
    }
})

function CreateContact(p1, p2) {
    //TO BE DONE
    //prefix + "end" => End this
}