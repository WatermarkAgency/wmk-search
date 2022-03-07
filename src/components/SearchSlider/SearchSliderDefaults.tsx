import * as React from "react";
import { IoIosClose } from "react-icons/io";
import { WmkLink } from "wmk-link";
import { IndexedSearch, SearchIndex } from "../../classes/SearchIndex";

export interface SearchLink {
  to: string;
  text: string;
  target?: "blank" | "self";
}

export const DefaultResult = ({ result }: { result: SearchLink }) => {
  return (
    <WmkLink to={result.to} target={result.target}>
      {result.text}
    </WmkLink>
  );
};

export const DefaultClose = () => <IoIosClose />;

export const defaultAlgorithm = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSearchKey: React.Dispatch<React.SetStateAction<string>>,
  index: SearchIndex,
  setSearchResults: React.Dispatch<React.SetStateAction<IndexedSearch[]>>
) => {
  const searchIndex = index.index;
  const curSearchKey = event.target.value;
  setSearchKey(curSearchKey);
  setSearchResults(
    searchIndex.filter((searched) => {
      const searchTitle = searched.node.title;
      const regex = new RegExp(curSearchKey, "i");
      return Array.isArray(searchTitle.match(regex));
    })
  );
};
