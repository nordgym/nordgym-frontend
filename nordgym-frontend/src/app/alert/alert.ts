import {AlertType} from './enum/alert-type.enum';

export class Alert {
  type: AlertType;
  message: string;
  errors: string[];
  alertId: string;
  keepAfterRouteChange: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
