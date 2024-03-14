export const returnMessage = <T>(
  success: boolean,
  msg: string,
  data?: T | undefined
) => {
  const message = {
    success: success,
    msg: msg,
    data: data
  };
  return message;
};
