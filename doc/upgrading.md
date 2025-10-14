# Upgrading

## Versioning Philosophy

- A **patch release** changes the last number (e.g. `0.0.3` -> `0.0.4`). These releases may fix bugs or add features, but your existing setup should continue to work just fine. _You may review the upgrade notes for any specific information, e.g. if you need to update any custom style sheet or configuration to take advantage of new features._

- A **minor release** changes the middle number (e.g. `0.0.4` -> `0.1.0`). These releases typically make some kind of considerable (but generally backward-compatible) change, in addition to possibly fixing bugs or adding features. Your existing setup should continue to work just fine, provided that you have stuck to the documented features, only modified things that we explicitly broke out for customization, and are not doing anything that we have _deprecated_. We may also announce that we plan to deprecate something, which doesn't break anything yet, but warns you to switch to the recommended way of doing things at some point before it does break things. _You should review the upgrade notes below when upgrading to a minor version to check for breaking changes and newly deprecated items._

- A **major release** changes the first number (e.g. `0.1.5` -> `1.0.0`). These releases correspond to a major milestone in the project, and they might contain breaking changes to documented features or things we explicitly broke out for customization. We will have tried our best to warn you of this in advance by deprecating old ways of doing things in previous releases, but this is when we actually "pull the plug." _It is essential that you review the upgrade notes below when upgrading a major version to check for breaking changes and newly deprecated items._

## General Upgrade Procedure

1. Review the upgrade notes below, especially if you are upgrading more than just a patch release.

2. From the latest [Release](https://github.com/TheStaticMage/firebot-mage-raid-modal/releases), download: `firebot-mage-raid-modal-<version>.js` into your Firebot scripts directory

    (File &gt; Open Data Folder, then select the "scripts" directory)

    :warning: Be sure you download the file from the releases page, not the source code of the GitHub repository!

3. Go in to Settings &gt; Scripts &gt; Manage Startup Scripts and click the **Edit** button next to Raid Modal. Select the correctly versioned script from the dropdown. (If necessary, click on the icon to refresh the directory contents.)

4. Restart Firebot. (The new version of the script will _not_ be loaded until you actually restart Firebot.)

:bulb: You may optionally remove older versions of the script from the scripts directory once you have installed new ones.

## Upgrade Notes

n/a
