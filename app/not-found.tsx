import * as React from "react";
import { H4, Muted, M } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxArrowLeft } from "react-icons/rx";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-2 sm:gap-4 lg:gap-8 py-4 h-full w-full">
      <div>
        <Card className="border-0">
          <CardHeader className="justify-end">
            <Muted>404</Muted>
          </CardHeader>
          <CardContent className="justify-start">
            <H4>Page Not Found</H4>
            <M>The page your requested could not be found...</M>
          </CardContent>
          <CardFooter>
            <Link href="/">
              <Button variant="outline">
                <RxArrowLeft className="w-4 h4 mr-2" /> Return Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
