import { HttpService, Injectable } from "@nestjs/common";
import { IMDBRes } from "./types/IMDBRes";

@Injectable()
export class IMDBService {
  constructor(private readonly httpService: HttpService) {}

  private reqToJSONObj<T>(reqBody: string): T {
    const str = reqBody.replace(/.*\(\{/, "{").replace(/\}\)$/, "}");
    return JSON.parse(str)
  }

  async search(search: string): Promise<IMDBRes> {
    const res = await this.httpService.get(`https://sg.media-imdb.com/suggests/${search[0]}/${search}.json`).toPromise();
    return this.reqToJSONObj<IMDBRes>(res.data);
  }

  isMovieId(id: string) {
    return id.substr(0,2) == "tt";
  }

  createLinkById(id: string) {
    return `https://www.imdb.com/title/${id}`;
  }

  getMainActorsBySProp(s: string) {
    return s.split(', ');
  }
}