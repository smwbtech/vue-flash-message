export function validation(obj) {

    let check = {
        status: true,
        message: ''
    };

    for(const prop in obj) {
        check = obj[prop] typeof properties[prop] && properties[prop].pattern ? properties[prop].pattern.test(obj[prop]) : true;
        if(!check)ckeck.message = properties[prop].message;
    }

    return check;
}

const properties = {
    name: {
        type: 'string',
        pattern: /^.+$/ig,
        message: '[vue-flash-message] Property "name" should be a "Sring" and not empty'
    },
    tag: {
        type: 'string',
        pattern: /^.+$/ig,
        message: '[vue-flash-message] Property "tag" should be a "Sring" and not empty'
    },
    time: {
        type: 'number',
        message: '[vue-flash-message] Property "time" should be a "Number"'
    },
    icon: {
        type: 'boolean',
        message: '[vue-flash-message] Property "icon" should be a "Boolean"'
    },
    strategy: {
        type: 'string',
        pattern: /^(single|multiple)$/ig,
        message: '[vue-flash-message] Property "strategy" should be a "Sring" and be equal to "single" or "multiple"'
    },

}
