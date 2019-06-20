const initialState = {
  loading: false,
  data: [],
  error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_AUTHORS_REQUEST':
      return { ...state, loading: true };

    case 'LOAD_AUTHORS_SUCCESS':
      return { ...state, loading: false, data: payload };

    case 'LOAD_AUTHORS_ERROR':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
