import { ReplaceVariable } from '@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager';
import { Trigger } from '@crowbartools/firebot-custom-scripts-types/types/triggers';

const model : ReplaceVariable = {
    definition: {
        handle: "raidModalActionTargetUserDisplayName",
        usage: "raidModalActionTargetUserDisplayName",
        description: "Get the user display name of the target of a raid modal action.",
        possibleDataOutput: ["text"],
        categories: ["advanced"]
    },
    evaluator: (trigger: Trigger) => {
        return trigger.metadata.eventData?.targetUserDisplayName || "";
    }
};

export default model;
