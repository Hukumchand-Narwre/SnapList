"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/utils/fetchSuggestion";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const [board, searchString, setSearchString, credentials, setCredentials] =
    useBoardStore((state) => [
      state.board,
      state.searchString,
      state.setSearchString,
      state.credentials,
      state.setCredentials,
    ]);
  const [userData, setUserData] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      const toShow = `Summary of your Todo App you have ${suggestion.todo} task in to do, ${suggestion.inProgress} task in progress,${suggestion.done} task completed.Keep up good work and have productive day!`;
      setSuggestion(toShow);
      setLoading(false);
    };
    fetchSuggestionFunc();
  }, [board]);
  const logoutHandler = () => {
    googleLogout();
    setCredentials("");
  };
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl ">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1  justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial ">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              search
            </button>
          </form>
          <Avatar
            className=" cursor-pointer "
            name={credentials}
            round
            size="50"
            color="#0055D1"
            onClick={logoutHandler}
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5 relative">
        <p className="flex items-center text-sm font-medium p-5 shadow-xl rounded-xl w-fit bg-white text-[#0055D1] ">
          <UserCircleIcon
            className={`inline-block  h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            } `}
          />
          {suggestion && !loading
            ? suggestion
            : "Summarizing your task for the day"}
        </p>
      </div>
    </header>
  );
};

export default Header;
