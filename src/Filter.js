function filterBy(list, value) {
  return list.filter(function (item) {
    return item.indexOf(value) > -1;
  });
}

function findBy(list, value) {
  return list.filter(function (item) {
    return item == value;
  });
}

export {filterBy, findBy};
