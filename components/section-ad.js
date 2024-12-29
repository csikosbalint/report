export function SectionAd({ position }) {
  return (
    (<div
      className={`hidden lg:block w-[21.5rem] bg-gray-100 p-4 ${position === 'left' ? 'mr-4' : 'ml-4'}`}>
      <div
        className="h-[600px] bg-gray-200 flex items-center justify-center text-gray-400">
        Ad Space ({position})
      </div>
    </div>)
  );
}

