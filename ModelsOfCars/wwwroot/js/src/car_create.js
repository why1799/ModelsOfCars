import { CarLoad } from '/js/car_load.js';
import * as Common from '/js/common.js'

export class CarCreate extends React.Component {
    constructor(props) {
        super(props);

        let val = {
            id: null
        };

        this.state = {
            value: val,
            parent: props.parent,
            setBrand: false,
            setTypeOfBody: false,
        };
    }

    exit() {
        this.state.parent.setState({ isLoaded: false, create: false });
    }

    save() {
        const value = this.state.value;
        let current = this;

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

        let data = {
            "brandId": value.brandId,
            "model": value.model,
            "bodyTypeId": value.bodyTypeId,
            "seatsCount": value.seatsCount,
            "url": value.url,
            "photoBase64": value.photoBase64
        }

        if (value.photoBase64 != "" && value.photoBase64 != null) {
            $.ajax({
                url: 'api/Cars/CheckOnExistWithTheSameParametrs?brandId=' + value.brandId + '&model=' + value.model + '&bodyTypeId=' + value.bodyTypeId + '&seatsCount=' + value.seatsCount,
            }).done(function (isExist) {
                if (!isExist) {
                    $.ajax({
                        type: 'POST',
                        url: 'api/Cars/Create',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).done(function (data) {
                        current.exit();
                        alert('Машина успешно сохранена');
                    }).fail(function (msg) {
                        alert('Сохранить не удалось!\n' + msg.responseText);
                    });
                }
                else {
                    alert('В базе уже есть с такими же данными');
                }
            });
        }
        else {

            $.ajax({
                type: 'POST',
                url: 'api/Cars/Create',
                contentType: 'application/json',
                data: JSON.stringify(data),
            }).done(function (data) {
                current.exit();
                alert('Машина успешно сохранена');
            }).fail(function (msg) {
                alert('Сохранить не удалось!\n' + msg.responseText);
            });
        }
    }

    componentDidMount() {
        Common.getBrands(this);
        Common.getBodyTypes(this);
    }

    triggerInputFile = () => this.fileInput.click();

    render() {
        const car = this.state.value;

        if (this.state.brands != null && !this.state.setBrand) {
            let value = this.state.value;
            value.brandId = this.state.brands[0].id;
            this.setState({ value: value, setBrand: true });
        }

        if (this.state.bodyTypes != null && !this.state.setTypeOfBody) {
            let value = this.state.value;
            value.bodyTypeId = this.state.bodyTypes[0].id;
            this.setState({ value: value, setTypeOfBody: true });
        }

        if (this.state.brands != null && this.state.bodyTypes != null && this.state.setBrand && this.state.setTypeOfBody) {

            let brand_options = this.state.brands.map(item => (
                <option value={item.id} key={item.id}>{item.name}</option>
            ));

            let bodyTypes_options = this.state.bodyTypes.map(item => (
                <option value={item.id} key={item.id}>{item.name}</option>
            ));

            let image;

            if (car.photoBase64 == null || car.photoBase64 == "") {
                image = (
                    <div className="photowrapper">
                        <input className="uploader" ref={fileInput => this.fileInput = fileInput} type="file" onChange={(e) => Common.fileAdded(e, this)} />
                        <img className="nophoto" src="/images/nophoto.png" height="100" width="100" />;
                        <img title="Удалить фото" className="removephoto" src="/images/cross.png" onClick={(e) => Common.removePhoto(e, this)} />
                        <img title="Добавить фото" className="addphoto" src="/images/add photo.png" onClick={this.triggerInputFile} />
                    </div>
                );
            }
            else {
                image = (
                    <div className="photowrapper">
                        <input className="uploader" ref={fileInput => this.fileInput = fileInput} type="file" onChange={(e) => Common.fileAdded(e, this)} />
                        <img className="withphoto" src={car.photoBase64} height="100" width="100" />;
                        <img title="Удалить фото" className="removephoto" src="/images/cross.png" onClick={(e) => Common.removePhoto(e, this)} />
                        <img title="Добавить фото" className="addphoto" src="/images/add photo.png" onClick={this.triggerInputFile} />
                    </div>
                );
            }

            return (
                <div id={car.id} className="car carhead">
                    {image}
                    <div className="cartext">
                        <select className="editorcreate" onChange={(e) => Common.handleChangeBrandSelect(e, this)}>{brand_options}</select><br />
                        <input className="inputline editorcreate" placeholder="Название модели..." required="" onChange={(e) => Common.handleChangeModel(e, this)} /><br />
                        <select className="editorcreate" onChange={(e) => Common.handleChangeBodyTypeSelect(e, this)}>{bodyTypes_options}</select><br />
                        <input className="inputline editorcreate" placeholder="Количество сидений в салоне..." required="" onChange={(e) => Common.handleChangeSeats(e, this)} /><br />
                        <input className="inputline editorcreate" placeholder="Ссылка... (необязательно)" onChange={(e) => Common.handleChangeUrl(e, this)} /><br />
                    </div>
                    <div>
                        <img title="Отмена" className="caricons" src="/images/cross.png" onClick={() => this.exit()} />
                        <img title="Сохранить" className="caricons" src="/images/save.png" onClick={() => this.save()} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <CarLoad parent={this} />
            );
        }
    }
}