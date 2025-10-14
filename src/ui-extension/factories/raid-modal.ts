import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { AngularJsFactory } from "@crowbartools/firebot-custom-scripts-types/types/modules/ui-extension-manager";
import { Trigger } from "@crowbartools/firebot-custom-scripts-types/types/triggers";

function raidModalUiExtensionServiceFunction(backendCommunicator: any, utilityService: any): any {
    const service: any = {};

    type effectModel = {
        listType: 'default' | 'preset' | 'custom';
        effectList?: Firebot.EffectType<any>[];
        presetListId?: string;
        presetArgValues?: Record<string, string>;
    };

    backendCommunicator.on("raid-modal:show-raid-modal", (data: { trigger: Trigger, effectData: effectModel }) => {
        utilityService.showModal({
            component: "raidModalComponent",
            size: 'sm',
            resolveObj: {
                trigger: () => data.trigger,
                effectData: () => data.effectData
            }
        });
    });

    return service;
}

export const raidModalUiExtensionService: AngularJsFactory = {
    name: "raidModalUiExtensionService",
    function: (backendCommunicator: any, utilityService: any) => raidModalUiExtensionServiceFunction(backendCommunicator, utilityService)
};
