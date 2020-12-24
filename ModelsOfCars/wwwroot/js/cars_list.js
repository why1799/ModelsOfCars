var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CarItem } from '/js/car_item.js';

export var CarsList = function (_React$Component) {
    _inherits(CarsList, _React$Component);

    function CarsList(props) {
        _classCallCheck(this, CarsList);

        return _possibleConstructorReturn(this, (CarsList.__proto__ || Object.getPrototypeOf(CarsList)).call(this, props));
    }

    _createClass(CarsList, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                error = _props.error,
                isLoaded = _props.isLoaded,
                response = _props.response,
                page = _props.page;

            if (error) {
                return React.createElement(
                    "div",
                    null,
                    "\u041E\u0448\u0438\u0431\u043A\u0430: ",
                    error.message
                );
            } else if (!isLoaded || page.current >= page.totalPages) {
                return React.createElement("img", { src: "/images/loader.gif", className: "center", width: "110" });
            } else if (page.totalPages == 0) {
                return React.createElement(
                    "h2",
                    null,
                    "\u0423 \u0412\u0430\u0441 \u043D\u0435\u0442 \u0435\u0449\u0451 \u043F\u043E\u0435\u0437\u0434\u043E\u043A! \u0421\u043A\u043E\u0440\u0435\u0435 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435!"
                );
            } else {

                return response.map(function (item) {
                    return React.createElement(CarItem, { value: item, key: item.id, current_state: 0 });
                });
            }
        }
    }]);

    return CarsList;
}(React.Component);