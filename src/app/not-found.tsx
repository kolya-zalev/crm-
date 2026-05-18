import { Button } from "@/components/ui/button";
import Link from "next/link";
import { brand } from "../config/utils";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-7xl font-bold text-gray-400">404</div>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <div className="pt-6">
        <Button
          asChild
          color="primary"
          variant="link"
          className="rounded-full border-gray-600 hover:bg-white hover:text-black transition-all duration-300"
        >
          <Link href={brand.href}>Back to main </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
