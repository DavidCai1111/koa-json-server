const tools = {
  findEntityById(arr, id) {
    return arr.find((elem) => String(elem.id) === String(id));
  }
};

export default tools;
