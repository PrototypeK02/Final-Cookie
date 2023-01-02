/** @format */

export const cookieNew = async (
  _: any,
  { CookieFortune }: { CookieFortune: string },

  { clients: { masterdata } }: Context
) =>
  masterdata
    .createDocument({
      dataEntity: "CF",
      fields: {
        CookieFortune,
      },
    })
    .then((data) => data);
