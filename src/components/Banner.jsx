import banner from '../assets/images/potw-banner.png';

export default function Banner(props) {
    const { className } = props;

    return (
        <div className={className}>
            <img
                alt="Tipestry post of the week event"
                className="banner"
                width="100%"
                src={banner} />
        </div>
    );
}
