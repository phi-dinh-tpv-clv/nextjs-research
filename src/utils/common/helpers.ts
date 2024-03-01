export const convertToDataList = (data: any[]) => {
  const newDataList = data.map((item) => ({
    value: item.id,
    label: item.fullname,
    avtUrl: item.avatar,
    email: item.email,
  }));

  return newDataList;
};
