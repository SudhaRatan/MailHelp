import '../../index.css'

export interface Categories {
    name : string,
    NoOfEmails : number
}
  
function CategoriesComponent(props : Categories){

    return <div className='categoryContainer'>
      <div className="CategoriesHeader">
        <p className='categoryLabel'>Categories</p>
        <div className = "f7--plus"></div>
      </div>
      <div className="CategoriesValues">
        <p className='categoryLabelValue'>{props.name}</p>
        <div className = "number">{props.NoOfEmails.toString()}</div>
      </div>
    </div>
}

export default CategoriesComponent;