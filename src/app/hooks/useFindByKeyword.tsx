const useFindByKeyword = (namespacesList, searchValue) => {
  const onFilter = (enviro) => {
    if (searchValue === "") {
      return true;
    }

    let input: RegExp;
    try {
      input = new RegExp(searchValue, "i");
    } catch (err) {
      input = new RegExp(
        searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }
    return enviro.name.search(input) >= 0;
  };
  const filteredEnviros = namespacesList.filter(onFilter);

  return filteredEnviros;
};
export default useFindByKeyword;
