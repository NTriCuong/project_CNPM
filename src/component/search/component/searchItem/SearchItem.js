import './style.css'
function SearchItem({textTop, textCenter, textBottom}){
    return <div className='item'>
        <div className='item-top'>{textTop}</div>
        <div className='item-center'>{textCenter}</div>
        <div className='item-bottom'>{textBottom}</div>
    </div>
}
export default SearchItem;