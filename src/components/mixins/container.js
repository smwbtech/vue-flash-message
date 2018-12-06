export function createContainerMixin(config) {
    if(!config.strategy || config.strategy === 'single') {

        return {
            props: {
                // Styles for container block
                styles: {
                    type: Object,
                    default: null
                }
            },
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
