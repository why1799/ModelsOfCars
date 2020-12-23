var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var CarInfo = function (_React$Component) {
    _inherits(CarInfo, _React$Component);

    function CarInfo(props) {
        _classCallCheck(this, CarInfo);

        var _this = _possibleConstructorReturn(this, (CarInfo.__proto__ || Object.getPrototypeOf(CarInfo)).call(this, props));

        _this.state = {
            value: props.parent.state.value,
            parent: props.parent
        };
        return _this;
    }

    _createClass(CarInfo, [{
        key: "editCar",
        value: function editCar() {

            var parent = this.state.parent;

            $.ajax({
                url: "api/Cars/GetById?id=" + this.state.value.id,
                success: function success(data) {
                    parent.setState(function () {
                        return { value: data, current_state: 1 };
                    });
                }
            });

            parent.setState(function () {
                return { current_state: 2 };
            });
        }
    }, {
        key: "deleteCar",
        value: function deleteCar() {
            alert('not implemented');
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var car = this.state.value;

            return React.createElement(
                "div",
                { id: car.id, className: "car carhead" },
                React.createElement(
                    "div",
                    { className: "cartext" },
                    React.createElement(
                        "label",
                        { className: "carname" },
                        car.brandName
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { className: "cardesc" },
                        "\u041C\u043E\u0434\u0435\u043B\u044C: ",
                        car.model
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { className: "cardesc" },
                        "\u0422\u0438\u043F \u043A\u0443\u0437\u043E\u0432\u0430: ",
                        car.bodyTypeName
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { className: "cardesc" },
                        "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u0442: ",
                        car.seatsCount
                    )
                ),
                React.createElement(
                    "div",
                    { className: "iconsintriphead" },
                    React.createElement("img", { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C", className: "caricons", src: "/images/edit.png", onClick: function onClick() {
                            return _this2.editCar();
                        } }),
                    React.createElement("img", { title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", className: "caricons", src: "/images/rubbish.png", onClick: function onClick() {
                            return _this2.deleteCar();
                        } })
                )
            );
        }
    }]);

    return CarInfo;
}(React.Component);