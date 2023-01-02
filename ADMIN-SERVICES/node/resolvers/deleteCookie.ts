/** @format */

export const deleteCookie = async (
  _: any,
  { id }: { id: string },

  { clients: { masterdata } }: Context
) =>
  masterdata
    .deleteDocument({
      dataEntity: "CF",
      id: id,
    })
    .then((data) => data);
