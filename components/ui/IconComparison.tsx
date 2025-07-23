'use client'

import { useState } from 'react'
// Lucide React (已有)
import { Heart as LucideHeart, Star as LucideStar } from 'lucide-react'
// Heroicons (新安装)
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface IconComparisonProps {
  className?: string
}

export default function IconComparison({ className }: IconComparisonProps) {
  const [selectedLibrary, setSelectedLibrary] = useState('lucide')

  const libraries = [
    {
      id: 'lucide',
      name: 'Lucide React',
      description: '现代简洁的线性图标库 (当前使用)',
      examples: [
        { component: <LucideHeart className="w-8 h-8 text-red-500" />, name: 'Heart' },
        { component: <LucideStar className="w-8 h-8 text-yellow-500" />, name: 'Star' }
      ]
    },
    {
      id: 'heroicons',
      name: 'Heroicons',
      description: 'Tailwind CSS 团队开发的图标库',
      examples: [
        { component: <HeartIcon className="w-8 h-8 text-red-500" />, name: 'Heart (Outline)' },
        { component: <HeartSolid className="w-8 h-8 text-red-500" />, name: 'Heart (Solid)' },
        { component: <StarIcon className="w-8 h-8 text-yellow-500" />, name: 'Star (Outline)' },
        { component: <StarSolid className="w-8 h-8 text-yellow-500" />, name: 'Star (Solid)' }
      ]
    }
  ]

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">图标库对比示例</h3>
      
      {/* 选择器 */}
      <div className="flex space-x-2 mb-6">
        {libraries.map((library) => (
          <button
            key={library.id}
            onClick={() => setSelectedLibrary(library.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedLibrary === library.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {library.name}
          </button>
        ))}
      </div>

      {/* 当前选中的库 */}
      {libraries.find(lib => lib.id === selectedLibrary) && (
        <div>
          {(() => {
            const library = libraries.find(lib => lib.id === selectedLibrary)!
            return (
              <>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">{library.name}</h4>
                  <p className="text-sm text-gray-600">{library.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {library.examples.map((example, index) => (
                    <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      {example.component}
                      <span className="text-xs text-gray-600 mt-2 text-center">{example.name}</span>
                    </div>
                  ))}
                </div>

                {/* 代码示例 */}
                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-2">使用示例:</h5>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-800">
                      {library.id === 'lucide' && `import { Heart, Star } from 'lucide-react'

<Heart className="w-6 h-6 text-red-500" />
<Star className="w-6 h-6 text-yellow-500" />`}
                      {library.id === 'heroicons' && `import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

<HeartIcon className="w-6 h-6 text-red-500" />
<HeartSolid className="w-6 h-6 text-red-500" />`}
                    </pre>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}