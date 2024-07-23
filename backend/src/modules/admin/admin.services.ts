export const generateCredentials = (
  name: string,
  departmentCode: number,
  ranking: number,
  domain = "ncit.edu.np"
) => {
  const fname = name.split(" ")[0];
  const year = new Date().getFullYear().toString().slice(-2);
  const r = ranking > 9 ? ranking : "0" + ranking;
  const crn = `${year}${departmentCode}${r}`;
  // const email = `${fname.toLowerCase()}.${crn}@${domain}`;

  // return { email, crn };
  return { crn, password: crn };
};
