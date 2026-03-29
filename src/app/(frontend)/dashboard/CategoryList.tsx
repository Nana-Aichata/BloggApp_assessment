'use client'

import { useRef } from 'react'

const ACTUAL_CATEGORIES = [
  { name: "Technology", icon: "🧑‍💻" },
  { name: "Business & Finance", icon: "💼" },
  { name: "Education", icon: "🎓" },
  { name: "Lifestyle", icon: "🌍" },
  { name: "Travel", icon: "✈️" },
  { name: "Food & Cooking", icon: "🍔" },
  { name: "Fashion & Beauty", icon: "👗" },
  { name: "Health & Fitness", icon: "🧠" },
  { name: "Entertainment", icon: "🎮" },
  { name: "News & Opinion", icon: "📰" },
  { name: "Creative & Hobbies", icon: "📸" },
  { name: "Home & Living", icon: "🏡" },
  { name: "Pets & Animals", icon: "🐾" },
  { name: "Parenting & Family", icon: "👶" },
  { name: "Religion & Spirituality", icon: "🙏" }
];

export default function CategoryList() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const scrollAmount = 300
      
      if (direction === 'right') {
        // If we are at the end (or very close), go back to start
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      } else {
        // If we are at the start, go to the end
        if (scrollLeft <= 5) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
      }
    }
  }

  const categories = Array.from({ length: 15 }, (_, i) => `Category ${i + 1}`)

  return (
    <div className="categories-wrapper">
      <button type="button" className="nav-arrow-plain left" onClick={() => scroll('left')}>&#10094;</button>
      <div className="category-list" ref={scrollRef}>
        {ACTUAL_CATEGORIES.map((cat, i) => (
          <div key={i} className="category-item">
            <div className="category-circle">
               <span style={{ fontSize: '32px' }}>{cat.icon}</span>
            </div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
      <button type="button" className="nav-arrow-plain right" onClick={() => scroll('right')}>&#10095;</button>
    </div>
  )
}