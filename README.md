# ampersand-radio-view
An extension of [ampersand-input-view](https://github.com/AmpersandJS/ampersand-input-view) to create radio buttons.

Adds a "text" property for , and "checked" to indicate if the button should be checked at render time.

## install
won't work until I get this into npm!
```
npm install ampersand-radio-view
```
until then, you can add the following line directly into the dependencies section of your package.json:
"ampersand-radio-view": "git://github.com/mikehedman/ampersand-radio-view",


## example

```javascript
var FormView = require('ampersand-form-view');
var RadioView = require('ampersand-radio-view');

module.exports = FormView.extend({
    fields: function () {
        return [
            new RadioView({
                label: 'Gender',
                name: 'gender',
                value: 'female',
                required: false,
                text: 'Female',
                checked: this.model.gender ? (this.model.gender == 'female') : false,
                parent: this
            }),
            new RadioView({
                name: 'gender',
                value: 'male',
                required: false,
                text: 'Male',
                checked: this.model.gender ? (this.model.gender == 'male') : false,
                parent: this
            })
        ];
    }
});

```

#### opts

- text (required): the text to be shown to the right of the button.
- checked (default: false): indicates if the button should be checked at render time.

Note: the standard "type" property from ampersand-input-view is hardcoded in the radio control to "hidden", so there's really no benefit to putting type: "radio" in your declaration options.
Suggestion: Only use the "label" property for the first radio view in the set, and use that label as the set's label.
## changelog


## credits

Thanks to the Ampersand group!

## license

MIT

