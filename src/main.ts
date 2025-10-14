import { Firebot, RunRequest } from '@crowbartools/firebot-custom-scripts-types';
import { Logger } from '@crowbartools/firebot-custom-scripts-types/types/modules/logger';
import { backendEffectRunner } from './backend/effect-runner';
import { loggerHandler } from './backend/logger';
import { twitchBackendAPI } from './backend/twitch-api';
import effects from './effects/index';
import { raidModalUiExtension } from './ui-extension/index';
import replaceVariables from './variables/index';

export let firebot: RunRequest<any>;
export let logger: LogWrapper;

const scriptVersion = '0.0.1';

const script: Firebot.CustomScript<any> = {
    getScriptManifest: () => {
        return {
            name: "Raid Modal",
            description: "TheStaticMage's Firebot Raid Modal.",
            author: "The Static Mage",
            version: scriptVersion,
            startupOnly: true,
            firebotVersion: "5"
        };
    },
    getDefaultParameters: () => {
        return {};
    },
    parametersUpdated: () => {
        // No parameters to update
    },
    run: (runRequest) => {
        // Make sure we have a sufficiently recent version of Firebot.
        if (!runRequest || !runRequest.firebot || !runRequest.firebot.version) {
            throw new Error("Firebot version information is not available.");
        }

        const firebotVersion = runRequest.firebot.version;
        const firebotParts = firebotVersion.split('.');
        const majorVersion = parseInt(firebotParts[0], 10);
        const minorVersion = parseInt(firebotParts[1] || '0', 10);
        if (isNaN(majorVersion) || isNaN(minorVersion) || majorVersion < 5 || (majorVersion === 5 && minorVersion < 65)) {
            const { frontendCommunicator } = runRequest.modules;
            frontendCommunicator.send("error", `The installed version of Mage Raid Modal requires Firebot 5.65 or later. You are running Firebot ${firebotVersion}. Please update Firebot to use this plugin.`);
            return;
        }

        firebot = runRequest;
        logger = new LogWrapper(runRequest.modules.logger);
        logger.info(`TheStaticMage's Firebot Raid Modal v${scriptVersion} initializing...`);

        const { uiExtensionManager } = runRequest.modules;
        if (!uiExtensionManager) {
            logger.error("UI Extension Manager is not available.");
            return;
        }
        uiExtensionManager.registerUIExtension(raidModalUiExtension);

        const { effectManager } = runRequest.modules;
        for (const effect of effects) {
            effectManager.registerEffect(effect);
        }

        const { replaceVariableManager } = runRequest.modules;
        for (const variable of replaceVariables) {
            replaceVariableManager.registerReplaceVariable(variable);
        }

        backendEffectRunner.registerHandlers();
        loggerHandler.registerHandlers();
        twitchBackendAPI.registerHandlers();

        logger.info(`TheStaticMage's Firebot Raid Modal v${scriptVersion} initialized.`);
    }
};

class LogWrapper {
    private _logger: Logger;

    constructor(inLogger: Logger) {
        this._logger = inLogger;
    }

    info(message: string) {
        this._logger.info(`[firebot-mage-raid-modal] ${message}`);
    }

    error(message: string) {
        this._logger.error(`[firebot-mage-raid-modal] ${message}`);
    }

    debug(message: string) {
        this._logger.debug(`[firebot-mage-raid-modal] ${message}`);
    }

    warn(message: string) {
        this._logger.warn(`[firebot-mage-raid-modal] ${message}`);
    }
}

export default script;
