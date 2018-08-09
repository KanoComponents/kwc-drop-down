/**
`kwc-drop-down-item` is designed to be used as an item in a list inside `kwc-drop-down` you can add any content to it and an icon

Example:
    <kwc-drop-down-item icon="/assets/my-icon.png">
        <span>My message</span>
    </kwc-drop-down-item>


Custom property | Description | Default
----------------|-------------|----------
`--kwc-drop-down-item-icon-color` | Color of the icon | --color-grey
`--kwc-drop-down-item-icon-hover-color` | Hover color of the icon | --color-chateau
`--kwc-drop-down-item-icon` | Mixin applied to the icon | {}
`--kwc-drop-down-item-content` | Mixin applied to the content | {}

@group Kano Elements
@demo ./demo/kwc-drop-down-item.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@kano/kwc-style/color.js';
import '@kano/kwc-style/typography.js';
import '@kano/kwc-icons/kwc-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class KWCDropDownItem extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                @apply --layout-horizontal;
                @apply --layout-center;
                padding: 0px 12px;

                /* display: block; */
                font-family: var(--font-body);
                color: var(--color-chateau);
                font-weight: bold;
                font-size: 16px;
            }
            :host(:first-of-type) {
                margin-top: 4px;
            }
            :host(:last-of-type) {
                margin-bottom: 8px;
            }
            :host(:hover) {
                background-color: var(--color-porcelain);
                cursor: pointer;
            }
            .content {
                @apply --layout-flex;
                margin-top: 12px;
                margin-bottom: 14px;
                
                @apply --kwc-drop-down-item-content;
            }
            iron-icon {
                width: 18px;
                height: 18px;
                margin: 2px 14px 2px 2px;

                color: var(--kwc-drop-down-item-icon-color, var(--color-grey));
                
                @apply --kwc-drop-down-item-icon;
            }
            :host(:hover) iron-icon {
                color: var(--kwc-drop-down-item-icon-hover-color, var(--color-chateau));
            }
        </style>
        <template is="dom-if" if="[[_hasIcon]]">
            <iron-icon icon="[[icon]]"></iron-icon>
        </template>
        <div class="content">
            <slot></slot>
        </div>
`;
  }

  static get is() {
      return 'kwc-drop-down-item';
  }

  static get properties() {
      return {
          /**
          * An optional icon to be shown on the left side of the item.
          * Takes an iron-icon identifier.
          *
          * @type {String}
          */
          icon: {
              type: String,
              value: null
          },
          _hasIcon: {
              type: Boolean,
              computed: '_computeHasIcon(icon)'
          }
      };
  }

  _computeHasIcon(icon) {
      return !!icon;
  }
}

customElements.define(KWCDropDownItem.is, KWCDropDownItem);
