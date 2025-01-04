export function AdWrapper ({ position }) {
  return (
    <div
      className="w-[var(--ad-width)] bg-gray-100 p-4"
    >
      <div className='h-[600px] bg-gray-200 flex items-center justify-center text-gray-400'>
        Ad Space ({position})
      </div>
    </div>
  )
}
