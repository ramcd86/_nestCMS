import { Injectable } from "@nestjs/common";
import { STATUS_FAILED, STATUS_OK } from "../_utilities/constants.class";
import * as fs from "fs";
import { DatabaseQueryResolution } from "../_interfaces/interfaces";

@Injectable()
export class FileService {
  static queryDb(dbFileString: string): Promise<DatabaseQueryResolution> {
    return new Promise<DatabaseQueryResolution>((resolve, reject) => {
      try {
        const file: any = fs.readFileSync(`./src/_db/${dbFileString}.json`);
        resolve({
          status: STATUS_OK,
          payload: JSON.parse(file)
        });
      } catch (error) {
        reject({
          status: STATUS_FAILED,
          payload: `There was a problem querying the database. ${error}`
        });
      }
    });
  }

  static updateDb(dbFileString: string, payload: any): any {
    return new Promise<DatabaseQueryResolution>((resolve, reject) => {
      const prepareDataForStorage = (incomingData: any) =>
        JSON.stringify(incomingData);
      fs.writeFile(
        `../_db/${dbFileString}.json`,
        prepareDataForStorage(payload),
        err => {
          if (err) {
            reject({
              status: STATUS_FAILED,
              payload: `Data writing FAILED. Error report: ${err}`
            });
          }
          resolve({
            status: STATUS_OK,
            payload: "Data written to file."
          });
        }
      );
    });
  }
}
