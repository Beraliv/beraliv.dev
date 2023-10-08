import { TreeNode } from "../Types/TreeNode";

/**
 * BFS-traverse
 */
const breadthFirstTraversal = <Value>(
  tree: TreeNode<Value>,
  process: (node: TreeNode<Value>) => void
): void => {
  const queue: TreeNode<Value>[] = [tree];

  while (queue.length !== 0) {
    const node = queue.pop()!;

    process(node);

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }
};

export { breadthFirstTraversal };
