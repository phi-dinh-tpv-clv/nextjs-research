import { UserDataType } from "@/types/user.types";

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUser(userData: any): Chainable<void>;
      registerViaUser(userData: UserDataType): Chainable<void>;
      getDataCy(userData: string): Chainable<any>;
    }
  }
}
