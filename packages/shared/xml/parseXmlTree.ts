/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import XmlAttributeNode from "./xmlAttributeNode.js";
import XmlElementNode from "./xmlElementNode.js";

function parseAttributes({
  unparsedElementNodeTag,
  nameSpaces,
}: {
  unparsedElementNodeTag: string;
  nameSpaces: Map<string, string>;
}) {
  const attributes = unparsedElementNodeTag.split(" ");

  return attributes.map((attr) => {
    const [attributeNameWithNamespace, attributeValue] = attr.split("=");
    const [attributeNameSpace, attributeName] =
      attributeNameWithNamespace.split(":");

    return new XmlAttributeNode({
      nameSpaces: nameSpaces,
      name: attributeName,
      value: attributeValue,
      currentNodeNamespace: attributeNameSpace,
    });
  });
}

function parseElementNode({
  unparsedXMLTree,
  nameSpaces,
}: {
  unparsedXMLTree: string;
  nameSpaces: Map<string, string>;
}) {
  let [namespace, elementName] = unparsedXMLTree
    .split("<")[1]
    .split(" ")[0]
    .split(":");

  if (!elementName) {
    elementName = namespace;
    namespace = undefined;
  }

  const unparsedElementNodeTag = unparsedXMLTree
    .split("<")[1]
    .split(" ")[1]
    .split(">")[0];

  console.log({
    namespace,
    elementName,
    unparsedElementNodeTag,
  });

  return new XmlElementNode({
    currentNodeNamespace: namespace,
    nameSpaces,
    attributes: parseAttributes({
      unparsedElementNodeTag: unparsedElementNodeTag,
      nameSpaces,
    }),
  });
}

export default function parseXMLTree(unparsedTree: string) {
  const remainingString = unparsedTree;
  const namespaces = new Map<string, string>();
  const parsedTree = [];

  parsedTree.push(
    parseElementNode({
      unparsedXMLTree: remainingString,
      nameSpaces: namespaces,
    }),
  );

  return parsedTree;
}
