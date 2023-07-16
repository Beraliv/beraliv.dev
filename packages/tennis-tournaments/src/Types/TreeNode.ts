type TreeNode<BaseType> = BaseType & {
  left?: TreeNode<BaseType>;
  right?: TreeNode<BaseType>;
};

export { type TreeNode };
