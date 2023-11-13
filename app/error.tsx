'use client' 
 
import { useEffect } from 'react'
import { title } from "@/components/primitives";
import { Button } from '@nextui-org/react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
        <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>An Error has occured!</h1>
        </div>
      <div>
        <Button
          onClick={
            () => reset()
          }
        >
          Reload
        </Button>
      </div>
    </section>
  )
}