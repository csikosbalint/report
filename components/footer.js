import Link from 'next/link';

export default function Footer() {
  return (
    <div className="py-6 w-full text-primary-foreground bg-primary text-lg">
      <div className="text-center">
        <p className="mb-4 font-semibold">&copy; {new Date().getFullYear()} Holnap.click. Minden jog fenntartva.</p>
        <div className="flex justify-center space-x-4 text-md">
          <Link href="/legal/privacy" className="hover:underline">
            Adatvédelmi Szabályzat
          </Link>
          <Link href="/legal/terms" className="hover:underline">
            Felhasználási Feltételek
          </Link>
        </div>
      </div>
    </div>
  );
}