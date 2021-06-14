import { HttpService, Injectable } from "@nestjs/common";
import { WikipediaRes } from "./types/WikipediaRes";
import { parse } from 'node-html-parser';

@Injectable()
export class WikipediaService {
  private readonly querySelector: string = "#mw-content-text > div.mw-parser-output > p:nth-child(5)";

  constructor(private readonly httpService: HttpService) {}

  async search(search: string): Promise<WikipediaRes> {
    const res = await this.httpService.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=1&namespace=0&format=json`
    ).toPromise();
    
    return res.data as WikipediaRes;
  }

  async getFirstParagraphByLink(link: string): Promise<string> {
    const res = await this.httpService.get(link).toPromise();
    const root = parse(res.data);
    return root.querySelector(this.querySelector).innerText;
  }
}