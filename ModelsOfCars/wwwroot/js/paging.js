var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Paging = function (_React$Component) {
    _inherits(Paging, _React$Component);

    function Paging(props) {
        _classCallCheck(this, Paging);

        var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

        _this.state = {
            parent: props.parent,
            page: props.page
        };
        return _this;
    }

    _createClass(Paging, [{
        key: "createlifromto",
        value: function createlifromto(from, to, current) {
            var _this2 = this;

            var array = new Array(to - from + 1);
            for (var i = from; i <= to; i++) {
                array[i - from] = i;
            }

            return array.map(function (item) {
                if (item == current) {
                    return React.createElement(
                        "li",
                        { className: "page currentPage", key: item },
                        item,
                        " "
                    );
                } else {
                    return React.createElement(
                        "li",
                        { className: "page", key: item, onClick: function onClick() {
                                return _this2.changePage(item - 1);
                            } },
                        item
                    );
                }
            });
        }
    }, {
        key: "changePage",
        value: function changePage(onPage) {
            this.state.parent.setState({ isLoaded: false, create: false, page: onPage });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var page = this.props.page;

            if (page == null) {
                return React.createElement("ul", { className: "paging" });
            }

            var first = React.createElement(
                "li",
                { className: "page", onClick: function onClick() {
                        return _this3.changePage(page.current - 1);
                    } },
                "\uD83E\uDC14"
            );
            if (page.current == 0) {
                first = React.createElement(
                    "li",
                    { className: "page" },
                    "\uD83E\uDC14"
                );
            }
            var dots = React.createElement(
                "li",
                { className: "page" },
                "..."
            );
            var last = React.createElement(
                "li",
                { className: "page", onClick: function onClick() {
                        return _this3.changePage(page.current + 1);
                    } },
                "\uD83E\uDC16"
            );
            if (page.current + 1 == page.totalPages) {
                last = React.createElement(
                    "li",
                    { className: "page" },
                    "\uD83E\uDC16"
                );
            }

            if (page.totalPages <= 7) {
                var lis = this.createlifromto(1, page.totalPages, page.current + 1);
                return React.createElement(
                    "ul",
                    { className: "paging" },
                    first,
                    lis,
                    last
                );
            } else {
                if (page.current + 1 <= 5) {
                    var from1to5 = this.createlifromto(1, 5, page.current + 1);
                    var lastp = this.createlifromto(page.totalPages, page.totalPages);

                    return React.createElement(
                        "ul",
                        { className: "paging" },
                        first,
                        from1to5,
                        dots,
                        lastp,
                        last
                    );
                } else if (page.current + 1 > page.totalPages - 5) {
                    var firstp = this.createlifromto(1, 1, page.current + 1);
                    var lastp = this.createlifromto(page.totalPages - 4, page.totalPages, page.current + 1);

                    return React.createElement(
                        "ul",
                        { className: "paging" },
                        first,
                        firstp,
                        dots,
                        lastp,
                        last
                    );
                } else {
                    var firstp = this.createlifromto(1, 1, page.current + 1);
                    var middlep = this.createlifromto(page.current, page.current + 2, page.current + 1);
                    var lastp = this.createlifromto(page.totalPages, page.totalPages, page.current + 1);

                    return React.createElement(
                        "ul",
                        { className: "paging" },
                        first,
                        firstp,
                        dots,
                        middlep,
                        dots,
                        lastp,
                        last
                    );
                }
            }
        }
    }]);

    return Paging;
}(React.Component);