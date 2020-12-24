var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Heading = function (_React$Component) {
    _inherits(Heading, _React$Component);

    function Heading(props) {
        _classCallCheck(this, Heading);

        var _this = _possibleConstructorReturn(this, (Heading.__proto__ || Object.getPrototypeOf(Heading)).call(this, props));

        _this.state = {
            parent: props.parent
        };
        return _this;
    }

    _createClass(Heading, [{
        key: "add",
        value: function add() {
            this.state.parent.setState(function () {
                return { isLoaded: false, page: 0, create: true };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "carsheadadding" },
                React.createElement(
                    "h1",
                    { className: "carsname" },
                    "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043C\u0430\u0448\u0438\u043D\u044B:"
                ),
                React.createElement("img", { title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0448\u0438\u043D\u0443", className: "add", src: "/images/add.png", onClick: function onClick() {
                        return _this2.add();
                    } })
            );
        }
    }]);

    return Heading;
}(React.Component);