var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var CarLoad = function (_React$Component) {
    _inherits(CarLoad, _React$Component);

    function CarLoad(props) {
        _classCallCheck(this, CarLoad);

        var _this = _possibleConstructorReturn(this, (CarLoad.__proto__ || Object.getPrototypeOf(CarLoad)).call(this, props));

        _this.state = {
            value: props.parent.state.value
        };
        return _this;
    }

    _createClass(CarLoad, [{
        key: "render",
        value: function render() {
            var car = this.state.value;
            return React.createElement(
                "div",
                { id: car.id, className: "car carhead" },
                React.createElement("img", { src: "/images/loader.gif", className: "center", width: "110" })
            );
        }
    }]);

    return CarLoad;
}(React.Component);