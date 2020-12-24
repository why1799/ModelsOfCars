var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CarLoad } from '/js/car_load.js';
import * as Common from '/js/common.js';

export var CarEdit = function (_React$Component) {
    _inherits(CarEdit, _React$Component);

    function CarEdit(props) {
        _classCallCheck(this, CarEdit);

        var _this = _possibleConstructorReturn(this, (CarEdit.__proto__ || Object.getPrototypeOf(CarEdit)).call(this, props));

        _this.triggerInputFile = function () {
            return _this.fileInput.click();
        };

        _this.state = {
            root: props.root,
            value: props.parent.state.value,
            parent: props.parent,
            brands: null,
            bodyTypes: null,
            oldValue: Object.assign({}, props.parent.state.value)
        };
        return _this;
    }

    _createClass(CarEdit, [{
        key: 'cancel',
        value: function cancel() {
            this.state.parent.setState({ value: this.state.oldValue, current_state: 0 });
        }
    }, {
        key: 'deleteCar',
        value: function deleteCar() {

            var root = this.state.root;

            $.ajax({
                type: 'Delete',
                url: 'api/Cars/Delete?id=' + this.state.value.id
            }).done(function (data) {
                root.setState({ isLoaded: false });
                alert('Удаление прошло успешно');
            }).fail(function (msg) {
                alert('Удалить не удалось!\n' + msg.responseText);
            });
        }
    }, {
        key: 'save',
        value: function save() {
            var value = this.state.value;
            var oldValue = this.state.oldValue;
            var current = this;

            if (value.model == "" || value.model == null || value.model.length > 1000) {
                alert('Произошла ошибка. Поле модели обязательно для заполнение. Поле не должно превышать более 1000 символов.');
                return;
            }

            if (!(value.seatsCount >= 1 && value.seatsCount <= 12)) {
                alert('Произошла ошибка. Количество сидений должно быть от 1 до 12.');
                return;
            }

            if (value.url != null && value.url > 1000) {
                alert('Произошла ошибка. Ссылка не должна превышать более 1000 символов.');
                return;
            }

            var data = {
                "id": value.id,
                "brandId": value.brandId,
                "model": value.model,
                "bodyTypeId": value.bodyTypeId,
                "seatsCount": value.seatsCount,
                "url": value.url,
                "photoBase64": value.photoBase64
            };

            if (value.photoBase64 != oldValue.photoBase64 && value.photoBase64 != "" && value.photoBase64 != null) {
                $.ajax({
                    url: 'api/Cars/CheckOnExistWithTheSameParametrs?id=' + value.id + '&brandId=' + value.brandId + '&model=' + value.model + '&bodyTypeId=' + value.bodyTypeId + '&seatsCount=' + value.seatsCount
                }).done(function (isExist) {
                    if (!isExist) {
                        $.ajax({
                            type: 'PUT',
                            url: 'api/Cars/Update',
                            contentType: 'application/json',
                            data: JSON.stringify(data)
                        }).done(function (data) {
                            current.reloadOldValue();
                            alert('Машина успешно сохранена');
                        }).fail(function (msg) {
                            alert('Сохранить не удалось!\n' + msg.responseText);
                        });
                    } else {
                        alert('В базе уже есть машина с такими же данными');
                    }
                });
            } else {

                $.ajax({
                    type: 'PUT',
                    url: 'api/Cars/Update',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                }).done(function (data) {
                    current.reloadOldValue();
                    alert('Машина успешно сохранена');
                }).fail(function (msg) {
                    alert('Сохранить не удалось!\n' + msg.responseText);
                });
            }
        }
    }, {
        key: 'reloadOldValue',
        value: function reloadOldValue() {

            this.setState({ oldValue: Object.assign({}, this.state.value) });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            Common.getBrands(this);
            Common.getBodyTypes(this);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var car = this.state.value;
            if (this.state.brands != null && this.state.bodyTypes != null) {

                var brand_options = this.state.brands.map(function (item) {
                    return React.createElement(
                        'option',
                        { value: item.id, key: item.id },
                        item.name
                    );
                });

                var bodyTypes_options = this.state.bodyTypes.map(function (item) {
                    return React.createElement(
                        'option',
                        { value: item.id, key: item.id },
                        item.name
                    );
                });

                var image = void 0;

                if (car.photoBase64 == null || car.photoBase64 == "") {
                    image = React.createElement(
                        'div',
                        { className: 'photowrapper' },
                        React.createElement('input', { className: 'uploader', ref: function ref(fileInput) {
                                return _this2.fileInput = fileInput;
                            }, type: 'file', onChange: function onChange(e) {
                                return Common.fileAdded(e, _this2);
                            } }),
                        React.createElement('img', { className: 'nophoto', src: '/images/nophoto.png', height: '100', width: '100' }),
                        ';',
                        React.createElement('img', { title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u043E\u0442\u043E', className: 'removephoto', src: '/images/cross.png', onClick: function onClick(e) {
                                return Common.removePhoto(e, _this2);
                            } }),
                        React.createElement('img', { title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E', className: 'addphoto', src: '/images/add photo.png', onClick: this.triggerInputFile })
                    );
                } else {
                    image = React.createElement(
                        'div',
                        { className: 'photowrapper' },
                        React.createElement('input', { className: 'uploader', ref: function ref(fileInput) {
                                return _this2.fileInput = fileInput;
                            }, type: 'file', onChange: function onChange(e) {
                                return Common.fileAdded(e, _this2);
                            } }),
                        React.createElement('img', { className: 'withphoto', src: car.photoBase64, height: '100', width: '100' }),
                        ';',
                        React.createElement('img', { title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u043E\u0442\u043E', className: 'removephoto', src: '/images/cross.png', onClick: function onClick(e) {
                                return Common.removePhoto(e, _this2);
                            } }),
                        React.createElement('img', { title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E', className: 'addphoto', src: '/images/add photo.png', onClick: this.triggerInputFile })
                    );
                }

                return React.createElement(
                    'div',
                    { id: car.id, className: 'car carhead' },
                    image,
                    React.createElement(
                        'div',
                        { className: 'cartext' },
                        React.createElement(
                            'select',
                            { className: 'editorcreate', value: car.brandId, onChange: function onChange(e) {
                                    return Common.handleChangeBrandSelect(e, _this2);
                                } },
                            brand_options
                        ),
                        React.createElement('br', null),
                        React.createElement('input', { className: 'inputline editorcreate', placeholder: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438...', value: car.model, required: '', onChange: function onChange(e) {
                                return Common.handleChangeModel(e, _this2);
                            } }),
                        React.createElement('br', null),
                        React.createElement(
                            'select',
                            { className: 'editorcreate', value: car.bodyTypeId, onChange: function onChange(e) {
                                    return Common.handleChangeBodyTypeSelect(e, _this2);
                                } },
                            bodyTypes_options
                        ),
                        React.createElement('br', null),
                        React.createElement('input', { className: 'inputline editorcreate', placeholder: '\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0438\u0434\u0435\u043D\u0438\u0439 \u0432 \u0441\u0430\u043B\u043E\u043D\u0435...', value: car.seatsCount, required: '', onChange: function onChange(e) {
                                return Common.handleChangeSeats(e, _this2);
                            } }),
                        React.createElement('br', null),
                        React.createElement('input', { className: 'inputline editorcreate', placeholder: '\u0421\u0441\u044B\u043B\u043A\u0430... (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)', value: car.url, onChange: function onChange(e) {
                                return Common.handleChangeUrl(e, _this2);
                            } }),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('img', { title: '\u041E\u0442\u043C\u0435\u043D\u0430', className: 'caricons', src: '/images/cross.png', onClick: function onClick() {
                                return _this2.cancel();
                            } }),
                        React.createElement('img', { title: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C', className: 'caricons', src: '/images/save.png', onClick: function onClick() {
                                return _this2.save();
                            } }),
                        React.createElement('img', { title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C', className: 'caricons', src: '/images/rubbish.png', onClick: function onClick() {
                                return _this2.deleteCar();
                            } })
                    )
                );
            } else {
                return React.createElement(CarLoad, { parent: this });
            }
        }
    }]);

    return CarEdit;
}(React.Component);