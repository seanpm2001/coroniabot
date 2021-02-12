'use strict';
const {prefix,token} = require('./config.json');
const Discord = require('discord.js');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready');
  client.user.setActivity('!cov help');
});


client.on('message', message => {
    if (message.content.startsWith(prefix)) {
     let messageArray = message.content.split(" "),
     cmd = messageArray[1],
     args = messageArray[2],
     args2 = messageArray[3];

     if (cmd == 'add'){
       var x = Number(args) + Number(args2);
       message.channel.send(x);
     }



     if (cmd == 'stat' || 'statistics' || 'st' || 's'){
       var StaticURL = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true'
       $.getJSON(StaticURL ,function(data){

         console.log(args);
         console.log(data[Number(args)].infected);
         console.log(data[Number(args)].tested);
         console.log(data[Number(args)].recovered);
         console.log(data[Number(args)].deceased);

         var active = data[Number(args)].infected - data[Number(args)].recovered - data[Number(args)].deceased;
         message.channel.bulkDelete(1).then(() => {
          const helpEmbed = new Discord.MessageEmbed();
          helpEmbed.setColor('#ffd500')
          helpEmbed.setTitle(data[Number(args)].country)
          helpEmbed.addFields(
       		{ name: 'currently infected', value: Number(active)},
       		{ name: 'infected in total', value: data[Number(args)].infected},
       		{ name: 'recovered', value: data[Number(args)].recovered},
           { name: 'deceased', value: data[Number(args)].deceased},

       	)
        helpEmbed.setFooter(new Date().toLocaleDateString());
         message.channel.send(helpEmbed);
})
       })

     }
}
})

client.login(token);
