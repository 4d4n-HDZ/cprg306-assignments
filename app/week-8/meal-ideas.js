"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Defined outside the component so it's not recreated on every render
async function fetchMealIdeas(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!ingredient) return;
    fetchMealIdeas(ingredient).then(setMeals);
  }, [ingredient]);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">
          Meal Ideas
        </h2>
        {ingredient && (
          <p className="text-sm text-blue-400 mt-0.5">
            Based on: <span className="font-medium">{ingredient}</span>
          </p>
        )}
      </div>

      {!ingredient ? (
        <p className="p-6 text-gray-400 text-center text-sm">
          Click an item in your list to see meal ideas.
        </p>
      ) : meals.length === 0 ? (
        <p className="p-6 text-gray-400 text-center text-sm">
          No meal ideas found for &quot;{ingredient}&quot;.
        </p>
      ) : (
        <ul className="overflow-y-auto max-h-150">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 last:border-0 hover:bg-gray-700 transition-colors"
            >
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={48}
                height={48}
                className="rounded-lg object-cover shrink-0"
              />
              <span className="text-white text-sm font-medium">
                {meal.strMeal}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
