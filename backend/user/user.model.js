function getUserById(id) {
  if (id === '123') {
    return {
      id: id,
      name: 'celine',
    };
  } else {
    return {
      id: id,
      name: 'andre',
    };
  }
}

function getUserByName(name) {

}

module.exports = {
  getUserById,
  getUserByName,
}
