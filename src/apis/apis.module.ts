import { HttpModule, Module } from "@nestjs/common";
import { HttpConfigService } from "./http-config.service";
import { IMDBService } from "./imdb.service";
import { WikipediaService } from "./wikipedia.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService
    }),
  ],
  providers: [WikipediaService, IMDBService],
  exports: [WikipediaService, IMDBService]
})
export class APIsModul {}
  