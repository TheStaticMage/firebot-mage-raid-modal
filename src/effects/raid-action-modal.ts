import { Firebot } from '@crowbartools/firebot-custom-scripts-types';
import { firebot } from '../main';
import raidActionModalTemplate from './raid-action-modal.html';

type effectModel = {
    listType: 'default' | 'custom';
    effectList?: { list: any[] };
};

const model: Firebot.EffectType<effectModel> = {
    definition: {
        id: "raid-modal:raid-action-modal",
        name: "Raid Action Modal",
        description: "Displays the raid action modal that allows you to select a target and initialize a raid.",
        icon: "fas fa-parachute-box",
        categories: ["advanced"]
    },
    optionsTemplate: raidActionModalTemplate,
    getDefaultLabel: (effect: effectModel) => {
        if (effect.listType === 'default') {
            return "Default: Initiate raid";
        } else if (effect.listType === 'custom') {
            const count = effect.effectList && effect.effectList.list ? effect.effectList.list.length : 0;
            return `Custom: ${count} effect${count !== 1 ? 's' : ''}`;
        }
        return "";
    },
    optionsValidator: (effect: effectModel): string[] => {
        const errors: string[] = [];

        // STAGE 1: VALIDATION - Check for errors without modifying the effect
        if (effect.listType === 'custom') {
            const count = effect.effectList && effect.effectList.list ? effect.effectList.list.length : 0;
            if (count === 0) {
                errors.push('Please add at least one effect to the custom effect list.');
            }
        }
        // Default mode requires no validation

        // STAGE 2: CLEANUP - Only proceed if there are no validation errors
        if (errors.length === 0) {
            if (effect.listType === 'default') {
                // For default mode, remove preset and custom properties
                delete effect.effectList;
            }
        }

        return errors;
    },
    optionsController: ($scope: any) => {
        if (!$scope.effect.listType) {
            $scope.effect.listType = 'default';
        }

        $scope.triggerMeta = {
            eventData: {}
        };

        $scope.listTypeChanged = function() {
            // This function triggers AngularJS digest cycle when listType changes
            // The ng-if conditions in the template will automatically re-evaluate
        };

        $scope.effectListUpdated = function(effects: any[]) {
            ($scope.effect).effectList = effects;
        };
    },
    onTriggerEvent: async (event) => {
        const { frontendCommunicator } = firebot.modules;
        frontendCommunicator.send("raid-modal:show-raid-modal", {
            trigger: event.trigger,
            effectData: event.effect
        });
    }
};

export default model;
