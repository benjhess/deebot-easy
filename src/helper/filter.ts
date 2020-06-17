export const filterObjects = (objects: any[], filter: any): any[] => {
  const filtered = objects.filter(obj => {
    for (const key of Object.keys(filter)) {
      if (!obj[key] || obj[key] !== filter[key]) {
        return false;
      }
      return true;
    }
  });

  return filtered;
};
