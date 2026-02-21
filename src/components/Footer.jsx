export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Rajib Dab. All rights reserved.</p>
        <p>
          Built with{" "}
          <span className="text-accent font-medium">React</span> &amp;{" "}
          <span className="text-accent font-medium">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
