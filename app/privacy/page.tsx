// Importing the Link component from next/link for client-side navigation between pages
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
      // Flexbox layout container
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-2">
        {/* Main heading */}
        <h1 className="text-3xl font-bold underline mt-[-6rem]">Privacy Policy</h1>
        {/* Subheading */}
        <p className="mt-4 text-base lg:text-lg">Please check back soon for the full privacy policy.</p>
        {/* Return Link */}
        <Link href="/" className="px-5 py-2 text-sm 2xl:text-2xl font-semibold leading-6 text-black hover:focus:text-gray-600 hover:text-gray-600 hover:underline">
          Return <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
}
