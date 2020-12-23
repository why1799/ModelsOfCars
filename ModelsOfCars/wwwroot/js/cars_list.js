var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var size = 10;

import { CarItem } from '/js/car_item.js';

var CarsList = function (_React$Component) {
    _inherits(CarsList, _React$Component);

    function CarsList(props) {
        _classCallCheck(this, CarsList);

        var _this = _possibleConstructorReturn(this, (CarsList.__proto__ || Object.getPrototypeOf(CarsList)).call(this, props));

        _this.state = {
            error: null,
            isLoaded: false,
            page: 0,
            response: [],
            pageInfo: null
        };
        return _this;
    }

    _createClass(CarsList, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            var current = this;

            $.ajax({
                url: "api/Cars/GetAll?Size=" + size + "&Current=" + this.state.page,
                success: function success(data) {
                    current.setState(function () {
                        return { isLoaded: true, response: data.response, pageInfo: data.pageInfo };
                    });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                error = _state.error,
                isLoaded = _state.isLoaded,
                page = _state.page,
                response = _state.response,
                pageInfo = _state.pageInfo;

            if (error) {
                return React.createElement(
                    "div",
                    null,
                    "\u041E\u0448\u0438\u0431\u043A\u0430: ",
                    error.message
                );
            } else if (!isLoaded) {
                //Добавить крутящийся кружок
                return React.createElement(
                    "div",
                    null,
                    "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
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

var domContainer = document.querySelector('#cars_list');
ReactDOM.render(React.createElement(CarsList, null), domContainer);