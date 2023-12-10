"use client";

import { Bell, Menu, Search, Video, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TopNavigation = () => {
  // Hook To Open the dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  // Search input
  const searchRef = useRef<HTMLInputElement>(null);
  // OnSubmit button
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchRef.current) {
      console.log(searchRef.current.value);
    }
  };
  return (
    <nav className="fixed top left-0 w-screen z-20 dark:bg-black bg-white">
      <div className="flex justify-between ic px-2 md:px-7 h-16 ">
        <div className="flex items-center">
          <span className="hover:bg-background-dark/30 md:block hidden hover:text-white cursor-pointer rounded-full p-2 mr-1">
            <Menu size={30} />
          </span>
          <Link href="/" className="flex items-center space-x-2">
            <YoutubeIcon size={40} className="text-red-700" />
            <span className="hidden md:block text-2xl font-bold">Youtube</span>
          </Link>
        </div>

        <div className="md:flex items-center justify-center hidden">
          <form
            onSubmit={handleSubmit}
            className="flex items-center h-10 mx-auto"
          >
            <input
              type="search"
              placeholder="Search"
              ref={searchRef}
              className="px-4 h-full md:w-48 lg:w-96 dark:border-gray-50 border-gray-300 rounded-full focus:outline-none"
            />
            <div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full ">
              <Search />
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-7">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <Video />
          <Bell />
          <div className="md:hidden">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Search onClick={() => setDialogOpen(true)} />
              </DialogTrigger>
              <DialogContent>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center h-10 mx-auto"
                >
                  <input
                    type="search"
                    placeholder="Search"
                    ref={searchRef}
                    className="px-4 h-full md:w-48 lg:w-96 dark:border-gray-50 border-gray-300 rounded-full focus:outline-none"
                  />
                  <div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full ">
                    <Search />
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage src="/my-dp.jpeg" alt="" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src="/my-dp.jpeg" alt="" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-3 text-base">
                      <span>
                        <p>Code with Jude</p>
                        <p>@codewithjude</p>
                      </span>
                      <Link href={`/channel`}>View your channel</Link>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 flex items-center">
                  <span className="mr-2">Appearance:</span> <ThemeToggle />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
