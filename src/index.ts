import * as ts from 'typescript';

const getUpdatedAttributesWithSource = (
  node: ts.JsxSelfClosingElement | ts.JsxOpeningElement
): ts.JsxAttributeLike[] => {
  const file = node.getSourceFile();

  const { line, character } = file.getLineAndCharacterOfPosition(
    node.getStart()
  );

  const fileName = file.fileName;
  /**
   * line numbers in editors are 1 indexed,
   * so adding 1 to line and column to be in sync with editors
   */
  const lineNumber = line + 1;
  const columnNumber = character + 1;

  const newAttributes: ts.JsxAttributeLike[] = [];

  /**
   * copy old attributes
   */
  node.attributes.forEachChild((attribute: ts.JsxAttributeLike) => {
    newAttributes.push(attribute);
  });

  const sourceAttribute = ts.createJsxAttribute(
    ts.createIdentifier('__source'),
    ts.createJsxExpression(
      undefined,
      ts.createObjectLiteral([
        ts.createPropertyAssignment(
          ts.createLiteral('fileName'),
          ts.createLiteral(fileName)
        ),
        ts.createPropertyAssignment(
          ts.createLiteral('lineNumber'),
          ts.createLiteral(lineNumber)
        ),
        ts.createPropertyAssignment(
          ts.createLiteral('columnNumber'),
          ts.createLiteral(columnNumber)
        )
      ])
    )
  );

  /**
   * add __source to attributes
   */
  newAttributes.push(sourceAttribute);

  return newAttributes;
};

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const visitor: ts.Visitor = n => {
    switch (n.kind) {
      case ts.SyntaxKind.JsxOpeningElement: {
        const node = n as ts.JsxOpeningElement;
        const attributes = getUpdatedAttributesWithSource(node);

        const result = ts.updateJsxOpeningElement(
          node,
          node.tagName,
          node.typeArguments,
          ts.createJsxAttributes(attributes)
        );

        return result;
      }

      case ts.SyntaxKind.JsxSelfClosingElement: {
        const node = n as ts.JsxSelfClosingElement;
        const attributes = getUpdatedAttributesWithSource(node);

        const result = ts.updateJsxSelfClosingElement(
          node,
          node.tagName,
          node.typeArguments,
          ts.createJsxAttributes(attributes)
        );

        return result;
      }
    }

    return ts.visitEachChild(n, visitor, context);
  };

  return n => ts.visitNode(n, visitor);
};

export default transformer;
