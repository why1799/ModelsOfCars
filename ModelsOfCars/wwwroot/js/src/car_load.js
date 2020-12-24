export class CarLoad extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="car carhead">
                <img src="/images/loader.gif" className="center" width="110"/>
            </div>
        );
    }
}