export const checkIsActive = (id: number, activeColor: number) => {
  if (id === activeColor) return true;
  else return false;
};
