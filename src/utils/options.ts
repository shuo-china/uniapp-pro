export function getOptionItemByValue(
  options: (OptionItem & Record<string, any>)[],
  value: any,
) {
  return options.find((item) => item.value === value);
}

export function getOptionLabelByValue(options: OptionItem[], value: any) {
  return options.find((item) => item.value === value)?.text || "";
}
