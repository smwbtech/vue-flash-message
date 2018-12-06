export function configValidation(obj) {

    let check = {
        status: true,
        message: ''
    };

    if(typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('[vue-flash-msg]: cofig must be an Object');
    }

    for(const prop in obj) {
        check.status = typeof obj[prop] === properties[prop].type && properties[prop].pattern ? properties[prop].pattern.test(obj[prop]) : true;
        if(!check.status) throw new Error(properties[prop].message);
    }
}

const properties = {
    name: {
        type: 'string',
        pattern: /^.+$/ig,
        message: '[vue-flash-message] Property "name" of the "config object" should be a "Sring" and not empty'
    },
    tag: {
        type: 'string',
        pattern: /^.+$/ig,
        message: '[vue-flash-message] Property "tag" of the "config object" should be a "Sring" and not empty'
    },
    time: {
        type: 'number',
        message: '[vue-flash-message] Property "time" of the "config object" should be a "Number"'
    },
    icon: {
        type: 'boolean',
        message: '[vue-flash-message] Property "icon" of the "config object" should be a "Boolean"'
    },
    strategy: {
        type: 'string',
        pattern: /^(single|multiple)$/ig,
        message: '[vue-flash-message] Property "strategy" of the "config object" should be a "Sring" and be equal to "single" or "multiple"'
    },

}
