import * as React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import {
  IndexedSearch,
  SearchIndex,
  SearchIndexQuery
} from "../../classes/SearchIndex";
import { wmkClass } from "../../logic";
import {
  defaultAlgorithm,
  DefaultClose,
  DefaultResult,
  SearchLink
} from "./SearchSliderDefaults";
import CSS from "csstype";

interface SearchSliderDrawerProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: SearchIndexQuery;
  Result?: ({ result }: { result: SearchLink }) => JSX.Element;
  CloseIcon?: () => JSX.Element;
  className?: string;
  style?: CSS.StandardProperties;
  useAlgorithm?: (
    event: React.ChangeEvent<HTMLInputElement>,
    setSearchKey: React.Dispatch<React.SetStateAction<string>>,
    index: SearchIndex,
    setSearchResults: React.Dispatch<React.SetStateAction<IndexedSearch[]>>
  ) => void;
  resultConversion: (results: IndexedSearch) => SearchLink;
}

export const SearchSliderDrawer = ({
  isSearchOpen,
  setIsSearchOpen,
  query,
  Result,
  CloseIcon,
  className,
  style,
  useAlgorithm,
  resultConversion
}: SearchSliderDrawerProps) => {
  const [classedSearchIndex, setClassedSearchIndex] = useState<SearchIndex>();
  const [searchResults, setSearchResults] = useState<IndexedSearch[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const _style = {
    ...style,
    position: isSearchOpen ? ("fixed" as const) : ("absolute" as const),
    zIndex: !isSearchOpen ? -1 : 20000,
    width: isSearchOpen ? "100%" : "1px",
    minHeight: isSearchOpen ? "100%" : "none",
    height: isSearchOpen ? "auto" : "1px",
    transition: "all 0.3s ease",
    right: 0,
    top: 0,
    overflow: isSearchOpen ? "scroll" : "hidden"
  };

  const EndResult = ({ result }: { result: SearchLink }) =>
    Result ? <Result result={result} /> : <DefaultResult result={result} />;
  const EndCloseIcon = CloseIcon ? CloseIcon : DefaultClose;
  const endAlgorithim = useAlgorithm ? useAlgorithm : defaultAlgorithm;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    endAlgorithim(e, setSearchKey, classedSearchIndex, setSearchResults);
  };
  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchKey("");
  };
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const _className = [];
  _className.push(isSearchOpen ? "search-open" : "search-closed");
  _className.push(className);

  useEffect(() => {
    setClassedSearchIndex(new SearchIndex(query));
  }, []);
  return (
    <div
      style={_style}
      className={wmkClass("drawer", "search", _className.join(" "))}>
      <Row className="flex-column" style={{ width: "100%" }}>
        <Col
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            padding: "2vh 3vw",
            minHeight: "5rem"
          }}>
          <button
            onClick={handleClose}
            aria-label="Close Search"
            className="close">
            <EndCloseIcon />
          </button>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "5rem"
          }}>
          <Form
            style={{ width: "80%" }}
            onSubmit={handleSumbit}
            className="search-form">
            <Form.Control
              placeholder="Enter Search..."
              onChange={handleSearch}
              value={searchKey}
            />
          </Form>
        </Col>
        <Col className="results">
          <Container>
            <Row
              style={{ maxWidth: "80%", margin: "auto" }}
              className="flex-column">
              {searchResults && searchResults.length > 0 && searchKey !== "" ? (
                searchResults.map((result, i) => {
                  return (
                    <Col key={result.nodeType + i} onClick={handleClose}>
                      <EndResult result={resultConversion(result)} />
                    </Col>
                  );
                })
              ) : searchResults &&
                searchResults.length < 1 &&
                searchKey !== "" ? (
                <Col className="no-result">
                  <em>
                    No results matching <strong>{searchKey}</strong>.
                  </em>
                  <p>
                    <sub>Please try another search.</sub>
                  </p>
                </Col>
              ) : null}
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
