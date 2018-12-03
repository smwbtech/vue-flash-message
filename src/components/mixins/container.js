export function createContainerMixin(config) {
    if(!config.strategy || config.strategy === 'single') {

        return {
            computed: {
                isVisible() {
                    return false;
                }
            }
        }

    }
}
