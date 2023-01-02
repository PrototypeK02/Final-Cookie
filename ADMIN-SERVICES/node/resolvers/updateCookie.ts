/** @format */

export const editCookie = async (
  __: any,
  { CookieFortune, id }: { CookieFortune: string; id: string },

  { clients: { masterdata } }: Context
) =>
  masterdata
    .updatePartialDocument({
      dataEntity: "CF",
      id,
      fields: {
        CookieFortune,
      },
    })
    .then(() => true);
