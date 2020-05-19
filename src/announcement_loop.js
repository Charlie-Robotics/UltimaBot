var utils = require('./utils.js');
var Discord = require('discord.js');

exports.fn = 
{
	announcement_loop: async (bot) =>
	{
		var current_announcements = utils.fn.get_current_announcements();

		for (announcement of current_announcements)
		{
			// Send to guildID/channelID the message
			try
			{
				const channel = bot.channels.get(announcement.ChannelID);

				// Check for time pause in guild
				const guild_info = utils.fn.get_guild_entry(channel.guild.id);
			}
			catch
			{
				utils.fn.remove_announcement(announcement.GuildID, announcement.ChannelID, announcement.Message, announcement.Frequency, announcement.NextPosting);
			}

			if (guild_info.Timeflow == 1)
			{
				try
				{
					await channel.send(announcement.Message);
				}
				catch 
				{
					utils.fn.remove_announcement(announcement.GuildID, announcement.ChannelID, announcement.Message, announcement.Frequency, announcement.NextPosting);
				}
			}
		}

		// increment the announcements
		utils.fn.increment_current_announcements(current_announcements);
	}
}