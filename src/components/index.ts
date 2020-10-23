import flashMessage, { FlashMessagePlugin } from "./FlashMessagePlugin";
import Install from './FlashMessageInstall'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $flashMessage: FlashMessagePlugin;
    }
}

export default Install;
export { flashMessage, FlashMessagePlugin };

