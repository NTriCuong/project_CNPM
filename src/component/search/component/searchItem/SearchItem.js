import './style.css'
function SearchItem({textTop, textCenter, textBottom, className}){
    return <div className={`item  ${className}`}>
        <div className='item-top'>{textTop}</div>
        <div className='item-center'>{textCenter}</div>
        <div className='item-bottom'>{textBottom}</div>
    </div>
}
export default SearchItem;