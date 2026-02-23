export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Rajib Dab. All rights reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://apostrophelabs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium hover:underline"
          >
            Apostrophe Labs
          </a>
        </p>
      </div>
    </footer>
  );
}
