export class CarLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.parent.state.value,
        };
    }

    render() {
        const car = this.state.value;
        return (
            <div id={car.id} className="car carhead">
                <img src="/images/loader.gif" className="center" width="110"/>
            </div>
        );
    }
}