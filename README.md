# Firebot Raid Modal

Provides an interactive raid modal interface for selecting raid targets visually instead of typing usernames.

## Introduction

This [Firebot](https://firebot.app) plugin provides a user-friendly interactive modal for selecting raid targets. Instead of manually typing usernames or remembering channel names, streamers can use this visual interface to browse categories, view followed channels, or search for specific users before initiating a raid.

**Key Features:**

- :mag: Browse streamers in your current category with viewer counts and thumbnails
- :star: Quick access to followed channels for easy raiding
- :mag_right: Username search with intelligent auto-completion
- :signal_strength: Visual confirmation of channel status (online/offline)
- :electric_plug: Custom effect execution when a raid target is selected
- :gear: Easy configuration via Quick Actions

## Quick Start

### 1. Install the Plugin

See the [Installation Guide](doc/installation.md) for detailed instructions.

Quick steps:

1. Download `firebot-mage-raid-modal-<version>.js` from [Releases](https://github.com/TheStaticMage/firebot-mage-raid-modal/releases)
2. Copy to Firebot scripts directory
3. Add as startup script
4. Restart Firebot

:warning: **Requires Firebot 5.65 or higher**

### 2. Configure

See the [Configuration Guide](#configuration) below for quick setup.

## Features

### Three Ways to Select a Raid Target

1. **Category Browsing** - View streamers who are currently streaming in the same category as you, complete with viewer counts and stream thumbnails.

2. **Followed Channels** - Browse through channels that you follow, making it easy to raid friends and regular collaborators.

3. **Username Search** - Type a specific username with intelligent auto-completion and validation.

The modal validates that targets are valid Twitch channels and provides visual feedback about whether they are currently online or offline. When a target is selected, the plugin can either execute the default Twitch raid functionality or run a custom list of effects that you configure, giving you complete control over the raid process.

### Effect and Variables

- The **Raid Action Modal** effect - Available for all events and effect lists
- The **$raidModalActionTargetUserDisplayName** variable - Display name of the selected raid target
- The **$raidModalActionTargetUsername** variable - Username of the selected raid target

## Documentation

### User Guides

- **[Installation Guide](doc/installation.md)** - How to install the Firebot plugin
- **[Configuration Guide](#configuration)** - How to set up the raid modal
- **[Upgrading Guide](doc/upgrading.md)** - How to upgrade to newer versions

## Configuration

An easy way to invoke the Raid Modal is to set up a Quick Action:

1. In Firebot, navigate to **Dashboard**
2. At the bottom of the screen, click **+** for "Add Custom Quick Action"
3. Enter a name and select a suitable icon
4. Under Effect List, leave it as a custom effect list and add the **Raid Action Modal** effect
5. Keep the default configuration to trigger a Twitch raid, or customize with your own effects

## Usage

When it's time to raid out, click the icon for the Raid Quick Action that you just added. This will bring up the Raid Modal, allowing you to select a target and initiate a raid.

**Important:** The Raid Modal will initiate a raid, but will not send it immediately. The raid will be automatically sent to the target channel in approximately 90 seconds. You can click the "Raid Now" button in your stream's chat to send it earlier (available after 10 seconds).

> **Note:** The Twitch API does not provide an automated way to trigger the "Raid Now" functionality, so this cannot be automated by plugins or Firebot itself. [This has been requested since at least 2021.](https://discuss.dev.twitch.tv/t/trigger-raid-now-after-youve-used-raid-using-an-api/34218)

## Variables

The plugin provides two variables for use in custom effects triggered by the raid modal:

- `$raidModalActionTargetUserDisplayName` - The display name of the selected target (e.g., "TheStaticMage")
- `$raidModalActionTargetUsername` - The username of the selected target (e.g., "thestaticmage")

These variables are automatically populated when a target is selected and can be used in chat messages, API requests, file operations, or any other effects that support variable substitution.

## Support

The best way to get help is in my Discord server. Join [The Static Discord](https://discord.gg/DCDGXAsY2R) and visit the `#firebot-mage-raid-modal` channel.

- Please do not DM me on Discord
- Please do not ask for help in my chat when I am streaming

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/TheStaticMage/firebot-mage-raid-modal/issues).

## Contributions

Contributions are welcome via [Pull Requests](https://github.com/TheStaticMage/firebot-mage-raid-modal/pulls). I strongly suggest you contact me before making significant changes. Please refer to the [Contribution Guidelines](/.github/contributing.md) for specifics.

## License

This plugin is released under the [GNU General Public License version 3](/LICENSE). That makes it free to use whether your stream is monetized or not.

If you use this on your stream, I would appreciate a shout-out. (Appreciated, but not required.)

- <https://www.twitch.tv/thestaticmage>
- <https://kick.com/thestaticmage>
- <https://youtube.com/@thestaticmagerisk>
