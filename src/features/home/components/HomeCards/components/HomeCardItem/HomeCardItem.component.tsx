import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavItem } from "@/utils/utils";

interface HomeCardItemProps {
  item: NavItem;
}

export const HomeCardItem = ({ item }: HomeCardItemProps) => {
  return (
    <Card className="relative w-full pt-0 font-mono mx-auto animate-in fade-in slide-in-from-bottom-8 duration-2000 fill-mode-forwards text-4xl font-bold rounded-xl">
      <CardHeader>
        <CardTitle>{item.label}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={item.href} className="w-full">
          <Button className="w-full bg-purple-800 rounded-2xl hover:animate-bounce hover:scale-110 cursor-pointer">
            Open
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
