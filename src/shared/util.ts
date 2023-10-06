import _ from 'lodash';

export class UtilFuncs {
    static updateObj (targetObj: any, newObj: any) {
        return _.extend(targetObj, newObj);
    }
}