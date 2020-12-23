import { CarLoad } from '/js/car_load.js';
import * as Common from '/js/common.js'

export class CarEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.parent.state.value,
            parent: props.parent,
            brands: null,
            bodyTypes: null,
            oldValue: Object.assign({}, props.parent.state.value)
        };
    }

    cancel() {
        this.state.parent.setState({ value: this.state.oldValue, current_state: 0  });
    }

    save() {
        const value = this.state.value;
        var oldValue = this.state.oldValue;
        let current = this;

        let data = {
            "id": value.id,
            "brandId": value.brandId,
            "model": value.model,
            "bodyTypeId": value.bodyTypeId,
            "seatsCount": value.seatsCount,
            "url": value.url,
            "photoBase64": value.photoBase64
        }

        if (value.photoBase64 != oldValue.photoBase64 && value.photoBase64 != "" && value.photoBase64 != null) {
            $.ajax({
                url: 'api/Cars/CheckOnExistWithTheSameParametrs?id=' + value.id + '&brandId=' + value.brandId + '&model=' + value.model + '&bodyTypeId=' + value.bodyTypeId + '&seatsCount=' + value.seatsCount,
            }).done(function (isExist) {
                if (!isExist) {
                    $.ajax({
                        type: 'PUT',
                        url: 'api/Cars/Update',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).done(function (data) {
                        alert('SUCCESS');

                        current.reloadOldValue();

                    }).fail(function (msg) {
                        alert('FAIL');
                    });
                }
                else {
                    alert('В базе уже есть с такими же данными');
                }
            });
        }
        else {

            $.ajax({
                type: 'PUT',
                url: 'api/Cars/Update',
                contentType: 'application/json',
                data: JSON.stringify(data),
            }).done(function (data) {
                alert('SUCCESS');

                current.reloadOldValue();
                
            }).fail(function (msg) {
                alert('FAIL');
            });
        }
    }

    reloadOldValue() {

        this.setState({ oldValue: Object.assign({}, this.state.value) });
    }

    componentDidMount() {
        getBrands(this);
        getBodyTypes(this)
    }

    

    triggerInputFile = () => this.fileInput.click();

    render() {
        const car = this.state.value;
        if (this.state.brands != null && this.state.bodyTypes != null) {

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
                        <img title="Удалить фото" className="removephoto" src="/images/cross.png" onClick={(e) => Common.removePhoto(e, this)}  />
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
                        <select className="editorcreate" value={car.brandId} onChange={(e) => Common.handleChangeBrandSelect(e, this)}>{brand_options}</select><br />
                        <input className="inputline editorcreate" placeholder="Название модели..." value={car.model} required="" onChange={(e) => Common.handleChangeModel(e, this)} /><br />
                        <select className="editorcreate" value={car.bodyTypeId} onChange={(e) => Common.handleChangeBodyTypeSelect(e, this)}>{bodyTypes_options}</select><br />
                        <input className="inputline editorcreate" placeholder="Количество сидений в салоне..." value={car.seatsCount} required="" onChange={(e) => Common.handleChangeSeats(e, this)}/><br />
                        <input className="inputline editorcreate" placeholder="Ссылка... (необязательно)" value={car.url} onChange={(e) => Common.handleChangeUrl(e, this)}/><br />
                    </div>
                    <div>
                        <img title="Отмена" className="caricons" src="/images/cross.png" onClick={() => this.cancel()} />
                        <img title="Сохранить" className="caricons" src="/images/save.png" onClick={() => this.save()} />
                        <img title="Удалить" className="caricons" src="/images/rubbish.png" onClick={() => this.delete()} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <CarLoad parent={this}/>
            );
        }
    }
}

function getBrands(car) {
    $.ajax({
        url: "api/Brands/GetAll",
        success: function (data) {

            car.setState(() => {
                return { brands: data }
            });
        }
    });
}

function getBodyTypes(car) {
    $.ajax({
        url: "api/BodyType/GetAll",
        success: function (data) {

            car.setState(() => {
                return { bodyTypes: data }
            });
        }
    });
}