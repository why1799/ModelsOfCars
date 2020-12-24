var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var size = 2;

import { CarsList } from '/js/cars_list.js';
import { CarCreate } from '/js/car_create.js';
import { Heading } from '/js/heading.js';
import { Paging } from '/js/paging.js';

var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root(props) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

        _this.state = {
            isLoaded: false,
            page: 0,
            response: [],
            pageInfo: null,
            create: false
        };
        return _this;
    }

    _createClass(Root, [{
        key: 'load',
        value: function load() {
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
        key: 'render',
        value: function render() {
            var creation = void 0;

            if (this.state.create) {
                creation = React.createElement(CarCreate, { parent: this });
            }

            if (!this.state.isLoaded) {
                this.load();
            }

            return React.createElement(
                'div',
                { className: 'root' },
                React.createElement(Heading, { parent: this }),
                creation,
                React.createElement(CarsList, { isLoaded: this.state.isLoaded, response: this.state.response, page: this.state.pageInfo }),
                React.createElement(Paging, { parent: this, page: this.state.pageInfo })
            );
        }
    }]);

    return Root;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Root, null), domContainer);