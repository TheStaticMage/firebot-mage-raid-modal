import { ReplaceVariable } from '@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager';
import { Trigger } from '@crowbartools/firebot-custom-scripts-types/types/triggers';

const model : ReplaceVariable = {
    definition: {
        handle: "raidModalActionTargetUsername",
        usage: "raidModalActionTargetUsername",
        description: "Get the username of the target of a raid modal action.",
        possibleDataOutput: ["text"],
        categories: ["advanced"]
    },
    evaluator: (trigger: Trigger) => {
        return trigger.metadata.eventData?.targetUsername || "";
    }
};

export default model;
