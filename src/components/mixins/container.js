export function createContainerMixin(config) {

        return {
            computed: {
                // Get strategy
                strategy() {
                    return this[config.name].strategy;
                },
                // Get status in single message mode
                showMessage() {
                    return this[config.name].active;
                },
                message() {
                    return this[config.name].messages[0];
                },
                messages() {
                    return this[config.name].messages;
                }
            }
        }
}
