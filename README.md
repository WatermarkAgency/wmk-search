# wmk-search

Helps create instant feedback search given a search index from a general GraphQL query of plural content models. Search prompt and results appear in an overlay drawer.

## Components

There are two main components and a file with a couple other default utility components (which can be replaced by components of your choice).

### SeachSliderOpen

This component renders the button / icon that initiates the search process.

It uses the following props:

```tsx
interface SearchSliderOpenProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
  style?: CSS.StandardProperties;
}
```

#### It is important that a parent component declares and manages the _isSearchOpen_ and _setIsSearchOpen_ state variables. These variables track and modify the open state of the search drawer component.

### SearchSliderDrawer

This is where most of the magic happens, and the component was designed to be as flexible as possible, thus there are a lot of props / configuration options:

```tsx
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
```

#### In addtion to the _isSearchOpen_ and _setIsSearchOpen_ state variables, it is important that a parent component declares and manages _searchKey_, _setSearchKey_, _searchResults_ and _setSearchResults_.

```js
[searchKey, setSearchKey];
```

These variable track and modify the search query the user types into the search input.

```js
[searchResults, setSearchResults];
```

These variables store and manage the array of objects that match the search key.

```tsx
query: SearchIndexQuery;
```

This is the result of a query on several "all" nodes. Because we are potentially querying a lot of data, rather than using full fragments, queries should contain just enough data for search comparison and to generate the result link. You may want to query things such as thumbnail images or descriptions, but the more data you query, the more data and processor intensive using search will be. Example query that matches the SearchIndexQuery type definition:

```graphql
{
  blog: allContentfulBlog {
    edges {
      node {
        title
        slug
      }
    }
  }
  files: allContentfulAsset {
    edges {
      node {
        title
        url
      }
    }
  }
  news: allContentfulNews {
    edges {
      node {
        title
        slug
      }
    }
  }
}
```

**Using the graphql aliases is helpful, as the resultant IndexedSearch will have a type property that corresponds to the topmost name of every graph**

You would then instantiate the _SearchIndex_ class with your query data:

```js
new SearchIndex(query);
```

The _resultConversion_ method is important, it is what you use to process raw query data and return something that matches the _SearchLink_ interface:

```tsx
export interface SearchLink {
  to: string;
  text: string;
  target?: "blank" | "self";
}
```

The idea is to map over each item within the IndexedSearch array. There should be enough information to tell which _\_\_typename_ each result initiated from so you can properly construct the _to_ and _text_ strings. T

The _<Result>_ and _<Close>_ components render each individual result (given SearchLink data), and the button / icon that will close the SearchDrawer.

Finally, but most importanly is the _useAlgorithim_ method. It allows you to modify the default behavior of the search engine. By default, a result will return as a match if it's title property has a case-insensitive match to the search input. With this hook, you can recieve the search input, modify the primary property to compare, loop through the search index, and filter out desired results based on any criteria you choose.
