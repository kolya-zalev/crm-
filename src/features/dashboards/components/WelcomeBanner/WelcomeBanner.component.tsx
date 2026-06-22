import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WelcomeBannerProps } from "./WelcomeBanner.types";


export function WelcomeBannerComponents({newLeadsCount}: WelcomeBannerProps){
    return(
          <Card className="w-full bg-linear-to-r from-blue-100 to-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-2000  fill-mode-forwards  shadow-sm hover:shadow-xl transition-shadow shadow-red-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Welcome back!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-3">
        <p className="text-muted-foreground">
          You have {newLeadsCount} new leads waiting for review
        </p>
        <Link href="/lead">
          <Button className="cursor-pointer rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-colors">
            Go to leads
          </Button>
        </Link>
      </CardContent>
    </Card>
    )
}