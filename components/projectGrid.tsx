import {Card, CardBody, CardFooter, CardHeader, Divider, Image, Spacer} from "@nextui-org/react";

<div id="projects-focus" className="w-full text-start block">
    <Spacer y={2} />
    <div  className="grid gap-6 grid-cols-12 grid-rows-2">
        <Card
            className="col-span-12 sm:col-span-6 row-span-2"
            isPressable onPress={() => router.push('/tempus')}
            isHoverable
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Full Stack Product</p>
                <h2 className="font-bold text-large">Tempus Productivity</h2>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/hero-card-complete.jpeg"
                />

            </CardBody>
        </Card>
        <Card
            className="col-span-12 sm:col-span-6 row-span-1 md:max-h-80 lg:max-h-60"
            isPressable onPress={() => router.push('/quaestio')}
            isFooterBlurred
            isHoverable
        >
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/quaestio_showcase_light.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Low Code Product</p>
                    <h2 className="font-bold text-medium">Quaestio</h2>
                </div>
            </CardFooter>
        </Card>
        <Card
            className="col-span-12 sm:col-span-6 row-span-1 md:max-h-80 lg:max-h-60"
            isPressable onPress={() => router.push('/legalis')}
            isFooterBlurred
            isHoverable
        >
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/quaestio_showcase_light.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">AI Project</p>
                    <h2 className="font-bold text-medium">Legalis</h2>
                </div>
            </CardFooter>
        </Card>
    </div>
</div>
<Divider className="my-16" />
<div id="projects-archive" className="">
    <Spacer y={2} />
    <div id="projects-archive" className="grid gap-6 grid-cols-12 w-full text-start">
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred onPress={() => router.push('/twinkles')}>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Product Management Showcase</p>
                    <h2 className="font-bold text-medium">Twinkles</h2>
                </div>
            </CardFooter>
        </Card>
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Full Stack Development</p>
                    <h2 className="font-bold text-medium">Habitus</h2>
                </div>
            </CardFooter>
        </Card>
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Design & Development</p>
                    <h2 className="font-bold text-medium">Intro</h2>
                </div>
            </CardFooter>
        </Card>
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">AI Project</p>
                    <h2 className="font-bold text-medium">Interpretor</h2>
                </div>
            </CardFooter>
        </Card>
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Backend Development</p>
                    <h2 className="font-bold text-medium">Uni Java Projects</h2>
                </div>
            </CardFooter>
        </Card>
        <Card className="col-span-6 sm:col-span-3 md:col-span-2" isPressable isFooterBlurred>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="img/twinkles_preview.png"
            />
            <CardFooter className="before:white/30 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="text-start text-black">
                    <p className="text-tiny uppercase font-medium">Backend Development</p>
                    <h2 className="font-bold text-medium">Uni Java Projects</h2>
                </div>
            </CardFooter>
        </Card>
    </div>
</div>