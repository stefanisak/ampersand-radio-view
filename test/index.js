var test = require('tape');
var RadioView = require('../ampersand-radio-view');
if (!Function.prototype.bind) Function.prototype.bind = require('function-bind');

//simulate a click
function click(view, value) {
    var element = view.el.querySelector('input[value=' + value + ']');
    view.radioClickHandler({target: element});
}

test('happy case', function(t) {
    var view = new RadioView({
        name: 'gender',
        type: 'hidden',
        buttons: [
            {
                text: 'Female',
                value: 'female',
                checked: true
            },
            {
                text: 'Male',
                value: 'male'
            }
        ]
    });

    view.render();
    t.equal(view.el.querySelectorAll('input[type=radio]').length, 2);

    var female = view.el.querySelector('input[value=female]');
    t.equal(female.nextSibling.textContent, 'Female');
    t.ok(female.checked);

    var male = view.el.querySelector('input[value=male]');
    t.equal(male.nextSibling.textContent, 'Male');
    t.notOk(male.checked);

    t.equal(view.value, 'female');
    t.end();
});

test('changing selection updates main control value', function(t) {
    debugger;
    var view = new RadioView({
        name: 'gender',
        type: 'hidden',
        buttons: [
            {
                text: 'Female',
                value: 'female',
                checked: true
            },
            {
                text: 'Male',
                value: 'male'
            }
        ]
    });

    view.render();
    t.equal(view.value, 'female');

    click(view, 'male');
    t.equal(view.value, 'male');

    click(view, 'female');
    t.equal(view.value, 'female');

    t.end();
});

test('unchecked', function(t) {
    var view = new RadioView({
        name: 'gender',
        type: 'radio',
        buttons: [
            {
                value: 'female',
                text: 'Female',
                checked: false
            }
        ]
    });

    view.render();
    var input = view.el.querySelector('input');
    t.equal(input.nextSibling.textContent, 'Female');
    t.notOk(input.checked);
    t.end();
});

test('unchecked is default', function(t) {
    var view = new RadioView({
        name: 'gender',
        type: 'radio',
        buttons: [
            {
                value: 'female',
                text: 'Female'
            }
        ]
    });

    view.render();
    var input = view.el.querySelector('input');
    t.equal(input.nextSibling.textContent, 'Female');
    t.notOk(input.checked);
    t.end();
});