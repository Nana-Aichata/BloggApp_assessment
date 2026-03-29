'use client'

import { useRef } from 'react'
import Link from 'next/link'

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
        if (scrollLeft + clientWidth >= scrollWidth - 5) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        else scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      } else {
        if (scrollLeft <= 5) scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' })
        else scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="categories-wrapper">
      <button type="button" className="nav-arrow-plain left" onClick={() => scroll('left')}>&#10094;</button>
      <div className="category-list" ref={scrollRef}>
        {ACTUAL_CATEGORIES.map((cat, i) => (
          <Link 
            key={i} 
            href={`/dashboard?category=${encodeURIComponent(cat.name)}`} 
            className="category-item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="category-circle">
               <span style={{ fontSize: '32px' }}>{cat.icon}</span>
            </div>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
      <button type="button" className="nav-arrow-plain right" onClick={() => scroll('right')}>&#10095;</button>
    </div>
  )
}