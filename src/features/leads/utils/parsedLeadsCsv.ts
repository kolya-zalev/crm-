import Papa from "papaparse";

export const parsedLeadsCsv = (
  file: File,
): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
