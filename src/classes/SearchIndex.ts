export class SearchIndex {
  index: IndexedSearch[];
  constructor(data: SearchIndexQuery) {
    const index: IndexedSearch[] = [];
    const allIndexed = Object.keys(data).reduce((all, nodeType) => {
      data[nodeType].edges.forEach((e) => {
        const node = { ...e.node };
        all.push({ nodeType, node });
      });
      return all;
    }, index);
    this.index = allIndexed;
  }
}

export interface SearchIndexQuery {
  [key: string]: { edges: { node: { [key: string]: any } }[] };
}

export type IndexedSearch = {
  nodeType: string;
  node: { [key: string]: any };
};
