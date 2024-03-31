import TreeNode from "./TreeNode";

const FileTree = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="ml-2">
        {Object.keys(data).map((key) => (
          <TreeNode key={key} nodeName={key} nodeData={data[key]} />
        ))}
      </div>
    );
  };

export default FileTree;
  