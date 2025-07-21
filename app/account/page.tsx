import { Suspense } from 'react'
import AccountSearchComponent from './AccountSearchComponent'

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-gray-600">加载中...</div>
        </div>
      }
    >
      <AccountSearchComponent />
    </Suspense>
  )
}
