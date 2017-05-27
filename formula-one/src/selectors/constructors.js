import { createSelector } from 'reselect';

const getConstructors = state => state.constructorsStore.constructors;

const getConstructorsSearchItems = createSelector(
  getConstructors,
  (constructors) => {
    const resultArray = [];

    if (!constructors) {
      return resultArray;
    }

    constructors.forEach((constructor) => {
      resultArray.push({
        label: constructor.name,
        value: constructor.constructorId,
      });
    });

    return resultArray;
  },
);

export {
  // eslint-disable-next-line
  getConstructorsSearchItems,
};
