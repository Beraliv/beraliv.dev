import * as ts from "typescript";

const enumToConstObject = (
  enumNode: ts.EnumDeclaration,
  sourceFile: ts.SourceFile
): ts.Statement[] => {
  const properties = enumNode.members.map((member) => {
    const key = member.name.getText(sourceFile);
    const value = member.initializer
      ? member.initializer
      : ts.factory.createStringLiteral(key);

    return ts.factory.createPropertyAssignment(
      ts.factory.createIdentifier(key),
      value
    );
  });

  // Initialises object body from properties
  // For example, given `enum Color { Green = "GREEN", Blue = "BLUE" }`
  // it's expected to get `{ Green: "GREEN", Blue: "BLUE" }`

  const objectBody = ts.factory.createObjectLiteralExpression(
    properties,
    true // multiline
  );

  const objectStatement = ts.factory.createVariableStatement(
    [],

    // Creates full variable declaration
    // For example, `const Color = { Green: "GREEN", Blue: "BLUE" } as const;`

    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          enumNode.name,
          undefined, // no exclamation token
          undefined, // no type annotation

          // Creates right operand of the variable statement
          // For example, `{ Green: "GREEN", Blue: "BLUE" } as const`

          ts.factory.createAsExpression(
            objectBody,
            ts.factory.createTypeReferenceNode("const")
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  );

  // Creates type alias for the enum members
  // For example, `type Color = (typeof Color)[keyof typeof Color];`

  const typeAliasStatement = ts.factory.createTypeAliasDeclaration(
    [], // modifiers
    enumNode.name,
    undefined, // no type parameters
    ts.factory.createIndexedAccessTypeNode(
      ts.factory.createTypeQueryNode(enumNode.name),
      ts.factory.createTypeOperatorNode(
        ts.SyntaxKind.KeyOfKeyword,
        ts.factory.createTypeQueryNode(enumNode.name)
      )
    )
  );

  return [objectStatement, typeAliasStatement];
};

const enumTransformer: ts.TransformerFactory<ts.SourceFile> = () => {
  return (sourceFile) => {
    const newStatements: ts.Statement[] = [];

    for (const statement of sourceFile.statements) {
      if (ts.isEnumDeclaration(statement)) {
        const transformed = enumToConstObject(statement, sourceFile);
        newStatements.push(...transformed);
      } else {
        newStatements.push(statement);
      }
    }

    return ts.factory.updateSourceFile(sourceFile, newStatements);
  };
};

export const tsEnumToConstObjectAndTypeAlias = (code: string): string => {
  const sourceFile = ts.createSourceFile(
    "in-memory.ts",
    code,
    ts.ScriptTarget.Latest,
    true, // parent nodes tracking is enabled
    ts.ScriptKind.TS
  );

  const result = ts.transform(sourceFile, [enumTransformer]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return result.transformed
    .map((transformed) => printer.printFile(transformed))
    .join("\n");
};
