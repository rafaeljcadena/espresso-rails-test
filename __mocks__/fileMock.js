const fs = jest.genMockFromModule('fs');

fs.__mock = {};

fs.__mock.readFile = (path, encoding) => {
  const pathObj = path.split('/');
  let currentPath = '';
  for (let i = 0; i < pathObj.length - 1; i++) {
    currentPath += pathObj[i] + '/';
    if (!fs.__mock[currentPath]) {
      fs.__mock[currentPath] = {};
    }
  }

  return Promise.resolve(fs.__mock[path]);
};

module.exports = fs;
