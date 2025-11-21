# Installation Guide

This plugin is installed like any other Firebot startup script.

## Installation Steps

1. Download `firebot-mage-raid-modal-<version>.js` from the latest [Release](https://github.com/TheStaticMage/firebot-mage-raid-modal/releases)

2. Copy the file to your Firebot scripts directory
   - In Firebot, go to **File** > **Open Data Folder**, then select the **scripts** folder

3. Enable custom scripts in Firebot
   - Go to **Settings** > **Scripts** and ensure custom scripts are enabled

4. Add the script as a startup script
   - Go to **Settings** > **Scripts** > **Manage Startup Scripts** > **Add New Script**
   - Select `firebot-mage-raid-modal-<version>.js` from the dropdown

5. Restart Firebot

## What Gets Installed

After installation, the following resources will be available in Firebot:

- **Raid Action Modal** effect - Available for all events and effect lists
- **$raidModalActionTargetUserDisplayName** variable - Display name of the selected raid target
- **$raidModalActionTargetUsername** variable - Username of the selected raid target
- **Raid Modal** UI extension - Displays when you trigger the Raid Action Modal effect

## Requirements

This plugin requires **Firebot 5.65 or higher**. The plugin will fail to initialize if you are running an older version of Firebot.
