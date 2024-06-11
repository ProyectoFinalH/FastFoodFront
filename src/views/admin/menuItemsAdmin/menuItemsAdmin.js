import React from 'react'
import CardMenuItems from '../../../Components/card/cardMenuItems/cardMenuItems'

function MenuItemsAdmin({allMenuItems}) {
  return (
    <div>
       <div className="cardsContainer">
      {allMenuItems &&
        allMenuItems.map((menu) => (
          <CardMenuItems
            key={menu?.id}
            id={menu?.id}
            category={menu?.category_id}
            name={menu?.name}
            description={menu?.description}
            price={menu?.price}
            image={menu?.image_url}
            hideCartButtons={true}
          />
        ))}
      
    </div>
    </div>
  )
}

export default MenuItemsAdmin