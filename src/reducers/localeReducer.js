const initialState = '';

export default (state = initialState, { type }) => {
  switch (type) {
    case 'CHANGE_LOCALE':
      return { locale: '' };

    default:
      return state;
  }
};
