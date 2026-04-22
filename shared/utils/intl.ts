const listFormatter = new Intl.ListFormat("fa", {
  style: "long",
  type: "conjunction",
});

export const formatList = (list: string[]) => {
  return listFormatter.format(list);
};
