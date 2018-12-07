/**
 * Validation for configuration and data objects,
 * This function will be executed with void result
 * or throw Error or console.warn if something goes wrong.
 * @param  {Object} obj             - objet to validate
 * @param  {String} validationObj   - name of object to validate
 * @return void
 */

export default function(obj, validationObj) {

    let check = true;
    let properties = validObj[validationObj];

    if(typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('[vue-flash-msg]: cofig must be an Object');
    }

    for(const prop in obj) {
        if(properties[prop]) {
            switch (properties[prop].type) {
                case 'object':
                check = typeof obj[prop] === properties[prop].type && !Array.isArray(obj[prop]);
                break;
                case 'array':
                check = Array.isArray(obj[prop]);
                break;
                default:
                check = properties[prop].pattern ? properties[prop].pattern.test(obj[prop]) : true && typeof obj[prop] === properties[prop].type;
            }
            if(!check) {
                let message = `[vue-flash-message] Property "${prop}" of the "${validationObj}" should be a "${properties[prop].type}"${properties[prop].message ? ` ${properties[prop].message}` : ''}`;
                throw new Error(message);
            }
        }
    }
}

const validObj = {
    // Validation of configObject params
    configObject: {
        name: {
            type: 'string',
            pattern: /^.+$/ig,
            message: 'and not empty'
        },
        tag: {
            type: 'string',
            pattern: /^.+$/ig,
            message: 'and not empty'
        },
        time: {
            type: 'number',
        },
        strategy: {
            type: 'string',
            pattern: /^(single|multiple)$/ig,
            message: 'and be equal to "single" or "multiple"'
        },
    },
    // Validation for message data object
    dataObject: {
        status: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        message: {
            type: 'string'
        },
        time: {
            type: 'number',
        },
        icon: {
            type: 'string'
        },
        clickable: {
            type: 'boolean'
        },
        flashMessageStyle: {
            type: 'object'
        },
        iconStyle: {
            type: 'object'
        },
        contentStyle: {
            type: 'object'
        },
        titleStyle: {
            type: 'object'
        },
        textStyle: {
            type: 'object'
        },
        mounted: {
            type: 'function'
        },
        destroyed: {
            type: 'function'
        }
    }
}
