export const isValidAddress = (address: string) =>
  !!address.match(/^[1-9]\d{0,19}L$/);
export const isValidAmount = (amount: string) =>
  !!amount.match(/^\d+(\.\d{1,8})?$/);
