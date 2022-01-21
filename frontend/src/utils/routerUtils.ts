export const boardNameToUrlParameter = (boardName: string): string => {
  if (boardName === 'C++') return 'c';
  else if (boardName === 'Home') return '/';
  else return boardName.toLowerCase();
};