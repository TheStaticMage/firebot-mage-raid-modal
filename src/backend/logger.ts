import { firebot, logger } from "../main";

class LoggerHandler {
    registerHandlers() {
        const { frontendCommunicator } = firebot.modules;

        frontendCommunicator.on("raid-modal:logger", ({prio, message}: {prio: 'debug' | 'info' | 'warn' | 'error', message: string}) => {
            switch (prio) {
                case 'debug':
                    logger.debug(message);
                    break;
                case 'info':
                    logger.info(message);
                    break;
                case 'warn':
                    logger.warn(message);
                    break;
                case 'error':
                    logger.error(message);
                    break;
                default:
                    logger.info(message);
                    break;
            }
        });
    }
}

export const loggerHandler = new LoggerHandler();
