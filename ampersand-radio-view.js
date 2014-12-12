var View = require('ampersand-view');
var InputView = require('ampersand-input-view');
var _ = require('underscore');

//an internally used view that is used to draw each radio button
var OneButton = View.extend({
    template:
        '<div><input type="radio"><span data-hook="text"></span></div>',
    props: {
        text: ['string', true, ''],
        checked: ['boolean', false, false],
        value: ['any', true],
        name: ['string', true]
    },
    bindings: {
        'text': {
            type: 'text',
            hook: 'text'
        },
        'checked': {
            type: 'booleanAttribute',
            selector: 'input',
            name: 'checked'
        },
        'value': {
            type: 'attribute',
            selector: 'input',
            name: 'value'
        },
        'name': {
            type: 'attribute',
            selector: 'input',
            name: 'name'
        }
    }
});

module.exports = InputView.extend({
    template: [
        '<div class="form-group"><label data-hook="label"></label>',
        '<div class="radio-buttons"></div>',
        '<input type="hidden" data-hook="main">',
        '<div data-hook="message-container">',
        '<div data-hook="message-text" class="alert alert-danger"></div>',
        '</div>',
        '</div>'
    ].join(''),

    props: {
        buttons: 'array'
    },

    initialize: function() {
        //force the input type to hidden. Doing it here since there is an event on type change
        this.type = 'hidden';
        InputView.prototype.initialize.apply(this);
    },

    render: function () {
        InputView.prototype.render.apply(this);
        for(var i = 0; i < this.buttons.length; i++) {
            this.renderSubview(new OneButton({
                text: this.buttons[i].text,
                value: this.buttons[i].value,
                checked: this.buttons[i].checked,
                name: this.name + '-doNotUseDirectly'
            }), '.radio-buttons');
            if (this.buttons[i].checked) {
                this.inputValue = this.buttons[i].value;
            }
        }
    },

    events: _.extend({}, InputView.prototype.events, {
        'click input[type=radio]': 'radioClickHandler'
    }),

    radioClickHandler: function(e) {
        this.inputValue = e.target.value;
    }
});