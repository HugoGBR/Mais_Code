"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import {cva, type VariantProps} from "class-variance-authority"
import { RiMenu3Fill } from "react-icons/ri";

import {cn} from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({className, ...props}, ref) => (
    <SheetPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
        ref={ref}
    />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
    "absolute z-50 gap-4 bg-[#122F54] p-3 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
    {
        variants: {
            side: {
                left: "inset-y-0 left-0 h-full w-2/4 text-white border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            },
        },
        defaultVariants: {
            side: "left",
        },
    }
);

interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {
}

const SheetContent = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Content>,
    SheetContentProps
>(({
       side = "left", // Definindo o lado como "left" por padrão
       className,
       children,
       ...props
   }, ref) => (
    <SheetPortal>
        <SheetOverlay/>
        <SheetPrimitive.Content
            ref={ref}
            className={cn(sheetVariants({side}), className)}
            {...props}
        >
            {children}
            <SheetPrimitive.Close
                className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary">
                <RiMenu3Fill className="h-8 w-auto text-white"/>
                <span className="sr-only">Close</span>
            </SheetPrimitive.Close>*
        </SheetPrimitive.Content>
    </SheetPortal>
));

SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col",
            className
        )}
        {...props}
    />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({className, ...props}, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
}
