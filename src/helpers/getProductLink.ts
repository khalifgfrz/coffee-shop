import { Request } from "express-serve-static-core";
import { AppProductParams, QueryOrderParams } from "../models/params";
import { IProductQuery } from "../models/product";

const getProductLink = (req: Request<AppProductParams, {}, {}, QueryOrderParams>, info?: "previous" | "next"): string => {
  const { path, hostname, query, protocol, baseUrl } = req;
  const getNewPage = (page: string): number => {
    if (info === "next") return parseInt(page) + 1;
    if (info === "previous") return parseInt(page) - 1;
    return parseInt(page);
  };
  const newQuery = { ...query, page: `${getNewPage(query.page as string)}` };
  const serialize = (query: IProductQuery): string => {
    const str = [];
    for (let key in query) {
      if ((query as Object).hasOwnProperty(key)) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent((query as Record<string, string>)[key])}`);
      }
    }
    return str.join("&");
  };
  const newUrl = (url: string): string => {
    if (url == "/") return "1";
    return url;
  };
  return `${protocol}://${hostname}:${process.env.PORT}${newUrl(baseUrl)}${newUrl(path)}?${serialize(newQuery)}`;
};

export default getProductLink;
