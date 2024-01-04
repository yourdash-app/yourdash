/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import XmlAttributeNode from "./xmlAttributeNode";
import XmlElementNode from "./xmlElementNode";

function parseAttributes({
  unparsedElementNodeTag,
}: {
  unparsedElementNodeTag: string;
}) {
  const attributes = unparsedElementNodeTag.split(" ");

  return attributes.map((attr) => {
    const [attributeName, attributeValue] = attr.split("=");

    return new XmlAttributeNode({});
  });
}

function parseElementNode({
  unparsedXMLTree,
  nameSpaces,
}: {
  unparsedXMLTree: string;
  nameSpaces: Map<string, string>;
}) {
  const [namespace, elementName] = unparsedXMLTree
    .split("<")[1]
    .split(" ")[0]
    .split(":");

  return new XmlElementNode({ currentNodeNamespace: namespace, nameSpaces });
}

export default function parseXMLTree(unparsedTree: string) {
  const remainingString = unparsedTree;
}
