// import { createContainerMixin } from './mixins/container.js';
// import { createMessageMixin } from './mixins/message.js';
// import { createEventbusFallback } from './fallback/eventbus-fallback.js';
// import ContainerElem from './Container.vue';
// import FlashMessageElem from './FlashMessage.vue';

import { FlashMessagePlugin } from "./FlashMessagePlugin";
import Install from './FlashMessageInstall'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $flashMessage: FlashMessagePlugin;
    }
}

export default Install

