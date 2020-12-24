export class CarInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: props.root,
            value: props.parent.state.value,
            parent: props.parent
        };
    }

    editCar() {

        var parent = this.state.parent;

        $.ajax({
            url: "api/Cars/GetById?id=" + this.state.value.id,
            success: function (data) {
                parent.setState(() => {
                    return { value: data, current_state: 1 }
                });
            }
        });

        parent.setState(() => {
            return { current_state: 2}
        });
    }

    deleteCar() {

        const root = this.state.root;

        $.ajax({
            type: 'Delete',
            url: 'api/Cars/Delete?id=' + this.state.value.id,
        }).done(function (data) {
            root.setState({ isLoaded: false });
            alert('Удаление прошло успешно');
        }).fail(function (msg) {
            alert('Удалить не удалось!\n' + msg.responseText);
        });
    }

    render() {
        const car = this.state.value;

        return (
            <div id={car.id} className="car carhead">
                <div className="cartext">
                    <label className="carname">{car.brandName}</label>
                    <br />
                    <label className="cardesc">Модель: {car.model}</label>
                    <br />
                    <label className="cardesc">Тип кузова: {car.bodyTypeName}</label>
                    <br />
                    <label className="cardesc">Количество мест: {car.seatsCount}</label>
                </div>
                <div className="iconsintriphead">
                    <img title="Редактировать" className="caricons" src="/images/edit.png" onClick={() => this.editCar()}/>
                    <img title="Удалить" className="caricons" src="/images/rubbish.png" onClick={() => this.deleteCar()}/>
                </div>
            </div>
        );
    }
}