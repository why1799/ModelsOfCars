var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CarInfo } from '/js/car_info.js';
import { CarLoad } from '/js/car_load.js';
import { CarEdit } from '/js/car_edit.js';

export var CarItem = function (_React$Component) {
    _inherits(CarItem, _React$Component);

    function CarItem(props) {
        _classCallCheck(this, CarItem);

        var _this = _possibleConstructorReturn(this, (CarItem.__proto__ || Object.getPrototypeOf(CarItem)).call(this, props));

        _this.state = {
            root: props.root,
            value: props.value,
            current_state: props.current_state // 0 - info, 1 - edit, 2 - load
        };
        return _this;
    }

    _createClass(CarItem, [{
        key: 'render',
        value: function render() {
            var current_state = this.state.current_state;

            if (current_state === 0) {
                return React.createElement(CarInfo, { root: this.state.root, parent: this });
            }
            if (current_state === 1) {
                return React.createElement(CarEdit, { root: this.state.root, parent: this });
            } else if (current_state === 2) {
                return React.createElement(CarLoad, { parent: this });
            }
        }
    }]);

    return CarItem;
}(React.Component);