export class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: props.parent,
            page: props.page
        };
    }

    createlifromto(from, to, current) {
        let array = new Array(to - from + 1)
        for (let i = from; i <= to; i++) {
            array[i - from] = i;
        }

        return array.map(item => {
            if (item == current) {
                return <li className="page currentPage" key={item}>{item} </li>
            }
            else {
                return <li className="page" key={item} onClick={() => this.changePage(item - 1)}>{item}</li>
            }
        });
    }

    changePage(onPage) {
        this.state.parent.setState({ isLoaded: false, create: false, page: onPage });
    }

    render() {
        const page = this.props.page;

        if (page == null) {
            return (
                <ul className="paging">

                </ul>
            );
        }


        let first = <li className="page" onClick={() => this.changePage(page.current - 1)}>&#129044;</li>;
        if (page.current == 0) {
            first = <li className="page">&#129044;</li>;
        }
        let dots = <li className="page">...</li>;
        let last = <li className="page" onClick={() => this.changePage(page.current + 1)}>&#129046;</li>;
        if (page.current + 1 == page.totalPages) {
            last = <li className="page">&#129046;</li>;
        }


        if (page.totalPages <= 7) {
            var lis = this.createlifromto(1, page.totalPages, page.current + 1);
            return (
                <ul className="paging">
                    {first}
                    {lis}
                    {last}
                </ul>
            );
        }
        else {
            if (page.current + 1 <= 5) {
                var from1to5 = this.createlifromto(1, 5, page.current + 1);
                var lastp = this.createlifromto(page.totalPages, page.totalPages)

                return (
                    <ul className="paging">
                        {first}
                        {from1to5}
                        {dots}
                        {lastp}
                        {last}
                    </ul>
                );
            }
            else if (page.current + 1 > page.totalPages - 5) {
                var firstp = this.createlifromto(1, 1, page.current + 1);
                var lastp = this.createlifromto(page.totalPages - 4, page.totalPages, page.current + 1);


                return (
                    <ul className="paging">
                        {first}
                        {firstp}
                        {dots}
                        {lastp}
                        {last}
                    </ul>
                );
            }
            else {
                var firstp = this.createlifromto(1, 1, page.current + 1);
                var middlep = this.createlifromto(page.current, page.current + 2, page.current + 1);
                var lastp = this.createlifromto(page.totalPages, page.totalPages, page.current + 1);


                return (
                    <ul className="paging">
                        {first}
                        {firstp}
                        {dots}
                        {middlep}
                        {dots}
                        {lastp}
                        {last}
                    </ul>
                );
            }
        }
    }
}