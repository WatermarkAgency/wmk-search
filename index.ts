export interface MenuQuery {
  __typename?: string;
  [key: string]: any;
}

export interface MenuDataCallback {
  menuId: string;
  parent?: HyperLink<any>;
  links: (HyperLink<any> | MenuData<any>)[];
}

export interface HyperlinkCallback {
  to: string;
  text: string;
  target?: "blank" | "self";
}

export class HyperLink<T extends MenuQuery> {
  to: string;
  text: string;
  target?: "blank" | "self";
  constructor(data: T, callback: (data: T) => HyperlinkCallback) {
    const node: HyperlinkCallback = callback({ ...data });
    this.to = node.to;
    this.text = node.text;
    this.target = node.target;
  }
}

export class MenuData<T extends MenuQuery> {
  menuId: string;
  parent?: HyperLink<T>;
  links?: (HyperLink<T> | MenuData<T>)[];
  constructor(data: T, callback: (data: T) => MenuDataCallback) {
    const node: MenuDataCallback = callback(data);
    this.menuId = node.menuId;
    this.parent = node.parent;
    this.links = node.links;
  }
}
