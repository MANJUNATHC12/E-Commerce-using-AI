import '../Components/card.css'
function Card(props) {
    return (
        <div className="card">
            <p >{props.title}</p>
            <p >{props.description}</p>
        </div>
    )
}

export default Card;