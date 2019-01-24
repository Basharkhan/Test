import {FuseUtils} from '@fuse/utils';

export class ProfileLink {
    public id: string;
    public website: string;
    public facebook: string;
    public twitter: string;
    public linkedIn: string;
    public skype: string;
    public instagram: string;
    public youtube: string;
    public googlePlus: string;
    public snapchat: string;
    public github: string;
    public gitlab: string;
    public bitbucket: string;

    constructor(profileLink?) {
        profileLink = profileLink || {};
        this.id = profileLink.id || FuseUtils.generateGUID();
        this.website = profileLink.website || null;
        this.facebook = profileLink.facebook || null;
        this.twitter = profileLink.twitter || null;
        this.linkedIn = profileLink.linkedIn || null;
        this.skype = profileLink.skype || null;
        this.instagram = profileLink.instagram || null;
        this.youtube = profileLink.youtube || null;
        this.googlePlus = profileLink.googlePlus || null;
        this.snapchat = profileLink.snapchat || null;
        this.github = profileLink.github || null;
        this.gitlab = profileLink.gitlab || null;
        this.bitbucket = profileLink.bitbucket || null;
    }
}
