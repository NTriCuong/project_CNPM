import './style.css'
function SearchItem({textTop, textCenter, textBottom, className, onClick}){
    return <div onClick={onClick} className={`item  ${className}`}>
        <div className='item-top'>{textTop}</div>
        <div className='item-center'>{textCenter}</div>
        <div className='item-bottom'>{textBottom}</div>
    </div>
}
export default SearchItem;