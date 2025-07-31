import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

export default function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    [1, 2, 3, 4, 5].map((star) => (
      <Button
        key={star}
        variant="outline"
        size="icon"
        className={`p-2 rounded-full transition-colors ${
          star <= rating
            ? 'text-yellow-500 hover:border-green-300'
            : 'text-black hover:bg-black hover:text-pink-400'
        }`}
        onClick={() => handleRatingChange && handleRatingChange(star)} 
      >
        <StarIcon
          className={`w-6 h-6 ${star <= rating ? 'fill-yellow-500' : ''}`}
        />
      </Button>
    ))
  )
}
