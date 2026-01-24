import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
};

const BreadcrumbsNested = ({ items }: BreadcrumbProps) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav className="text-sm">
        <ol className="flex items-center gap-2">
          {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-orange-600 hover:text-black font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          );
        })}
          {/* <li>
            <Link className="" href="/">
              Home /
            </Link>
          </li>
          <li className=" text-orange-400 ">{pageName}</li> */}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbsNested;
