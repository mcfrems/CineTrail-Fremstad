import React from 'react'
import StarRatings from 'react-star-ratings'

function Rating() {
  return (
    <div>
        <StarRatings
          rating={3.5}
          starRatedColor="red"
          numberOfStars={5}
          starDimension="15px"
          starSpacing="1px"
        />
    </div>
  )
}

export default Rating