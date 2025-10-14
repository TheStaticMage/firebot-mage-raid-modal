import { HelixStreamFilter } from '@twurple/api';
import { firebot } from "../main";

class TwitchBackendAPI {
    registerHandlers() {
        const { frontendCommunicator, twitchApi } = firebot.modules;
        const streamerClient = twitchApi.getClient();

        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        frontendCommunicator.onAsync("raid-modal:get-streams", async (filter: HelixStreamFilter, includeStreamer = false, limit: number = 50) => {
            const paginatedRequest = streamerClient.streams.getStreamsPaginated(filter); // Returns from largest to smallest number of viewers
            const results = [];
            const streamerChannelId = firebot.firebot.accounts.streamer.userId;
            for await (const stream of paginatedRequest) {
                if (!includeStreamer && stream.userId === streamerChannelId) {
                    continue;
                }
                results.push({
                    id: stream.userId,
                    username: stream.userName,
                    displayName: stream.userDisplayName,
                    isMature: stream.isMature,
                    viewers: stream.viewers,
                    uptime: Math.floor((Date.now() - stream.startDate.getTime()) / 1000),
                    gameName: stream.gameName,
                    language: stream.language,
                    isLive: true
                });
                if (results.length >= limit) {
                    break;
                }
            }
            return results;
        });

        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        frontendCommunicator.onAsync("raid-modal:get-followed-streams", async (limit: number = 50) => {
            const streamerChannelId = firebot.firebot.accounts.streamer.userId;
            const paginatedRequest = streamerClient.streams.getFollowedStreamsPaginated(streamerChannelId);
            const results = [];
            for await (const stream of paginatedRequest) {
                results.push({
                    id: stream.userId,
                    username: stream.userName,
                    displayName: stream.userDisplayName,
                    isMature: stream.isMature,
                    viewers: stream.viewers,
                    uptime: Math.floor((Date.now() - stream.startDate.getTime()) / 1000),
                    gameName: stream.gameName,
                    language: stream.language,
                    isLive: true
                });
                if (results.length >= limit) {
                    break;
                }
            }
            return results;
        });
    }
}

export const twitchBackendAPI = new TwitchBackendAPI();
