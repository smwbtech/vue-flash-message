export function createContainerMixin(config) {
    if(!config.strategy || config.strategy === 'single') {

        return {
            computed: {
                // Get strategy
                strategy() {
                    return this[config.name].strategy;
                },
                // Get status in single message mode
                showMessage() {
                    return this[config.name].isActive;
                }
            }
        }

    }
}
