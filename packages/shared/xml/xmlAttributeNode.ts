/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class XmlAttributeNode {
  baseURI: string | null;
  namespaceURI: string;
  name: string;
  nodeName: string;
  value: string;
  nodeValue: string;

  constructor({
    nameSpaces,
    currentNodeNamespace,
    name,
    value,
  }: {
    nameSpaces: Map<string, string>;
    currentNodeNamespace: string;
    name: string;
    value: string;
  }) {
    this.baseURI = null;
    this.name = name;
    this.nodeName = name;
    this.value = value;
    this.nodeValue = value;

    const currentNamespaceURI = nameSpaces.get(currentNodeNamespace);
    if (!currentNamespaceURI) throw new Error("Namespace not found");
    this.namespaceURI = currentNamespaceURI;

    return this;
  }
}
