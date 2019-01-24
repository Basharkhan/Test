import {FuseUtils} from '@fuse/utils';
import {PublicationType} from './publication-type.enum';
import {PublicationInformation} from './publication-information.model';
import {Author} from './author.model';

export class Publication {
    public id: string;
    public publicationType: PublicationType;
    public authorList: Author[];
    public publicationInformation: PublicationInformation;
    public localPublication: boolean;
    public contributionPercentage: number;
    public publicationUrl: string;

    constructor(publication?) {
        publication = publication || {};
        this.id = publication.id || FuseUtils.generateGUID();
        this.publicationType = publication.publicationType || null;
        this.authorList = publication.authorList || null;
        this.publicationInformation = publication.publicationInformation || null;
        this.localPublication = publication.localPublication || null;
        this.contributionPercentage = publication.contributionPercentage || null;
        this.publicationUrl = publication.publicationUrl || null;
    }
}
