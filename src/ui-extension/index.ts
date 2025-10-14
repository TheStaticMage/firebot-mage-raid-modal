import { UIExtension } from "@crowbartools/firebot-custom-scripts-types/types/modules/ui-extension-manager";
import { raidModalComponent } from "./components/raid-modal";
import { raidModalUiExtensionService } from "./factories/raid-modal";

export const raidModalUiExtension: UIExtension = {
    id: "raidModalUiExtension",
    providers: {
        components: [raidModalComponent],
        factories: [raidModalUiExtensionService]
    }
};
