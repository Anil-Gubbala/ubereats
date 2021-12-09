const { default: client } = require("./client");

// eslint-disable-next-line import/prefer-default-export
export const doQuery = (query, params, key) =>
  client
    .query({
      query,
      variables: params,
    })
    .then(
      ({ data: { [key]: data } }) => data
      //   console.log(data);
    )
    .catch((err) => {
      throw err.message;
      //   console.log(err);
    });

export const doMutate = (mutation, params, key) =>
  client
    .mutate({
      mutation,
      variables: params,
    })
    .then(
      ({ data: { [key]: data } }) => data
      //   console.log(data);
    )
    .catch((err) => {
      throw err.message;
      //   console.log(err);
    });
