import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[20px] font-bold leading-[30px] text-gray-600 dark:text-white">
        {pageName}
      </h2>

      <nav className="text-md">
        <ol className="flex items-center gap-2">
          <li>
            <Link className="" href="/">
              Dashboard /
            </Link>
          </li>
          <li className=" text-orange-400 ">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
