function InputSelect({className, data}){
    
    return <div className={className}>
                <input type="text" placeholder="Điểm Khởi Hành" ></input>
                <div style={{paddingLeft:'20px'}}>
                    <div style={{color:'#233A60',fontWeight:'bold', fontFamily:'poppins, sans-serif;', padding:'5px'}}
                    >Tìm Kiếm Gần Đây</div>
                    <div>list</div>
                    <div style={{color:'#233A60', fontWeight:'bold', fontFamily:'poppins, sans-serif;',padding:'5px'}}
                    >THÀNH PHỐ PHỔ BIẾN</div>
                    <div>list</div>
                </div>
            </div>
}
export default InputSelect;