import { ProcessEffectsRequest } from "@crowbartools/firebot-custom-scripts-types/types/modules/effect-runner";
import { AngularJsComponent } from "@crowbartools/firebot-custom-scripts-types/types/modules/ui-extension-manager";
import raidModalTemplate from "./raid-modal.html";

type Scope = ng.IScope & {
    $ctrl: any;
}

export const raidModalComponent: AngularJsComponent = {
    name: "raidModalComponent",
    template: raidModalTemplate,
    bindings: {
        resolve: "<",
        close: "&",
        dismiss: "&"
    },
    // controller: function($scope: Scope, backendCommunicator: any, ngToast: any) {
    controller: ($scope: Scope, backendCommunicator: any, ngToast: any) => {
        const $ctrl = $scope.$ctrl;

        // Initialize controller properties directly on this
        $ctrl.data = { model: null, confirmOfflineRaid: false };
        $ctrl.channels = [];
        $ctrl.confirmOfflineRaid = false;
        $ctrl.currentCategoryId = -1;
        $ctrl.currentCategoryName = "Loading...";
        $ctrl.currentCategoryUrl = "";
        $ctrl.defaultAvatar = "";
        $ctrl.hasValidationError = false;
        $ctrl.inputPlaceholder = "Start typing the username...";
        $ctrl.isActionEnabled = false;
        $ctrl.selectTargetType = "category";
        $ctrl.streamerIsOnline = false;
        $ctrl.streamerUsername = "";
        $ctrl.targetTypeOptions = { category: 'Same Category', followed: 'Followed Channels', username: 'Username' };
        $ctrl.validationText = "";

        // Passed through from the effect
        $ctrl.trigger = null;
        $ctrl.effect = null;

        // Watch for changes to $ctrl.data.confirmOfflineRaid and sync with $ctrl.confirmOfflineRaid
        $scope.$watch(() => $ctrl.data.confirmOfflineRaid, function(newVal: any) {
            $ctrl.confirmOfflineRaid = newVal;
        });

        $ctrl.logger = (prio: string, message: string) => {
            backendCommunicator.send('raid-modal:logger', {prio, message});
        };

        $ctrl.$onInit = () => {
            if ($ctrl.resolve && $ctrl.resolve.trigger && $ctrl.resolve.effectData) {
                $ctrl.trigger = $ctrl.resolve.trigger;
                $ctrl.effect = $ctrl.resolve.effectData;
                $ctrl.logger('debug', `Raid modal opened via effect. Trigger type: ${$ctrl.trigger.type || 'N/A'}`);
            } else {
                $ctrl.logger('error', `Incorrect data passed to raid modal component. resolve=${$ctrl.resolve ? 'defined' : 'undefined'}, trigger=${$ctrl.resolve?.trigger ? 'defined' : 'undefined'}, effectData=${$ctrl.resolve?.effectData ? 'defined' : 'undefined'}`);
                ngToast.create({
                    className: 'danger',
                    content: 'No raid configuration data was provided. Please check the effect configuration.'
                });
                $ctrl.dismiss();
                return;
            }

            backendCommunicator.fireEventAsync("get-channel-info")
                .then((channelInfo: any) => {
                    if (channelInfo && channelInfo.gameId) {
                        $ctrl.currentCategoryId = channelInfo.gameId;
                        $ctrl.onTargetTypeChange();
                        $ctrl.logger('debug', `Streamer current category ID: ${$ctrl.currentCategoryId}`);

                        backendCommunicator.fireEventAsync("get-twitch-game", $ctrl.currentCategoryId)
                            .then((gameInfo: any) => {
                                if (gameInfo && gameInfo.name) {
                                    $ctrl.currentCategoryName = gameInfo.name;
                                    $ctrl.logger('debug', `Streamer current category name: ${$ctrl.currentCategoryName}`);
                                } else {
                                    $ctrl.currentCategoryName = `Unknown Category (#${channelInfo.gameId})`;
                                    $ctrl.logger('debug', `Could not retrieve current category name for ID ${$ctrl.currentCategoryId}`);
                                }
                            });
                    } else {
                        ngToast.create({
                            className: 'danger',
                            content: `Could not retrieve current category information.`
                        });
                        $ctrl.logger('warn', `Could not retrieve current category information for the streamer.`);
                    }
                });

            backendCommunicator.fireEventAsync("get-stream-info")
                .then((streamInfo: any) => {
                    if (streamInfo && streamInfo.isLive) {
                        $ctrl.streamerIsOnline = true;
                    } else {
                        $ctrl.streamerIsOnline = false;
                    }
                    $ctrl.logger('debug', `Streamer is currently ${$ctrl.streamerIsOnline ? 'online' : 'offline'}.`);
                });
        };

        $ctrl.viewerSelected = function () {
            $ctrl.isActionEnabled = false;

            if (!$ctrl.data.model || !$ctrl.data.model.username) {
                return;
            }

            const channel = $ctrl.channels.find((c: any) => c.username === $ctrl.data.model.username);
            if (!channel) {
                $ctrl.hasValidationError = true;
                $ctrl.validationText = `The selected channel is not valid.`;
                return;
            }

            if (!channel.isLive) {
                $ctrl.hasValidationError = true;
                $ctrl.validationText = `The channel ${channel.displayName} is not currently live.`;
                return;
            }

            $ctrl.isActionEnabled = true;
            $ctrl.hasValidationError = false;
        };

        $ctrl.onTargetTypeChange = function () {
            $ctrl.channels = [];
            $ctrl.isActionEnabled = false;
            $ctrl.data.model = null;

            switch ($ctrl.selectTargetType) {
                case "username":
                    $ctrl.inputPlaceholder = "Start typing the username...";
                    break;
                case "category":
                    $ctrl.inputPlaceholder = "Select channel to raid...";
                    $ctrl.populateChannelsByCategory();
                    break;
                case "followed":
                    $ctrl.inputPlaceholder = "Select channel to raid...";
                    $ctrl.populateChannelsByFollowed();
                    break;
                default:
                    ngToast.create({
                        className: 'danger',
                        content: `Invalid target type selected.`
                    });
                    break;
            }
        };

        $ctrl.formatUptime = function(uptime: number) {
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const parts: string[] = [];
            if (hours > 0) {
                parts.push(`${hours}h`);
            }
            if (minutes > 0 || hours === 0) {
                parts.push(`${minutes}m`);
            }
            return parts.join('');
        };

        $ctrl.sortAndFormatChannels = function (channels: any[]) {
            if (!channels || channels.length === 0) {
                ngToast.create({
                    className: 'danger',
                    content: 'No channels found.'
                });
                return [];
            }

            channels.sort((a: any, b: any) => {
                if (a.isLive === b.isLive) {
                    return a.username.localeCompare(b.username);
                }
                return a.isLive ? -1 : 1;
            });

            channels.forEach((channel: any) => {
                if (typeof channel.uptime === 'number' && channel.uptime > 0) {
                    channel.uptimeString = $ctrl.formatUptime(channel.uptime);
                } else {
                    channel.uptimeString = "N/A";
                }
            });

            return channels;
        };

        $ctrl.searchForChannels = function(query: string) {
            if (query == null || query.trim() === "" || query.trim().length < 3) {
                return;
            }
            backendCommunicator.fireEventAsync("search-twitch-channels", query)
                .then((channels: any[]) => {
                    $ctrl.channels = $ctrl.sortAndFormatChannels(channels);
                });
        };

        $ctrl.populateChannelsByCategory = function () {
            if ($ctrl.currentCategoryId === -1) {
                ngToast.create({
                    className: 'danger',
                    content: 'Your current category is not known. Raid by category not possible.'
                });
                return;
            }

            $ctrl.channels = [];
            $ctrl.isActionEnabled = false;
            const filter = { game: $ctrl.currentCategoryId.toString() };

            backendCommunicator.fireEventAsync("raid-modal:get-streams", filter, false)
                .then((channels: any[]) => {
                    $ctrl.channels = $ctrl.sortAndFormatChannels(channels);
                    if ($ctrl.channels.length > 0) {
                        $ctrl.inputPlaceholder = "Select channel to raid...";
                    } else {
                        $ctrl.inputPlaceholder = "No channels found in this category.";
                    }
                });
        };

        $ctrl.populateChannelsByFollowed = function () {
            $ctrl.channels = [];
            $ctrl.isActionEnabled = false;

            backendCommunicator.fireEventAsync("raid-modal:get-followed-streams")
                .then((channels: any[]) => {
                    $ctrl.channels = $ctrl.sortAndFormatChannels(channels);
                    if ($ctrl.channels.length > 0) {
                        $ctrl.inputPlaceholder = "Select channel to raid...";
                    } else {
                        $ctrl.inputPlaceholder = "No followed channels are online.";
                    }
                });
        };

        $ctrl.initiateRaidOut = function() {
            if (!$ctrl.data.model.username || $ctrl.data.model.username.trim().length < 1) {
                ngToast.create({
                    className: 'danger',
                    content: `Please select a target channel.`
                });
                $ctrl.logger('warn', `Attempted to initiate raid with no target username specified.`);
                return;
            }

            const channel = $ctrl.channels.find((c: any) => c.username === $ctrl.data.model.username.trim());
            if (!channel || !channel.isLive) {
                ngToast.create({
                    className: 'danger',
                    content: `The selected channel is not valid or not live.`
                });
                $ctrl.logger('warn', `Attempted to initiate raid to invalid or offline channel: ${$ctrl.data.model.username}`);
                return;
            }

            if (!$ctrl.trigger.metadata.eventData) {
                $ctrl.trigger.metadata.eventData = {};
            }
            $ctrl.trigger.metadata.eventData.targetUsername = channel.username;
            $ctrl.trigger.metadata.eventData.targetUserDisplayName = channel.displayName;
            $ctrl.trigger.metadata.eventData.targetChannelId = channel.id;
            $ctrl.trigger.metadata.eventData.targetChannelViewers = channel.viewers;

            const req: ProcessEffectsRequest = {
                trigger: $ctrl.trigger,
                effects: $ctrl.effect.effectList
            };

            if ($ctrl.effect.listType === 'default') {
                $ctrl.logger('debug', `Using default effect list for raid initiation.`);
                req.effects = {
                    list: [
                        {
                            type: 'firebot:chat-feed-alert',
                            active: true,
                            icon: 'far fa-rocket',
                            message: `Raid initiated! Initiating raid to ${channel.displayName}...`
                        },
                        {
                            type: 'firebot:raid',
                            active: true,
                            action: 'Raid Channel',
                            username: channel.username
                        }
                    ]
                };
            }

            const count = req.effects.list ? req.effects.list.length : 0;
            if (count === 0) {
                ngToast.create({
                    className: 'danger',
                    content: `Failed to initiate raid: No actions were configured in the effect.`
                });
                $ctrl.logger('error', `Failed to initiate raid: No actions were configured in the effect.`);
                return;
            }

            $ctrl.logger('info', `Initiating raid to ${channel.displayName} (ID: ${channel.id}) with ${count} configured effect(s).`);
            backendCommunicator.fireEventAsync("raid-modal:run-effect-list", req)
                .then((result: any) => {
                    if (result && result.success) {
                        ngToast.create({
                            className: 'success',
                            content: `Raid to ${channel.displayName} initiated successfully!`
                        });

                        $ctrl.close();
                        $ctrl.logger('info', `Raid to ${channel.displayName} initiated successfully!`);
                        return;
                    }

                    ngToast.create({
                        className: 'danger',
                        content: `Failed to initiate raid: An unknown error occurred.`
                    });
                    $ctrl.logger('error', `Failed to initiate raid to ${channel.displayName}: An unknown error occurred.`);
                })
                .catch((error: any) => {
                    ngToast.create({
                        className: 'danger',
                        content: `Failed to initiate raid: ${error.message || 'Unknown error occurred.'}`
                    });
                    $ctrl.logger('error', `Failed to initiate raid to ${channel.displayName}: ${error.message || 'Unknown error occurred.'}`);
                });
        };
    }
};
