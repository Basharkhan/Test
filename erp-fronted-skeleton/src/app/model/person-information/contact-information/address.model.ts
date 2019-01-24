import {FuseUtils} from './../../../../@fuse/utils/index';
import {Country} from './country.model';

export class Address {
    public id: string;
    public addressType: any;
    public streetAddress: string;
    public division: string;
    public district: string;
    public subDistrict: string;
    public union: string;
    public mauza: string;
    public policeStation: string;
    public postOffice: string;
    public postCode: string;
    public country: Country;
    public latitude: number;
    public longitude: number;

    constructor(address?) {
        address = address || {};
        this.id = address.id || FuseUtils.generateGUID();
        this.addressType = address.addressType || null;
        this.streetAddress = address.streetAddress || null;
        this.division = address.division || null;
        this.district = address.district || null;
        this.subDistrict = address.subDistrict || null;
        this.union = address.union || null;
        this.mauza = address.mauza || null;
        this.policeStation = address.policeStation || null;
        this.postOffice = address.postOffice || null;
        this.postCode = address.postCode || null;
        this.country = address.country || null;
        this.latitude = address.latitude || null;
        this.longitude = address.longitude || null;
    }
}

