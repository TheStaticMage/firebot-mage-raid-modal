# Firebot Raid Modal

## Introduction

This is an interactive raid modal plugin for Firebot that provides a user-friendly interface for selecting raid targets. Instead of manually typing usernames or remembering channel names, streamers can use this visual interface to browse categories, view followed channels, or search for specific users before initiating a raid.

Some of the things you can use this raid modal to help with include:

- Browsing streamers in the same category as your current stream
- Quickly accessing your followed channels for raiding
- Searching for specific usernames with auto-suggestions
- Visual confirmation of channel status (online/offline) before raiding
- Custom effect execution when a raid target is selected

This script supplies the following:

- The `Raid Action Modal` effect, which is available for all events and effect lists. This displays an interactive modal for target selection.
- The `$raidModalActionTargetUserDisplayName` variable for accessing the display name of the selected raid target
- The `$raidModalActionTargetUsername` variable for accessing the username of the selected raid target
- A comprehensive UI extension that integrates seamlessly with Firebot's interface

### How does the raid modal work?

The raid modal provides three different ways to select a raid target:

1. **Category Browsing**: View streamers who are currently streaming in the same category as you, complete with viewer counts and stream thumbnails.

2. **Followed Channels**: Browse through channels that you follow, making it easy to raid friends and regular collaborators.

3. **Username Search**: Type a specific username with intelligent auto-completion and validation.

The modal validates that targets are valid Twitch channels and provides visual feedback about whether they are currently online or offline. When a target is selected, the plugin can either execute the default Twitch raid functionality or run a custom list of effects that you configure, giving you complete control over the raid process.

## Installation

The script needs to be installed like any other Firebot startup script.

For detailed instructions, consult: [Installation](/doc/installation.md)

For upgrade information, consult: [Upgrading](/doc/upgrading.md)

:bulb: This script requires Firebot 5.65 or later. The script will fail to initialize if you are running an older version of Firebot.

## Configuration

An easy way to invoke the Raid Modal is to set up a Quick Action.

1. In Firebot, navigate to DASHBOARD.

2. At the bottom of the screen, click **+** for "Add Custom Quick Action".

3. Enter a name and select a suitable icon. Under Effect List, leave it as a custom effect list, and add this one effect: "Raid Action Modal."

4. You may keep the configuration of the raid modal's effect list as the default to trigger a Twitch raid to the target. Or if you prefer, you may change to a custom effect list and set things up according to your wishes. (You can always come back later to change this setting.)

## Usage

When it's time to raid out, click the icon for the Raid Quick Action that you just added. This will bring up the Raid Modal, allowing you to select a target and initiate a raid.

Note: The Raid Modal will initiate a raid, but will not send the raid. The raid will be automatically sent to the target channel in approximately 90 seconds. If you want to send the raid earlier, you can visit your stream's chat in a web browser and click the "Raid Now" button after 10 seconds. (Unfortunately, the Twitch API does not provide an automated way to trigger the "Raid Now." This means that it is not possible for this plugin, or Firebot itself, to provide this functionality. [This has been requested since at least 2021...](https://discuss.dev.twitch.com/t/trigger-raid-now-after-youve-used-raid-using-an-api/34218))

## Variables

If you are just using the default raid action, you probably won't use these variables. The plugin provides two variables that can be used in custom effects triggered by the raid modal:

- `$raidModalActionTargetUserDisplayName` - The display name of the selected target (e.g., "TheStaticMage")
- `$raidModalActionTargetUsername` - The username of the selected target (e.g., "thestaticmage")

These variables are automatically populated when a target is selected and can be used in chat messages, API requests, file operations, or any other effects that support variable substitution.

## Support

The best way to get help is in my Discord server. Join the [The Static Discord](https://discord.gg/DCDGXAsY2R) and then visit the `#firebot-mage-raid-modal` channel there.

- Please do not DM me on Discord.
- Please do not ask for help in my chat when I am streaming.

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/TheStaticMage/firebot-mage-raid-modal/issues).

## Contributing

Contributions are welcome via [Pull Requests](https://github.com/TheStaticMage/firebot-mage-raid-modal/pulls). I _strongly suggest_ that you contact me before making significant changes, because I'd feel really bad if you spent a lot of time working on something that is not consistent with my vision for the project. Please refer to the [Contribution Guidelines](/.github/contributing.md) for specifics.

## License

This project is released under the [GNU General Public License version 3](/LICENSE). That makes it free to use whether your stream is monetized or not.

If you use this on your stream, I would appreciate a shout-out. (Appreciated, but not required.)

- <https://www.twitch.tv/thestaticmage>
- <https://kick.com/thestaticmage>
- <https://youtube.com/@thestaticmagerisk>
