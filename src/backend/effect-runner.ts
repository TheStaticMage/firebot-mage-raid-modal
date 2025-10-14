import { ProcessEffectsRequest } from "@crowbartools/firebot-custom-scripts-types/types/modules/effect-runner";
import { firebot } from "../main";

class BackendEffectRunner {
    registerHandlers() {
        const { effectRunner, frontendCommunicator } = firebot.modules;

        frontendCommunicator.onAsync("raid-modal:run-effect-list", async (req: ProcessEffectsRequest) => {
            const result = await effectRunner.processEffects(req);
            if (result?.success && result?.stopEffectExecution) {
                return {
                    success: true,
                    outputs: result.outputs,
                    execution: {
                        stop: true,
                        bubbleStop: true
                    }
                };
            }
            return {
                success: true,
                outputs: result?.outputs ?? undefined
            };
        });
    }
}

export const backendEffectRunner = new BackendEffectRunner();
