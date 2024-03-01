import SpinnerImg from '../../assets/spinner-icon-0.gif'

function Spinner() {
    return <div className="flex justify-center items-center m-10">
        <img src={SpinnerImg} alt="Loading..." className="w-20 h-20"/>
    </div>
}

export default Spinner