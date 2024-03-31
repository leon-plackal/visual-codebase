// pages/api/github-tree.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { owner, repo, branch } = req.query;
    const defaultOwner = 'facebook';
    const defaultRepo = 'react';
    const defaultBranch = 'main';

    const apiUrl = `https://api.github.com/repos/${owner || defaultOwner}/${repo || defaultRepo}/git/trees/${branch || defaultBranch}?recursive=1`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }
      const data = await response.json();
      const paths = data.tree
        .filter(item => item.type === 'blob')
        .map(item => item.path);

      const tree = buildTree(paths);
      res.status(200).json(tree);
    } catch (error) {
      console.error('Error fetching repository:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function buildTree(paths) {
  const root = {};

  paths.forEach(path => {
    path.split('/').reduce((node, name, index, parts) => {
      if (!node[name]) {
        node[name] = (index === parts.length - 1) ? {} : {};
      }
      return node[name];
    }, root);
  });

  return root;
}
