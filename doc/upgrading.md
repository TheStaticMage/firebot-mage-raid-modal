# Upgrading Guide

## Versioning Philosophy

- **Patch release** (e.g. `0.0.3` → `0.0.4`) - Bug fixes and minor features. Your setup should continue to work as-is. Review upgrade notes for any new optional features.

- **Minor release** (e.g. `0.0.4` → `0.1.0`) - Considerable backward-compatible changes. Generally safe, but review upgrade notes for any breaking changes or deprecations.

- **Major release** (e.g. `0.1.5` → `1.0.0`) - Potential breaking changes. Always review upgrade notes carefully when upgrading a major version.

## Upgrade Procedure

1. **Review upgrade notes** below, especially if upgrading more than a patch release

2. **Download** the new version from [Releases](https://github.com/TheStaticMage/firebot-mage-raid-modal/releases)
   - Download `firebot-mage-raid-modal-<version>.js`
   - Copy to your Firebot scripts directory (File > Open Data Folder, then select the **scripts** folder)

3. **Update startup script**
   - Go to **Settings** > **Scripts** > **Manage Startup Scripts**
   - Click the **Edit** button next to Raid Modal
   - Select the new version from the dropdown
   - If needed, click the folder icon to refresh the directory contents

4. **Restart Firebot**
   - The new version will not load until Firebot is restarted

5. **Optional cleanup**
   - Remove older versions of the script from the scripts directory once you have verified the new version works

## Upgrade Notes

None at this time.
