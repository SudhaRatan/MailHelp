import '../../index.css'

export interface HeaderData {
    Label : string
}
  
function HeaderComponent(props : HeaderData){

    return <div className='HeaderContainer'>
            <div className='LeftContent'>
                <p className='HeaderLabel'>{props.Label}</p>
            </div>
                <div className='RightContent'>
                    <input type='text' placeholder="Search" className='searchbar'/>
                    <div className='basil--sort-outline'></div>
                </div>
        </div>
}

export default HeaderComponent;