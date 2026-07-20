import { expect } from "@playwright/test";
import { createWriteStream } from "fs";
import axios from "axios";

/**
 *
 * @param {string} url
 */
export async function get(url: string) {
  return axios.get(url);
}

export async function download(
  url: string,
  fileName: string,
  destinationPath: string,
) {
  await axios.get(`${url}`, { responseType: "stream" }).then((response) => {
    expect(response.status).toBe(200);
    const writer = createWriteStream(`${destinationPath}${fileName}`);
    response.data.pipe(writer);
  });
}

export async function downloadWithBasicAuth(
  url: string,
  fileName: string,
  destinationPath: string,
  credentials: { username: string; password: string },
) {
  await axios
    .get(`${url}`, {
      responseType: "stream",
      auth: { username: credentials.username, password: credentials.password },
    })
    .then((response) => {
      expect(response.status).toBe(200);
      const writer = createWriteStream(`${destinationPath}${fileName}`);
      response.data.pipe(writer);
    });
}
