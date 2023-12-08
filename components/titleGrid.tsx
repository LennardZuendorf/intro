import {Card, CardBody, CardFooter, CardHeader, Image, Spacer} from "@nextui-org/react";
import {header} from "@/components/primitives";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";

export const TitleGrid = () => {
    const router = useRouter();

    return (
        <div  className="grid gap-6 grid-cols-12">
            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    
                </CardBody>
            </Card>

            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">

                </CardBody>
            </Card>

            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">

                </CardBody>
            </Card>

            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">

                </CardBody>
            </Card>

            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">

                </CardBody>
            </Card>

            <Card
                className="col-span-12 sm:col-span-6 md:col-span-4 text-start"
                isPressable onPress={() => router.push('/tempus')}
                isHoverable
                shadow = "None"
                radius = "sm"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2 className="font-bold text-large">Hi, I'm Lennard</h2>
                    <h2 className="font-medium text-small">A Student of Business Computing, Product Manager and Software Engineer.</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">

                </CardBody>
            </Card>

        </div>
    )
}