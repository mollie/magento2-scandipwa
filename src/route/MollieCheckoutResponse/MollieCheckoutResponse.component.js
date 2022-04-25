import Loader from 'Component/Loader';

export class MollieCheckoutResponseComponent extends PureComponent {
    render() {
        return (
            <div
                block="MollieProcessReturn"
                className="ContentWrapper"
            >
                <Loader isLoading={ true } />
            </div>
        )
    }
}

export default MollieCheckoutResponseComponent
