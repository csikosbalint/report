export default function MainHorizontalLayout({ children }) {
    return (
        <div className='min-h-screen flex flex-col items-center text-sm sm:text-md'>
            {children}
        </div>
    );
}