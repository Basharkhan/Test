import {Address} from '../contact-information/address.model';

export class PublicationInformation {
    public volume: string;
    public issue: string;
    public edition: string;
    public series: string;
    public pageStart: number;
    public pageEnd: number;
    public issnNumber: string;
    public isbnNumber: string;
    public title: string;
    public publisher: string;
    public publisherAddress: Address;
    public publicationDate: Date;

    constructor(publicationInformation?) {
        publicationInformation = publicationInformation || {};
        this.volume = publicationInformation.volume || null;
        this.issue = publicationInformation.issue || null;
        this.edition = publicationInformation.edition || null;
        this.series = publicationInformation.series || null;
        this.pageStart = publicationInformation.pageStart || null;
        this.pageEnd = publicationInformation.pageEnd || null;
        this.issnNumber = publicationInformation.issnNumber || null;
        this.isbnNumber = publicationInformation.isbnNumber || null;
        this.title = publicationInformation.title || null;
        this.publisher = publicationInformation.publisher || null;
        this.publisherAddress = publicationInformation.publisherAddress || null;
        this.publicationDate = publicationInformation.publicationDate || null;
    }
}
