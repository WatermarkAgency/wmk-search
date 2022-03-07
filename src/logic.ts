export const wmkClass = (
  name: string,
  group: string,
  append = "",
  prefix = "wmk"
) => {
  const classes = [
    prefix + "-" + group,
    prefix + "-" + group + "-" + name,
    append
  ];
  return classes.join(" ").trim();
};
