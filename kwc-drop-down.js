/**
`kwc-drop-down` is a simple tooltip like drop-down box

Example:

    <kwc-drop-down>
        <ul>
            <li>One</li>
            <li>Two</li>
        </ul>
    </kwc-drop-down>

    <kwc-drop-down caret-positoin="right" align="right">
        <img src="/my-img.png"/>
    </kwc-drop-down>

Custom property | Description | Default
----------------|-------------|----------
`--kwc-drop-down` | Mixin applied to the drop-down | `{}`
`--kwc-drop-down-background-color` | Background color of the dropdown | `white`
`--kwc-drop-down-caret-padding` | Distance of the caret from the border | `10px`

@group Kano Elements
@demo ./demo/kwc-drop-down.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class KWCDropDown extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                cursor: auto;
                z-index: 1;
                position: absolute;
                display: none;
            }
            .drop-down {
                position: absolute;
                left: 0px;
                display: inline-block;
                filter: drop-shadow(0 -1px 0 rgba(0,0,0,0.08))
                        drop-shadow(0 1px 0  rgba(0,0,0,0.08))
                        drop-shadow(1px 0px 0  rgba(0,0,0,0.08))
                        drop-shadow(-1px 0px 0  rgba(0,0,0,0.08));
            }
            .content {
                box-shadow: 0px 4px 4px rgba(0,0,0,0.10);
                background-color: var(--kwc-drop-down-background-color, white);
                border-radius: 6px;
                overflow: hidden;
                @apply --kwc-drop-down;
            }
            .drop-down.right {
                left: auto;
                right: 0px;
            }
            b.caret {
                display: block;
                margin: 0 var(--kwc-drop-down-caret-padding, 10px);
                padding: 0;
                width: 0;
                height: 0;
                border-top: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid var(--kwc-drop-down-background-color, white);
            }
            b.caret.right {
                margin: 0 auto;
                margin-right: var(--kwc-drop-down-caret-padding, 10px);
            }
            b.caret.center {
                margin: 0 auto;
            }
        </style>
        <div class\$="drop-down [[align]]" id="drop">
            <b class\$="caret [[caretPosition]]" id="caret"></b>
            <div class="content">
                <slot></slot>
            </div>
        </div>
`;
  }

  static get is() {
      return 'kwc-drop-down';
  }

  static get properties() {
      return {
          /**
          * Position of the caret (left, right or center).
          *
          * @type {String}
          */
          caretPosition: {
              type: String,
              value: 'left'
          },
          /**
          * Alignment of the drop-down relative to the top-left corner of the
          * element in DOM (left, right or center).
          *
          * @type {String}
          */
          align: {
              type: String,
              value: 'left'
          },
          opened: {
              type: Boolean,
              notify: true
          }
      };
  }

  constructor() {
      super();
      this.opened = false;
      this._onClick = this._onClick.bind(this);
  }

  /**
   * Hides the dropdown
   */
  close() {
      this.opened = false;
      this.style.display = 'none';

      window.removeEventListener('click', this._onClick);
  }

  /**
   * Displays the dropdown
   */
  open(e) {
      if (!this.opened) {
          this.opened = true;
          this.style.display = 'block';

          setTimeout(() => {
              window.addEventListener('click', this._onClick);
          }, 0);
      }
  }

  /**
   * Toggles between opened and closed
   */
  toggle() {
      if (!this.opened) {
          this.open();
      } else {
          this.close();
      }
  }

  _alignChanged(alignment) {
      this.toggleClass(alignment, true, this.$.drop);
  }

  _onClick (e) {
      const path = e.path || e.composedPath();
      if (this.opened && path.indexOf(this) === -1) {
          this.close();
      }
  }
}

customElements.define(KWCDropDown.is, KWCDropDown);
