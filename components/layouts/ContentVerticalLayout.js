export default function ContentVerticalLayout({ children }) {
    return (
        <div className='max-w-[var(--max-width-total)] mx-auto w-full flex justify-between text-sm'>
            {children}
        </div>
    );
}