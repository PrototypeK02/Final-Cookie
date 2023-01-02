/** @format */

export const cookieList = async (
  _: any,
  __: any,

  { clients: { masterdata } }: Context
) =>
  masterdata
    .searchDocuments({
      dataEntity: "CF",
      fields: ["CookieFortune", "id"],
      pagination: { page: 1, pageSize: 1000 },
    })
    .then((data) => data);
